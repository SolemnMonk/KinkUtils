package monk.solemn.kutils.dao;

import java.sql.SQLException;

public interface ConfigDao {
	public String loadConfig(String key) throws SQLException;
	
	public void saveConfig(String key, String value) throws SQLException;
}
