package monk.solemn.kutils.plugin.api;

import javax.naming.OperationNotSupportedException;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface SourceSiteDownloaderPlugin extends SourceSitePlugin {
	Long downloadItem() throws OperationNotSupportedException;
	
	Long downloadBundle() throws OperationNotSupportedException;
}
