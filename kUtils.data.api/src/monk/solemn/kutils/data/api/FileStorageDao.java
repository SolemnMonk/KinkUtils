package monk.solemn.kutils.data.api;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface FileStorageDao {
	public boolean checkFileExistence(String path);

	public boolean checkFileExistence(String path, String hash);

	public boolean checkFileExistence(String path, String hash, boolean deleteIfMismatch);

	public void deleteFile(String path) throws SQLException;

	public File downloadFile(String url, String path, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;

	public File downloadFile(String url, String path, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;

	public List<File> downloadArchives(List<String> urls, String path, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;

	public List<File> downloadArchives(List<String> urls, String path, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;

	public List<File> downloadArchives(List<String> urls, String path, String name, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;

	public List<File> downloadClips(List<String> urls, String path, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;

	public List<File> downloadClips(List<String> urls, String path, boolean moveToParent, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;

	public List<File> downloadClips(List<String> urls, String path, String type, String name, boolean moveToParent, boolean archiveClips, Map<String, String> metadataMap, UUID seltzerId, Map<String, String> cookieMap) throws SQLException, IOException, InterruptedException;
	
	public File applyMetadata(File movie, Map<String, String> metadataMap, List<Integer> chapterTimes) throws IOException, SQLException, InterruptedException;
}
