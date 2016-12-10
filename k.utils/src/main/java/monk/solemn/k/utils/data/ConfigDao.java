package monk.solemn.k.utils.data;

import java.sql.SQLException;

public interface ConfigDao {
	public String loadConfig(String key) throws SQLException;
	
	public void saveConfig(String key, String value) throws SQLException;
}
