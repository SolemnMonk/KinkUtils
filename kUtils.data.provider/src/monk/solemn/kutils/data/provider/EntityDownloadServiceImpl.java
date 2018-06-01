package monk.solemn.kutils.data.provider;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.FileStore;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.CRC32;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

import monk.solemn.kutils.data.api.ConfigDao;
import monk.solemn.kutils.data.api.EntityDownloadService;
import monk.solemn.kutils.data.api.EntityRecordDao;
import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.objects.ItemDownloadTicket;

@Component(service=EntityDownloadService.class,
		   immediate=true)
public class EntityDownloadServiceImpl implements EntityDownloadService {
	private static ConfigDao configDao;
	private static EntityRecordDao entityRecordDao;
	private Map<Long, ItemDownloadTicket> downloadTickets = new HashMap<>();
	private Map<FileStore, Long> pendingByteCount = new HashMap<>();

	@Reference(
			service=ConfigDao.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetConfigDao"
			)
	public void setConfigDao(ConfigDao configDao) {
		EntityDownloadServiceImpl.configDao = configDao;
	}
	
	public void unsetConfigDao(ConfigDao configDao) {
		EntityDownloadServiceImpl.configDao = null;
	}

	@Reference(
			service=EntityRecordDao.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetEntityRecordDao"
			)
	public void setEntityRecordDao(EntityRecordDao entityRecordDao) {
		EntityDownloadServiceImpl.entityRecordDao = entityRecordDao;
	}
	
	public void unsetEntityRecordDao(EntityRecordDao entityRecordDao) {
		EntityDownloadServiceImpl.entityRecordDao = null;
	}
	
