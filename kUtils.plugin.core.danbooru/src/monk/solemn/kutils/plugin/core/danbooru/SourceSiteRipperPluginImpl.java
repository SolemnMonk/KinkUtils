package monk.solemn.kutils.plugin.core.danbooru;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.naming.OperationNotSupportedException;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

import monk.solemn.kutils.data.api.EntityDownloadService;
import monk.solemn.kutils.data.api.EntityRecordDao;
import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.objects.BundleDownloadTicket;
import monk.solemn.kutils.objects.ItemDownloadTicket;
import monk.solemn.kutils.plugin.api.SourceSiteRipperPlugin;

@Component(service=SourceSiteRipperPlugin.class,
		   immediate=true)
public class SourceSiteRipperPluginImpl extends SourceSiteCommonImpl implements SourceSiteRipperPlugin {
	private static EntityDownloadService entityDownloadService;
	private static EntityRecordDao entityRecordDao;
	
	@Reference(
			service=EntityDownloadService.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetEntityDownloadService"
			)
	public void setEntityDownloadService(EntityDownloadService itemDownloadService) {
		SourceSiteRipperPluginImpl.entityDownloadService = itemDownloadService;
	}
	
	public void unsetEntityDownloadService(EntityDownloadService itemDownloadService) {
		SourceSiteRipperPluginImpl.entityDownloadService = null;
	}
	
	@Reference(
			service=EntityRecordDao.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetEntityRecordDao"
			)
	public void setEntityRecordDao(EntityRecordDao entityRecordDao) {
		SourceSiteRipperPluginImpl.entityRecordDao = entityRecordDao;
	}
	
	public void unsetEntityRecordDao(EntityRecordDao entityRecordDao) {
		SourceSiteRipperPluginImpl.entityRecordDao = null;
	}
	
	@Override
	public Long ripBundle() throws OperationNotSupportedException {
		throw new OperationNotSupportedException("This plugin doesn't support ripping for Bundle entities.");
	}
	
	@Override
	public Long ripChannel() throws OperationNotSupportedException {
		throw new OperationNotSupportedException("This plugin doesn't support ripping for Channel entities.");
	}
	
	@Override
	public Long ripSite() throws OperationNotSupportedException {
		throw new OperationNotSupportedException("This plugin doesn't support ripping for Site entities.");
	}
	
	/* Test command:
	 		rip dbruCore search https://danbooru.donmai.us/posts?utf8=%E2%9C%93&tags=himura_kenshin+sagara_sanosuke 
	 */
	@Override
	public Long ripSearch() throws OperationNotSupportedException {
		return null;
	}

	public Long downloadBundle() {
		try {
			Map<String, String> postDetails = getPostDetails();

			String urlString = getFileUrl(postDetails);

			String fileExt = null;
			if (postDetails.containsKey("file_ext")) {
				fileExt = postDetails.get("file_ext");
			}
			
			if (urlString != null) {
				return downloadBundle(urlString, fileExt);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return -1L;
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
	
	private Long downloadBundle(String urlString, String fileExt)
			throws MalformedURLException, IOException, InterruptedException {
		URL url = new URL(urlString);
		BundleDownloadTicket ticket = entityDownloadService.getDownloadTicket("dbruCore", ContentType.IMAGES, Arrays.asList(url.toString()));
		
		List<File> items = entityDownloadService.download(ticket, null, null);
		
		if (getTask().getData().containsKey("renameMask")) {
			return entityDownloadService.finalizeDownload(ticket, items, getPostDetails(), "Danbooru", getTask().getData().get("renameMask"));
		} else {
			return entityDownloadService.finalizeDownload(ticket, items, getPostDetails(), "Danbooru", "");
		}
	}

	public Long downloadItem() {
		try {
			Map<String, String> postDetails = getPostDetails();
			
			String urlString = getFileUrl(postDetails);
			
			String fileExt = null;
			if (postDetails.containsKey("file_ext")) {
				fileExt = postDetails.get("file_ext");
			}
			
			if (urlString != null) {
				return downloadItem(urlString, fileExt);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return -1L;
	}

	private Long downloadItem(String urlString, String fileExt)
			throws MalformedURLException, IOException, InterruptedException {
		URL url = new URL(urlString);
		ItemDownloadTicket ticket = entityDownloadService.getDownloadTicket("dbruCore", ContentType.IMAGES, url.toString());
		
		File item = entityDownloadService.download(ticket, null, null);
		
		return entityDownloadService.finalizeDownload(ticket, item, "Danbooru");
	}
}
