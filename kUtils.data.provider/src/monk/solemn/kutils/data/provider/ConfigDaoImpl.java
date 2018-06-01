package monk.solemn.kutils.data.provider;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.data.api.ConfigDao;

@Component
public class ConfigDaoImpl implements ConfigDao {
	Runtime runtime = Runtime.getRuntime();
	
	@Override
	public String loadGlobalConfig(String key) throws IOException {
		String query = "SELECT `value` FROM `globalConfig` WHERE `key` = ?";
		String value = null;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setString(1, key);
				ResultSet results = pstmt.executeQuery();
				results.next();
				if (results.next()) {
					value = results.getString(1);
				}
				results.close();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return value;
	}

	@Override
	public String loadConfig(String key, Long pluginReferenceId) throws IOException {
		String query = "SELECT `value` FROM `config` WHERE `key` = ? AND `pluginReferenceId` = ?";
		String value = null;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setString(1, key);
				pstmt.setString(2, pluginReferenceId.toString());
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					value = results.getString(1);
				}
				results.close();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return value;
	}

	@Override
	public void saveGlobalConfig(String key, String value) throws IOException {
		boolean valueExists = StringUtils.isNotBlank(loadGlobalConfig(key));
		
		String query;
		if (valueExists) {
			query = "UPDATE `globalConfig` SET `value` = ? WHERE `key` = ?";
		} else {
			query = "INSERT INTO `globalConfig` (`key`, `value`) VALUES (?, ?)";
		}
		
		Connection conn;
		try {
			conn = openDb();
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				if (valueExists) {
					pstmt.setString(1, value);
					pstmt.setString(2, key);
				} else {
					pstmt.setString(1, key);
					pstmt.setString(2, value);
				}
				
				pstmt.executeUpdate();
			}
			closeDb(conn);
		} catch (SQLException e) {
			throw new IOException(e);
		}
	}

	@Override
	public void saveConfig(String key, String value, Long pluginReferenceId) throws IOException {
		boolean valueExists = StringUtils.isNotBlank(loadConfig(key, pluginReferenceId));
		
		String query;
		if (valueExists) {
			query = "UPDATE `config` SET `value` = ? WHERE `key` = ? AND `pluginReferenceId` = ?";
		} else {
			query = "INSERT INTO `config` (`key`, `value`, `pluginReferenceId`) VALUES (?, ?)";
		}
		
		Connection conn;
		try {
			conn = openDb();
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				if (valueExists) {
					pstmt.setString(1, value);
					pstmt.setString(2, key);
					pstmt.setString(3, pluginReferenceId.toString());
				} else {
					pstmt.setString(1, key);
					pstmt.setString(2, value);
					pstmt.setString(3, pluginReferenceId.toString());
				}
				
				pstmt.executeUpdate();
			}
			closeDb(conn);
		} catch (SQLException e) {
			throw new IOException(e);
		}
	}

	private Connection openDb() throws SQLException {
		return openDb(false);
	}
	
	private Connection openDb(boolean startTransaction) throws SQLException {
		Connection conn = DriverManager.getConnection(Activator.JDBC_STRING);
		
		if (startTransaction) {
			conn.setAutoCommit(false);
		}
		
		return conn;
	}
	
	private void closeDb(Connection conn) throws SQLException {
		closeDb(conn, false);
	}
	
	private void closeDb(Connection conn, boolean shouldCommitTransaction) throws SQLException {
		if (shouldCommitTransaction) {
			conn.commit();
		}
		
		conn.close();
	}
}
