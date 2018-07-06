package monk.solemn.kutils.data.api;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.objects.BundleDownloadTicket;
import monk.solemn.kutils.objects.DownloadTicket;
import monk.solemn.kutils.objects.ItemDownloadTicket;

public interface EntityDownloadService {
	ItemDownloadTicket getDownloadTicket(String pluginKey, ContentType contentType, String url);
	
	BundleDownloadTicket getDownloadTicket(String pluginKey, ContentType contentType, List<String> urls);
	
	/**
	 * Finalizes the download by moving it into one of the file pools, inserts the Item into the database, and 
	 * returns the ID of the Item. If the download ticket passed in is not one that kUtils has stored (i.e. it has been 
	 * modified, the ticket has been purged due to inactivity, or it was created outside of this service), kUtils will 
	 * silently delete the tempDir listed in the passed in ticket (if it exists) and return null;
	 * 
	 * @param ticket The download ticket given by getDownloadTicket
	 * @param item The final file for the item downloaded
	 * @return The ID of the downloaded item
	 * @throws IOException Thrown if kUtils can't clear the temp directory or move the file
	 */
	
	Long finalizeDownload(DownloadTicket ticket, File item) throws IOException;
	
	Long finalizeDownload(DownloadTicket ticket, List<File> items) throws IOException;
	
	Long finalizeDownload(DownloadTicket ticket, File item, String parentPath) throws IOException;
	
	Long finalizeDownload(DownloadTicket ticket, List<File> items, String parentPath) throws IOException;
	
	Long finalizeDownload(DownloadTicket ticket, File item, String parentPath, String renameMask) throws IOException;
	
	Long finalizeDownload(DownloadTicket ticket, List<File> items, Map<String, String> metadata, String parentPath, String renameMask) throws IOException;

	File download(ItemDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException;
	
	List<File> download(BundleDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException;
	
	File downloadWithAria(ItemDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException;
	
	List<File> downloadWithAria(BundleDownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException;
}
