package monk.solemn.kutils.data.api;

import java.io.IOException;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface ConfigDao {
	public String loadGlobalConfig(String key) throws IOException;
	
	public String loadConfig(String key, Long pluginReferenceId) throws IOException;
	
	public void saveGlobalConfig(String key, String value) throws IOException;
	
	public void saveConfig(String key, String value, Long pluginReferenceId) throws IOException;
}
