package monk.solemn.kutils.plugin.core.danbooru;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

import monk.solemn.kutils.data.api.EntityDownloadService;
import monk.solemn.kutils.data.api.EntityRecordDao;
import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.objects.BundleDownloadTicket;
import monk.solemn.kutils.plugin.api.SourceSiteDownloaderPlugin;

@Component(service=SourceSiteDownloaderPlugin.class,
		   immediate=true)
public class SourceSiteDownloaderPluginImpl extends SourceSiteCommonImpl implements SourceSiteDownloaderPlugin {
	private static EntityDownloadService entityDownloadService;
	private static EntityRecordDao entityRecordDao;
	
	@Reference(
			service=EntityDownloadService.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetEntityDownloadService"
			)
	public void setEntityDownloadService(EntityDownloadService itemDownloadService) {
		SourceSiteDownloaderPluginImpl.entityDownloadService = itemDownloadService;
	}
	
	public void unsetEntityDownloadService(EntityDownloadService itemDownloadService) {
		SourceSiteDownloaderPluginImpl.entityDownloadService = null;
	}
	
	@Reference(
			service=EntityRecordDao.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetEntityRecordDao"
			)
	public void setEntityRecordDao(EntityRecordDao entityRecordDao) {
		SourceSiteDownloaderPluginImpl.entityRecordDao = entityRecordDao;
	}
	
	public void unsetEntityRecordDao(EntityRecordDao entityRecordDao) {
		SourceSiteDownloaderPluginImpl.entityRecordDao = null;
	}
	
	// Test command: download dbruCore item http://danbooru.donmai.us/posts/439161
	@Override
	public Long downloadItem() {
		try {
			Map<String, String> postDetails = getPostDetails();

			String urlString = getFileUrl(postDetails);

			String fileExt = null;
			if (postDetails.containsKey("file_ext")) {
				fileExt = postDetails.get("file_ext");
			}
			
			if (urlString != null) {
				return download(urlString, fileExt);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return -1L;
	}
	
	// Test command: download dbruCore bundle http://danbooru.donmai.us/posts/737188
	@Override
	public Long downloadBundle() {
		Long itemId = downloadItem();
		
		try {
			entityRecordDao.convertItemToBundle(itemId, getPostDetails());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return itemId;
	}

	private String getFileUrl(Map<String, String> postDetails) {
		if (postDetails.containsKey("large_file_url")) {
			return postDetails.get("large_file_url");
		} else if (postDetails.containsKey("file_url")) {
			return postDetails.get("file_url");
		} else if (postDetails.containsKey("preview_file_url")) {
			return BASE_URL + postDetails.get("preview_file_url");
		}
		return null;
	}
	
	private Long download(String urlString, String fileExt)
			throws MalformedURLException, IOException, InterruptedException {
		URL url = new URL(urlString);
		BundleDownloadTicket ticket = entityDownloadService.getItemDownloadTicket("dbruCore", ContentType.IMAGES, url.toString());
		
		File item = entityDownloadService.download(ticket, null, null);
		
		if (fileExt == null) {
			FilenameUtils.getExtension(item.getName());
		}
		
//		File target = Paths.get(item.getParent(), "woohoo." + fileExt).toFile();
//		item.renameTo(target);
		
		return entityDownloadService.finalizeDownload(ticket, item, "Danbooru");
	}
}
