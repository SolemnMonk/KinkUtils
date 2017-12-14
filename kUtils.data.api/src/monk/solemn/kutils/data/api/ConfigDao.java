package monk.solemn.kutils.data.api;

import java.sql.SQLException;

public interface ConfigDao {
	public String loadConfig(String key, long pluginReferenceId) throws SQLException;
	
	public void saveConfig(String key, String value, long pluginReferenceId) throws SQLException;
}
