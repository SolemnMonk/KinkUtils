package monk.solemn.kutils.plugin.api;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface SourceSiteDownloaderPlugin extends SourceSitePlugin {
	/**
	 * Executes the currently loaded download task.
	 * 
	 * @return true if the download completed successfully
	 */
	Long downloadItem();
	
	Long downloadBundle();
}
