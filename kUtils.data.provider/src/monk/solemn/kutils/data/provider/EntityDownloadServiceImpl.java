package monk.solemn.kutils.data.provider;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.FileStore;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.CRC32;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
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
import monk.solemn.kutils.objects.BundleDownloadTicket;
import monk.solemn.kutils.objects.BundleDownloadVariables;
import monk.solemn.kutils.objects.DownloadTicket;
import monk.solemn.kutils.objects.ItemDownloadTicket;
import monk.solemn.kutils.utils.low.StringUtilitiesLow;

@Component(service=EntityDownloadService.class,
		   immediate=true)
public class EntityDownloadServiceImpl implements EntityDownloadService {
	private static ConfigDao configDao;
	private static EntityRecordDao entityRecordDao;
	private static StringUtilitiesLow stringUtilitiesLow;
	private Map<Long, DownloadTicket> downloadTickets = new HashMap<>();
	private Map<FileStore, Long> pendingByteCount = new HashMap<>();
	private Pattern pattern = Pattern.compile("Download complete: .*/(.*\\..*)$");
	private List<String> specialTokens = Arrays.asList("ext", ".ext");
	
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
	
	@Reference(
			service=StringUtilitiesLow.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetStringUtilitiesLow"
			)
	public void setStringUtilitiesLow(StringUtilitiesLow stringUtilitiesLow) {
		EntityDownloadServiceImpl.stringUtilitiesLow = stringUtilitiesLow;
	}
	
	public void unsetStringUtilitiesLow(StringUtilitiesLow stringUtilitiesLow) {
		EntityDownloadServiceImpl.stringUtilitiesLow = null;
	}
	
	@Override
	public ItemDownloadTicket getDownloadTicket(String pluginKey, ContentType contentType, String url) {
		File tmpDirFile = getTmpDir();
		
		return getItemDownloadTicket(pluginKey, contentType, url, tmpDirFile);
	}
	
	@Override
	public BundleDownloadTicket getDownloadTicket(String pluginKey, ContentType contentType, List<String> urls) {
		File tmpDirFile = getTmpDir();
		
		return getBundleDownloadTicket(pluginKey, contentType, urls, tmpDirFile);
	}
	
	private ItemDownloadTicket getItemDownloadTicket(String pluginKey, ContentType contentType, String url, File tmpDirFile) {
		ItemDownloadTicket ticket = new ItemDownloadTicket(contentType, pluginKey, url, tmpDirFile);
		saveClone(pluginKey, ticket.clone());
		return ticket;
	}
	
	private BundleDownloadTicket getBundleDownloadTicket(String pluginKey, ContentType contentType, List<String> urls, File tmpDirFile) {
		BundleDownloadTicket ticket = new BundleDownloadTicket(contentType, pluginKey, urls, tmpDirFile);
		saveClone(pluginKey, ticket.clone());
		return ticket;
	}

	@Override
	public Long finalizeDownload(DownloadTicket ticket, File item) throws IOException {
		return finalizeDownload(ticket, item, null);
	}
	
	@Override
	public Long finalizeDownload(DownloadTicket ticket, List<File> items) throws IOException {
		return finalizeDownload(ticket, items, null);
	}
	
	@Override
	public Long finalizeDownload(DownloadTicket ticket, File item, String parentPath) throws IOException {
		return finalizeDownload(ticket, item, parentPath, null);
	}
	
	@Override
	public Long finalizeDownload(DownloadTicket ticket, List<File> items, String parentPath) throws IOException {
		return finalizeDownload(ticket, items, new HashMap<>(), parentPath, null);
	}
	
	@Override
	public Long finalizeDownload(DownloadTicket ticket, File item, String parentPath, String renameMask) throws IOException {
		return finalizeItemDownload((ItemDownloadTicket) ticket, item, parentPath, renameMask);
	}
	
	@Override
	public Long finalizeDownload(DownloadTicket ticket, List<File> items, Map<String, String> metadata, String parentPath, String renameMask) throws IOException {
		return finalizeBundleDownload((BundleDownloadTicket) ticket, items, metadata, parentPath, renameMask);
	}
	
