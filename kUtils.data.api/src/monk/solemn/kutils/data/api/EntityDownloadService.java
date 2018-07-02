package monk.solemn.kutils.data.api;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.enums.EntityClass;
import monk.solemn.kutils.objects.DownloadTicket;

public interface EntityDownloadService {
	DownloadTicket getDownloadTicket(String pluginKey, ContentType contentType, String url, EntityClass entityClass);
	
	DownloadTicket getDownloadTicket(String pluginKey, ContentType contentType, List<String> url, EntityClass entityClass);
	
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
	
	Long finalizeDownload(DownloadTicket ticket, List<File> items, String parentPath, String renameMask) throws IOException;

	File download(DownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException;
	
	File downloadWithAria(DownloadTicket ticket, Map<String, String> cookieMap, String cookieFile) throws IOException, InterruptedException;
}
