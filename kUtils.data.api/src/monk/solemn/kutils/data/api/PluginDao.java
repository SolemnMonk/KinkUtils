package monk.solemn.kutils.data.api;

import java.util.UUID;

public interface PluginDao {
	UUID getId(String name);
	
	void install();
}
