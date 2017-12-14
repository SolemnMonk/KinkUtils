package monk.solemn.kutils.data.impl.sqlite;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.data.api.ConfigDao;

@Component
public class ConfigDaoImpl implements ConfigDao {
	public ConfigDaoImpl() {
//		try {
//			KUtilsImage.setBasePath(loadConfig("basePath"));
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
	}
	
	@Override
	public String loadConfig(String key, long pluginReferenceId) throws SQLException {
		String value = null;
		
		StringBuilder query = new StringBuilder();
		
		query.append("SELECT `value` FROM config WHERE `key` = '");
		query.append(key);
		query.append("' AND `pluginReferenceId` = ");
		query.append(pluginReferenceId);
		query.append(" LIMIT 1");

		Process process = null;
		try {
			process = new ProcessBuilder("python.exe", "-q", query.toString()).start();
		} catch (IOException e) {
			e.printStackTrace();
		}
		BufferedReader stdout = new BufferedReader(new InputStreamReader(process.getInputStream()));
		
		StringBuilder outputBuilder = new StringBuilder();
		String line;
		
		try {
			while ((line = stdout.readLine()) != null) {
				outputBuilder.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		value = outputBuilder.toString();
		
		return value;
	}

	@Override
	public void saveConfig(String key, String value, long pluginReferenceId) throws SQLException {
		PreparedStatement pStatement;
		StringBuilder query = new StringBuilder();
		
		query.append("SELECT configId FROM GlobalConfig WHERE `key` = ?");
		pStatement = connection.prepareStatement(query.toString());
		pStatement.setString(1, key);
		
		boolean hasResult = pStatement.executeQuery().next();

		query.setLength(0);
		pStatement.close();
		
		if (hasResult) {
			query.append("UPDATE GlobalConfig SET `value` = ? WHERE `key` = ?");
		} else {
			query.append("INSERT INTO GlobalConfig (`key`, `value`) VALUES (?, ?)");
		}
		
		pStatement = connection.prepareStatement(query.toString());
		
		if (hasResult) {
			pStatement.setString(1, value);
			pStatement.setString(2, key);			
		} else {
			pStatement.setString(1, key);
			pStatement.setString(2, value);
		}
		
		pStatement.execute();
		pStatement.close();
	}
}