	private Long finalizeItemDownload(ItemDownloadTicket ticket, File item, String parentPath, String renameMask) throws IOException {
		CRC32 crc = new CRC32();
		crc.update(ticket.getPluginKey().getBytes());
		crc.update(ticket.getItemUrl().getBytes());
		
		DownloadTicket savedCopy = downloadTickets.get(crc.getValue());
		Long id = null;
		File finalFile = null;
		
		if (ticket.equals(savedCopy)) {
			File destDir = findDestinationDir(item.length(), StringUtils.isNotBlank(parentPath));
			FileStore destStore = Files.getFileStore(destDir.toPath());
			
			finalFile = moveFile(parentPath, destDir, item);
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
	
	private Long finalizeBundleDownload(BundleDownloadTicket ticket, List<File> items, Map<String, String> metadata, String parentPath, String renameMask) throws IOException {
		CRC32 crc = new CRC32();
		crc.update(ticket.getPluginKey().getBytes());
		for (String url : ticket.getItemUrls()) {
			crc.update(url.getBytes());
		}
		
		DownloadTicket savedCopy = downloadTickets.get(crc.getValue());
		Long id = null;
		File tmpFile = null;
		
		if (ticket.equals(savedCopy)) {
			long combinedSize = 0;
			for (File item : items) {
				combinedSize += item.length();
			}
			
			File destDir = findDestinationDir(combinedSize, StringUtils.isNotBlank(parentPath));
			FileStore destStore = Files.getFileStore(destDir.toPath());
			id = entityRecordDao.addNewBundle(Paths.get(destDir.getAbsolutePath(), parentPath));
			entityRecordDao.addMetadataToBundle(id, metadata);
			
			for (File item : items) {
				tmpFile = moveFile(parentPath, destDir, item);
				if (!StringUtils.isBlank(renameMask)) {
					tmpFile = renameWithMask(id, tmpFile, renameMask);
				}
				items.remove(item);
				items.add(tmpFile);
				entityRecordDao.addItemToBundle(id, tmpFile);
			}
			pendingByteCount.put(destStore, pendingByteCount.get(destStore) - combinedSize);
		}
		
		FileUtils.deleteDirectory(ticket.getTempDirectory());
		downloadTickets.remove(crc.getValue());
		return id;
	}

	private File moveFile(String parentPath, File destDir, File item) throws IOException {
		File finalFile;
		if (StringUtils.isNotBlank(parentPath)) {
			FileUtils.moveFileToDirectory(item, Paths.get(destDir.getAbsolutePath(), parentPath).toFile(), true);
			finalFile = Paths.get(destDir.getAbsolutePath(), parentPath, item.getName()).toFile();
		} else {
			FileUtils.moveFileToDirectory(item, destDir, true);
			finalFile = Paths.get(destDir.getAbsolutePath(), item.getName()).toFile();
		}
		return finalFile;
	}

	@Override
	public File download(ItemDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
		return downloadWithAria(ticket, cookieMap, cookieFile);
	}

	@Override
	public List<File> download(BundleDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
		return downloadWithAria(ticket, cookieMap, cookieFile);
	}

	@Override
	public File downloadWithAria(ItemDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
		return downloadItemWithAria((ItemDownloadTicket) ticket, cookieMap, cookieFile);
	}
	
	@Override
	public List<File> downloadWithAria(BundleDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
		return downloadBundleWithAria((BundleDownloadTicket) ticket, cookieMap, cookieFile);
	}
	
	private File downloadItemWithAria(ItemDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
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
	
	private List<File> downloadBundleWithAria(BundleDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException {
		List<File> files = new ArrayList<>();
		ItemDownloadTicket tmpTicket;
		for (String url : ticket.getItemUrls()) {
			tmpTicket = new ItemDownloadTicket(ticket.getContentType(), ticket.getPluginKey(), url, ticket.getTempDirectory());
			files.add(downloadItemWithAria(tmpTicket, cookieMap, cookieFile));
		}
		return files;
	}
	
	private void saveClone(String key, DownloadTicket clone) {
		CRC32 crc = new CRC32();
		crc.update(key.getBytes());
		if (clone instanceof ItemDownloadTicket) {
			crc.update(((ItemDownloadTicket) clone).getItemUrl().getBytes());
		} else if (clone instanceof BundleDownloadTicket) {
			for (String itemUrl : ((BundleDownloadTicket) clone).getItemUrls()) {
				crc.update(itemUrl.getBytes());
			}
		}
		
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
		return renameWithMask(id, finalFile, renameMask, null);
	}
	
	private File renameWithMask(Long id, File finalFile, String renameMask, BundleDownloadVariables bundleVariables) throws IOException {
		List<Pair<String, Boolean>> tokens = extractTokens(renameMask);
		if (tokens.size() > 0) {
			StringBuilder filename = buildFileName(id, finalFile, bundleVariables, tokens);
			
			Path destination = Paths.get(finalFile.getParentFile().getAbsolutePath(), filename.toString());
			FileUtils.moveFile(finalFile, destination.toFile());

			return destination.toFile();
		} else {
			return finalFile;
		}
	}

	private StringBuilder buildFileName(Long id, File file, BundleDownloadVariables bundleVariables,
			List<Pair<String, Boolean>> tokens) throws IOException {
		StringBuilder filename = new StringBuilder();
		for (Pair<String, Boolean> token : tokens) {
			if (!token.getRight()) {
				filename.append(token.getLeft());
			} else {
				if (isBundleDownloadVariableToken(token)) {
					filename.append(getBundleDownloadVariableToken(bundleVariables, token));
				} else if (isSpecialToken(token)) {
					filename.append(extractSpecialToken(file, token));
				} else {
					filename.append(sanitizeMetadataToken(id, token));
				}
			}
		}
		return filename;
	}

	private String sanitizeMetadataToken(Long id, Pair<String, Boolean> token) throws IOException {
		return stringUtilitiesLow.sanitizeForPathName(entityRecordDao.getMetadataForBundle(id, token.getLeft()));
	}

	private String getBundleDownloadVariableToken(BundleDownloadVariables bundleVariables, Pair<String, Boolean> token) {
		StringBuilder tokenValue = new StringBuilder();
		
		if (bundleVariables != null) {
			Class<?> variableType = BundleDownloadVariables.getVariableType(token.getLeft());
			if (variableType == null) {
				tokenValue.append("");
			} else if (variableType.equals(Number.class)) {
				tokenValue.append(bundleVariables.getNumberVariable(token.getLeft()));
			} else {
				tokenValue.append("");
			}
		} else {
			tokenValue.append("");
		}
		
		return tokenValue.toString();
	}
	
	private boolean isBundleDownloadVariableToken(Pair<String, Boolean> token) {
		return BundleDownloadVariables.getTokenNames().contains(token.getLeft());
	}

	private String extractSpecialToken(File file, Pair<String, Boolean> token) {
		StringBuilder tokenValue = new StringBuilder();
		
		switch (token.getLeft()) {
		case ".ext":
			tokenValue.append('.');
		case "ext":
			tokenValue.append(FilenameUtils.getExtension(file.getName()));
			break;
		default:
			tokenValue.append("");
			break;
		}
		
		return tokenValue.toString();
	}

	private boolean isSpecialToken(Pair<String, Boolean> token) {
		return specialTokens.contains(token.getLeft());
	}

	private List<Pair<String, Boolean>> extractTokens(String renameMask) {
		boolean readingVariable = false;
		
		// Each element is the token and true if it's a variable
		List<Pair<String, Boolean>> tokens = new ArrayList<>();
		StringBuilder tokenBuilder = new StringBuilder();
		boolean escaped = false;
		for (char c : renameMask.toCharArray()) {
			if (c == '\\') {
				escaped = true;
			} else if (c == '`' && !escaped) {
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
		tokens.add(new ImmutablePair<>(tokenBuilder.toString(), false));
		return tokens;
	}
	
	private File getTmpDir() {
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
		return tmpDirFile;
	}
}
