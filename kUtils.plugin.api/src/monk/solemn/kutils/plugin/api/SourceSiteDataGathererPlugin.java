package monk.solemn.kutils.plugin.api;

import java.util.Map;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface SourceSiteDataGathererPlugin extends SourceSitePlugin {
	String getTitle();
	
	String getDataByKey(String key);
	
	Map<String, String> getAllData();
}
