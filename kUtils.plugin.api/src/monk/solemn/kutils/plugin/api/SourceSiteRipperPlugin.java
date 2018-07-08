package monk.solemn.kutils.plugin.api;

import javax.naming.OperationNotSupportedException;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface SourceSiteRipperPlugin extends SourceSitePlugin {
	Long ripBundle() throws OperationNotSupportedException;
	
	Long ripChannel() throws OperationNotSupportedException;

	Long ripSite() throws OperationNotSupportedException;
	
	Long ripSearch() throws OperationNotSupportedException;
}
