package monk.solemn.kutils.data.impl.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.data.api.BaseDao;
import monk.solemn.kutils.data.api.ConfigDao;

@Component
public class ConfigDaoImpl extends BaseDao implements ConfigDao {
	@Override
	public String loadConfig(String key) throws SQLException {
		Connection connection = connect();
		
		String value = null;
		
		PreparedStatement pStatement;
		ResultSet results;
		StringBuilder query = new StringBuilder();
		
		query.append("SELECT `value` FROM GlobalConfig WHERE `key` = ? LIMIT 1");
		pStatement = connection.prepareStatement(query.toString());
		pStatement.setString(1, key);
		results = pStatement.executeQuery();
		
		if (results.next()) {
			value = results.getString(1);
		}
		pStatement.close();
		
		disconnect(connection);
		return value;
	}

	@Override
	public void saveConfig(String key, String value) throws SQLException {
		Connection connection = connect();
		
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
		
		disconnect(connection);
	}

}