	@Override
	public ItemDownloadTicket getDownloadTicket(String pluginKey, ContentType contentType, String url) {
		String configuredParentTmpDir = null;
		try {
			configuredParentTmpDir = configDao.loadGlobalConfig("TempDir");
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (StringUtils.isBlank(configuredParentTmpDir)) {
			configuredParentTmpDir = ".";
		}

		CRC32 crc = new CRC32();
		crc.update(LocalDateTime.now().toString().getBytes());
		String tmpDir = "kUtils.tmp." + Long.toHexString(crc.getValue());

		File tmpDirFile = Paths.get(configuredParentTmpDir, tmpDir).toFile();
		ItemDownloadTicket ticket = new ItemDownloadTicket(contentType, pluginKey, url, tmpDirFile);
		saveClone(pluginKey, ticket.clone());
		return ticket;
	}

	@Override
	public Long finalizeDownload(ItemDownloadTicket ticket, File item) throws IOException {
		return finalizeDownload(ticket, item, null);
	}
	
	@Override
	public Long finalizeDownload(ItemDownloadTicket ticket, File item, String parentPath) throws IOException {
		return finalizeDownload(ticket, item, parentPath, null);
	}
	
	@Override
	public Long finalizeDownload(ItemDownloadTicket ticket, File item, String parentPath, String renameMask) throws IOException {
		CRC32 crc = new CRC32();
		crc.update(ticket.getPluginKey().getBytes());
		crc.update(ticket.getItemUrl().getBytes());
		
		ItemDownloadTicket savedCopy = downloadTickets.get(crc.getValue());
		Long id = null;
		File finalFile = null;
		
		if (ticket.equals(savedCopy)) {
			File destDir = findDestinationDir(item.length(), StringUtils.isNotBlank(parentPath));
			FileStore destStore = Files.getFileStore(destDir.toPath());
			
			if (StringUtils.isNotBlank(parentPath)) {
				FileUtils.moveFileToDirectory(item, Paths.get(destDir.getAbsolutePath(), parentPath).toFile(), true);
				finalFile = Paths.get(destDir.getAbsolutePath(), parentPath, item.getName()).toFile();
			} else {
				FileUtils.moveFileToDirectory(item, destDir, true);
				finalFile = Paths.get(destDir.getAbsolutePath(), item.getName()).toFile();
			}
			id = entityRecordDao.addNewItem(finalFile);
			pendingByteCount.put(destStore, pendingByteCount.get(destStore) - item.length());
		}
		
		if (!StringUtils.isBlank(renameMask)) {
			finalFile = renameWithMask(id, finalFile, renameMask);
		}
		
		FileUtils.deleteDirectory(ticket.getTempDirectory());
		downloadTickets.remove(crc.getValue());
		return id;
	}

	@Override
	public File download(ItemDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
		return downloadWithAria(ticket, cookieMap, cookieFile);
	}

	@Override
	public File downloadWithAria(ItemDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
		String ariaLocation = configDao.loadGlobalConfig("aria2Location");
		
		StringBuilder commandBuilder = new StringBuilder();
		commandBuilder.append("\"{0}\" ");
		commandBuilder.append("--header=\"User-Agent: kUtils\" ");
		commandBuilder.append("--file-allocation=none ");
		if (StringUtils.isNotEmpty(cookieFile)) {
			commandBuilder.append(MessageFormat.format("\"--load-cookies={0}\" ", cookieFile));
		}
		if (cookieMap != null && !cookieMap.keySet().isEmpty()) {
			commandBuilder.append("--header=\"Cookie: ");
			for (String key : cookieMap.keySet()) {
				commandBuilder.append(key);
				commandBuilder.append('=');
				commandBuilder.append(cookieMap.get(key));
				commandBuilder.append(';');
			}
			commandBuilder.append("\" ");
		}
		commandBuilder.append("-d ");
		commandBuilder.append("\"{1}\" ");
		commandBuilder.append(ticket.getItemUrl());
		
		String command = MessageFormat.format(commandBuilder.toString(), ariaLocation, ticket.getTempDirectory());
		
		Process process = Runtime.getRuntime().exec(command);
		BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

		String fileName = null;

		Pattern pattern = Pattern.compile("Download complete: .*/(.*\\..*)$");
		Matcher matcher;
		
		String line;
		do {
			line = reader.readLine();
			System.out.println(line);
			matcher = pattern.matcher(line);

			if (matcher.find()) {
				fileName = matcher.group(1);
			}
		} while (!process.waitFor(500, TimeUnit.MILLISECONDS));

		while (fileName == null && reader.ready()) {
			line = reader.readLine();
			System.out.println(line);
			matcher = pattern.matcher(line);

			if (matcher.find()) {
				fileName = matcher.group(1);
			}
		}
		reader.close();

		File downloadedFile = null;
		
		downloadedFile = Paths.get(ticket.getTempDirectory().getAbsolutePath(), fileName).toFile();
		
		return downloadedFile;
	}
	
	private void saveClone(String key, ItemDownloadTicket clone) {
		CRC32 crc = new CRC32();
		crc.update(key.getBytes());
		crc.update(clone.getItemUrl().getBytes());
		
		downloadTickets.putIfAbsent(crc.getValue(), clone);
	}
	
	private File findDestinationDir(long fileSize, boolean parentSpecified) throws IOException {
		Integer poolCount = Integer.valueOf(configDao.loadGlobalConfig("storagePoolLocationCount"));
		List<File> pools = new ArrayList<>();
		for (Integer i = 0; i < poolCount; i++) {
			pools.add(new File(configDao.loadGlobalConfig("storagePoolLocation_" + i)));
		}
		
		File destDir = pools.get(0);
		FileStore destStore = Files.getFileStore(Paths.get(pools.get(0).getAbsolutePath()));
		FileStore tempStore;
		for (File pool : pools) {
			tempStore = Files.getFileStore(Paths.get(pool.getAbsolutePath()));
			if (tempStore.getUsableSpace() >= fileSize && tempStore.getUsableSpace() > destStore.getUsableSpace()) {
				destStore = tempStore;
				destDir = pool;
			}
		}
		
		if (pendingByteCount.containsKey(destStore)) {
			pendingByteCount.put(destStore, pendingByteCount.get(destStore) + fileSize);
		} else {
			pendingByteCount.put(destStore, fileSize);
		}
		
		if (parentSpecified) {
			return destDir;
		} else {
			return Paths.get(destDir.getAbsolutePath(), "kUtils.Assorted").toFile();
		}
	}
	
	private File renameWithMask(Long id, File finalFile, String renameMask) throws IOException {
		boolean readingVariable = false;
		
		// Each element is the token and true if it's a variable
		List<Pair<String, Boolean>> tokens = new ArrayList<>();
		StringBuilder tokenBuilder = new StringBuilder();
		boolean escaped = false;
		for (char c : renameMask.toCharArray()) {
			if (c == '\\') {
				escaped = true;
			} else if (c == '%' && !escaped) {
				if (readingVariable) {
					tokens.add(new ImmutablePair<>(tokenBuilder.toString(), true));
				} else {
					tokens.add(new ImmutablePair<>(tokenBuilder.toString(), false));
				}
				
				readingVariable = !readingVariable;
				tokenBuilder.setLength(0);
			} else {
				tokenBuilder.append(c);
				escaped = false;
			}
		}
		
		StringBuilder filename = new StringBuilder();
		for (Pair<String, Boolean> token : tokens) {
			if (!token.getRight()) {
				filename.append(token.getLeft());
			} else {
				filename.append(sanitizeForPathName(entityRecordDao.getMetadataForBundle(id, token.getLeft())));
			}
		}
		
		Path destination = Paths.get(finalFile.getParentFile().getAbsolutePath(), filename.toString());
		Files.move(finalFile.toPath(), destination, StandardCopyOption.COPY_ATTRIBUTES);
		
		return destination.toFile();
	}
	
	private static String sanitizeForPathName(String string) {
		if (SystemUtils.IS_OS_WINDOWS) {
			string = string.replaceAll("[<>:\"/\\|?*]+", "_");
			string = string.replaceAll("_{2,}", "_");
		} else {
			string = string.replaceAll("/", "_");
			string = string.replaceAll("_{2,}", "_");
		}
		
		string = string.trim();
		
		string = string.replaceAll("\\.{2,}$", "…");
		string = string.replaceAll("\\.$", "");
		
		if (string.length() > 64) {
			string = string.substring(0, 64) + "…";
		}
		
		return string;
	}
	
	private static String normalizeString(String string) {
		string = string.replaceAll("\\s+", " ");
		string = string.replaceAll(" {2,}", " ");
		
		string = WordUtils.capitalizeFully(string).trim();
		string.replaceAll("\\.{2,}$", "…");
		string.replaceAll("\\.$", "");
		
		return string;
	}
}
