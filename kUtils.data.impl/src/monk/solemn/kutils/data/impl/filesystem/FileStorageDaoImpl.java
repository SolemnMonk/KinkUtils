package monk.solemn.kutils.data.impl.filesystem;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.filefilter.FalseFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import monk.solemn.kutils.data.api.ConfigDao;
import monk.solemn.kutils.data.api.FileStorageDao;
import monk.solemn.kutils.utilities.low.FileUtilitiesLow;

@Component
public class FileStorageDaoImpl implements FileStorageDao {
	private ConfigDao configDao = null;

	@Reference
	void bindConfigDao(ConfigDao dao) {
		configDao = dao;
	}
	
	@Override
	public boolean checkFileExistence(String path) {
		try {
			String basePath = configDao.loadConfig("basePath");

			return (Paths.get(basePath, path).toFile()).exists();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public boolean checkFileExistence(String path, String hash) {
		return checkFileExistence(path, hash, false);
	}

	@Override
	public boolean checkFileExistence(String path, String hash, boolean deleteIfMismatch) {
		hash = StringUtils.lowerCase(hash);
		if (checkFileExistence(path)) {
			try {
				String basePath = configDao.loadConfig("basePath");
				File file = Paths.get(basePath, path).toFile();

				if (hash.equals(FileUtilitiesLow.hashFile(file))) {
					return true;
				} else {
					if (deleteIfMismatch) {
						deleteFile(path);
					}
				}
			} catch (SQLException | IOException e) {
				e.printStackTrace();
			}
		}

		return false;
	}

	@Override
	public void deleteFile(String path) throws SQLException {
		String basePath = configDao.loadConfig("basePath");

		FileUtils.deleteQuietly(Paths.get(basePath, path).toFile());
	}

	@Override
	public File downloadFile(String url, String path, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException {
		return downloadFile(url, path, false, seltzerId, cookieMap);
	}

	@Override
	public File downloadFile(String url, String path, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap)
			throws SQLException, IOException, InterruptedException {
		String basePath = configDao.loadConfig("basePath");
		String cookiePath = configDao.loadConfig("cookieLocation");
		String ariaPath = configDao.loadConfig("ariaLocation");

		path = Paths.get(path, "Temp").toString();

		Path downloadPath = Paths.get(basePath, path);

		StringBuilder builder = new StringBuilder();
		builder.append("\"{0}\" ");
		builder.append("--header=\"user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\" ");
		builder.append("--file-allocation=none ");
		builder.append("\"--load-cookies={1}\" ");
		if (cookieMap != null && !cookieMap.keySet().isEmpty()) {
			builder.append("--header=\"Cookie: ");
			for (String key : cookieMap.keySet()) {
				builder.append(key);
				builder.append('=');
				builder.append(cookieMap.get(key));
				builder.append(';');
			}
			builder.append("\" ");
		}
		builder.append("-d ");
		builder.append("\"{2}\" ");
		builder.append(url);

		cookiePath = MessageFormat.format(cookiePath, seltzerId.toString());
		
		String command = MessageFormat.format(builder.toString(), ariaPath, cookiePath, downloadPath);

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
		try {
			downloadedFile = Paths.get(basePath, path, fileName).toFile();
			if (moveToParent) {
				File newLocation = Paths
						.get(downloadedFile.getParentFile().getParentFile().getAbsolutePath(), downloadedFile.getName())
						.toFile();
				FileUtils.moveFile(downloadedFile, newLocation);
				downloadedFile = newLocation;
				downloadPath.toFile().delete();
			}
		} catch (IllegalArgumentException | NullPointerException e) {
			e.printStackTrace();
		}

		return downloadedFile;
	}

	@Override
	public List<File> downloadArchives(List<String> urls, String path, UUID seltzerId, Map<String, String> cookieMap)
			throws SQLException, IOException, InterruptedException {
		return downloadArchives(urls, path, true, seltzerId, cookieMap);
	}

	@Override
	public List<File> downloadArchives(List<String> urls, String path, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap)
			throws SQLException, IOException, InterruptedException {
		List<File> archives = new ArrayList<>();

		for (String url : urls) {
			archives.add(downloadFile(url, path, false, seltzerId, cookieMap));
		}

		if (moveToParent) {
			for (int i = 0; i < archives.size(); i++) {
				archives.set(i, moveToParent(archives.get(i)));
			}
		}

		return archives;
	}

	@Override
	public List<File> downloadArchives(List<String> urls, String path, String name, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap)
			throws SQLException, IOException, InterruptedException {
		List<File> archives = downloadArchives(urls, path, false, seltzerId, cookieMap);

		File archive = null;

		if (!archives.isEmpty()) {
			archive = combineArchives(archives, name);

			if (archive != null && moveToParent) {
				File temp = archive.getParentFile();
				archive = moveToParent(archive);
				FileUtils.deleteDirectory(temp);
			}
		}

		archives.clear();
		archives.add(archive);

		return archives;
	}

	@Override
	public List<File> downloadClips(List<String> urls, String path, UUID seltzerId, Map<String, String> cookieMap)
			throws SQLException, IOException, InterruptedException {
		return downloadClips(urls, path, true, seltzerId, cookieMap);
	}

	@Override
	public List<File> downloadClips(List<String> urls, String path, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap)
			throws SQLException, IOException, InterruptedException {
		List<File> clips = new ArrayList<>();

		for (String url : urls) {
			clips.add(downloadFile(url, path, false, seltzerId, cookieMap));
		}

		if (moveToParent) {
			for (int i = 0; i < clips.size(); i++) {
				clips.set(i, moveToParent(clips.get(i)));
			}
		}

		return clips;
	}

	@Override
	public List<File> downloadClips(List<String> urls, String path, String type, String name, boolean moveToParent,
			boolean archiveClips, Map<String, String> metadataMap, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException {
		String uniqueMarker = " [" + System.currentTimeMillis() + "]";
		name = name + uniqueMarker;
		
		List<File> clips = downloadClips(urls, path, false, seltzerId, cookieMap);

		File movie = null;

		if (!clips.isEmpty()) {
			movie = combineClips(clips, name, type, archiveClips, metadataMap);

			if (movie != null && moveToParent) {
				File temp = movie.getParentFile();
				movie = moveToParent(movie);
				FileUtils.deleteDirectory(temp);
			}
		}

		clips.clear();
		clips.add(movie);

		return clips;
	}

	private File combineArchives(List<File> archives, String name)
			throws IOException, SQLException, InterruptedException {
		for (int i = 0; i < archives.size(); i++) {
			if (archives.get(i) == null) {
				archives.remove(i);
			}
		}
		
		if (archives.isEmpty()) {
			return null;
		}

		String zipPath = configDao.loadConfig("7zipLocation");
		File parent = archives.get(0).getParentFile();

		StringBuilder builder = new StringBuilder();
		builder.append("\"{0}\" ");
		builder.append("e -o\"{1}\" ");
		builder.append("\"{2}\" ");

		for (File archive : archives) {
			String command = MessageFormat.format(builder.toString(), zipPath, archive.getParentFile(),
					archive.getAbsolutePath());
			Process process = Runtime.getRuntime().exec(command);
			process.waitFor(30, TimeUnit.SECONDS);
			archive.delete();
		}

		for (File directory : FileUtils.listFilesAndDirs(parent, FalseFileFilter.FALSE, TrueFileFilter.TRUE)) {
			if (!parent.equals(directory)) {
				directory.delete();
			}
		}

		builder.setLength(0);
		builder.append("\"{0}\" ");
		builder.append("a \"{1}\" ");
		builder.append("\"{2}\"");

		for (File file : FileUtils.listFiles(parent, null, true)) {
			FileUtils.moveFileToDirectory(file, Paths.get(parent.getAbsolutePath(), "Image Set").toFile(), true);
		}

		Path finalZip = Paths.get(parent.getAbsolutePath(), name + ".zip");
		Path imageSet = Paths.get(parent.getAbsolutePath(), "Image Set");

		String command = MessageFormat.format(builder.toString(), zipPath, finalZip.toString(), imageSet.toString());
		Process process = Runtime.getRuntime().exec(command);
		process.waitFor(30, TimeUnit.SECONDS);

		File archive = finalZip.toFile();

		return archive;
	}

	private File combineClips(List<File> clips, String name, String type, boolean archiveClips, Map<String, String> metadataMap) throws IOException, SQLException, InterruptedException {
		if (clips.isEmpty()) {
			return null;
		}

		String ffmpegPath = configDao.loadConfig("ffmpegLocation");
		String ffprobePath = configDao.loadConfig("ffprobeLocation");
		File parent = null;
		for(File clip : clips) {
			if (clip != null && clip.getParentFile() != null) {
				parent = clip.getParentFile();
				break;
			}
		}
		if (parent == null) {
			return null;
		}
		String command;
		Process process;

		StringBuilder builder = new StringBuilder();
		builder.append("\"{0}\" ");
		builder.append("-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ");
		builder.append("\"{1}\"");

		List<Integer> clipDurations = new ArrayList<>();

		File concatList = Paths.get(parent.getAbsolutePath(), "concat.txt").toFile();
		concatList.createNewFile();
		BufferedWriter concatWriter = new BufferedWriter(new FileWriter(concatList));

		Integer duration;
		for (File clip : clips) {
			concatWriter.write("file '");
			concatWriter.write(clip.getAbsolutePath());
			concatWriter.write("'");
			concatWriter.newLine();

			command = MessageFormat.format(builder.toString(), ffprobePath, clip.getAbsolutePath());
			process = Runtime.getRuntime().exec(command);
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

			process.waitFor(5, TimeUnit.MINUTES);

			duration = ((Double) (Double.parseDouble(reader.readLine()) * 1000)).intValue();
			clipDurations.add(duration);
		}
		concatWriter.flush();
		concatWriter.close();

		builder.setLength(0);
		builder.append("\"{0}\" ");
		builder.append("-f concat -safe 0 -i ");
		builder.append("\"{1}\" ");
		builder.append("-c copy ");
		builder.append("\"{2}\"");

		command = MessageFormat.format(builder.toString(), ffmpegPath, concatList.getAbsolutePath(),
				Paths.get(parent.getAbsolutePath(), name + ".mkv").toString());
		process = Runtime.getRuntime().exec(command);

		BufferedReader ffme = new BufferedReader(new InputStreamReader(process.getErrorStream()));
		String line;
		
		do {
			line = ffme.readLine();
			System.out.println(line);
		} while (!process.waitFor(500, TimeUnit.MILLISECONDS) || ffme.ready());
		ffme.close();

		applyMetadata(Paths.get(parent.getAbsolutePath(), name + ".mkv").toFile(), metadataMap, clipDurations);

		if (archiveClips) {
			String zipPath = configDao.loadConfig("7zipLocation");
			type = type.toUpperCase().trim();
			
			builder.setLength(0);
			builder.append("\"{0}\" ");
			builder.append("a \"{1}\" ");
			builder.append("\"{2}\"");

			for (File clip : clips) {
				FileUtils.moveFileToDirectory(clip, Paths.get(parent.getAbsolutePath(), type).toFile(), true);
			}

			Path finalZip = Paths.get(parent.getAbsolutePath(), name + " (" + type + ").zip");
			Path clipSet = Paths.get(parent.getAbsolutePath(), type);

			command = MessageFormat.format(builder.toString(), zipPath, finalZip.toString(), clipSet.toString());
			process = Runtime.getRuntime().exec(command);
			process.waitFor(5, TimeUnit.MINUTES);
			
			moveToParent(finalZip.toFile());
		}
		
		return Paths.get(parent.getAbsolutePath(), name + " (" + type.toUpperCase().trim() + ").mkv").toFile();
	}

	@Override
	public File applyMetadata(File movie, Map<String, String> metadataMap, List<Integer> chapterTimes) throws IOException, SQLException, InterruptedException {
		String ffmpegPath = configDao.loadConfig("ffmpegLocation");
		File metadata = Paths.get(movie.getParent(), "metadata.txt").toFile();
		metadata.createNewFile();
		BufferedWriter metadataWriter = new BufferedWriter(new FileWriter(metadata));

		Integer totalDuration = 0;
		Integer chapter = 1;

		metadataWriter.write(";FFMETADATA1");
		metadataWriter.newLine();
		if (metadataMap != null) {
			for (String key : metadataMap.keySet()) {
				metadataWriter.write(key + "=" + metadataMap.get(key));
				metadataWriter.newLine();
			}
		}
		if (chapterTimes != null) {
			for (Integer time : chapterTimes) {
				metadataWriter.write("[CHAPTER]");
				metadataWriter.newLine();
				metadataWriter.write("TIMEBASE=1/1000");
				metadataWriter.newLine();
				metadataWriter.write("START=");
				metadataWriter.write(totalDuration.toString());
				metadataWriter.newLine();
				metadataWriter.write("END=");
				totalDuration += time;
				metadataWriter.write(totalDuration.toString());
				metadataWriter.newLine();
				metadataWriter.write("title=Scene ");
				metadataWriter.write(chapter.toString());
				metadataWriter.newLine();
				chapter++;
			}
		}
		
		FileUtils.moveFile(movie, Paths.get(movie.getParent(), FilenameUtils.getBaseName(movie.getName()) + "_temp." + FilenameUtils.getExtension(movie.getName())).toFile());

		metadataWriter.flush();
		metadataWriter.close();

		StringBuilder builder = new StringBuilder();
		builder.append("\"{0}\" ");
		builder.append("-i ");
		builder.append("\"{1}\" ");
		builder.append("-i ");
		builder.append("\"{2}\" ");
		builder.append("-map_metadata 1 -c copy ");
		builder.append("\"{3}\"");

		String command = MessageFormat.format(builder.toString(), ffmpegPath,
				Paths.get(movie.getParent(), FilenameUtils.getBaseName(movie.getName()) + "_temp." + FilenameUtils.getExtension(movie.getName())).toString(), metadata.getAbsolutePath(),
				Paths.get(movie.getParent(), FilenameUtils.getBaseName(movie.getName()) + ".mkv").toString());
		Process process = Runtime.getRuntime().exec(command);

		BufferedReader ffme = new BufferedReader(new InputStreamReader(process.getErrorStream()));
		String line;
		do {
			line = ffme.readLine();
			System.out.println(line);
		} while (!process.waitFor(500, TimeUnit.MILLISECONDS) || ffme.ready());
		ffme.close();
		
		Paths.get(movie.getParent(), FilenameUtils.getBaseName(movie.getName()) + "_temp." + FilenameUtils.getExtension(movie.getName())).toFile().delete();
		metadata.delete();
		
		return Paths.get(movie.getParent(), FilenameUtils.getBaseName(movie.getName()) + ".mkv").toFile();
	}
	
	private File moveToParent(File file) throws IOException {
		FileUtils.moveFile(file,
				Paths.get(file.getParentFile().getParentFile().getAbsolutePath(), file.getName()).toFile());
		return Paths.get(file.getParentFile().getParentFile().getAbsolutePath(), file.getName()).toFile();
	}
}
