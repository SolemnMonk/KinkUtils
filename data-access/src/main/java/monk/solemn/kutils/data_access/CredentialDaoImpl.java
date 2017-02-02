package monk.solemn.kutils.data_access;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import monk.solemn.kutils.objects.Credentials;

public class CredentialDaoImpl extends BaseDao implements CredentialDao {
	@Override
	public Credentials loadSiteCredentials(String siteName, String password) throws SQLException {
		Connection connection = connect();
		
		Credentials credentials;
		PreparedStatement pStatement;
		ResultSet results;
		StringBuilder query = new StringBuilder();
		 
		query.append("SELECT sc.username AS un, sc.password AS pw FROM ");
		query.append("sitecredentials AS sc INNER JOIN sites AS s ON ");
		query.append("s.siteId = sc.siteId WHERE s.siteDisplayName = ? ");
		query.append("OR s.urlSafeSiteName = ? LIMIT 1");
		pStatement = connection.prepareStatement(query.toString());
		pStatement.setString(1, siteName);
		pStatement.setString(2, siteName);
		results = pStatement.executeQuery();
		if (results.next()) {
			credentials = new Credentials(results.getString("un"), results.getString("pw"));
		} else {
			credentials = null;
		}
		
		// Go check for network credentials if there are no site-specific ones
		if (credentials == null) {
			query.setLength(0);
			query.append("SELECT n.name AS name FROM sites AS s INNER ");
			query.append("JOIN networks AS n ON s.networkId = ");
			query.append("n.networkId WHERE s.networkId IS NOT NULL AND ");
			query.append("s.siteDisplayName = ? OR s.urlSafeSiteName = ?");
			
			pStatement = connection.prepareStatement(query.toString());
			pStatement.setString(1, siteName);
			pStatement.setString(2, siteName);
			results = pStatement.executeQuery();
			if (results.next()) {
				credentials = loadNetworkCredentials(results.getString("name"), password);
			} else {
				credentials = null;
			}
		}
		
		disconnect(connection);
		return credentials;
	}

	@Override
	public void saveSiteCredentials(String siteName, Credentials credentials, String password) throws SQLException {
	}

	@Override
	public void removeSiteCredentials(String siteName, Long credentialId) throws SQLException {
		Connection connection = connect();
		
		PreparedStatement pStatement;
		StringBuilder query = new StringBuilder();
		
		query.append("DELETE FROM sitecredentials WHERE credentialId = ?");
		
		pStatement = connection.prepareStatement(query.toString());
		pStatement.setLong(1, credentialId);
		pStatement.execute();
		
		disconnect(connection);
	}

	@Override
	public Credentials loadNetworkCredentials(String networkName, String password) throws SQLException {
		Connection connection = connect();
		
		Credentials credentials;
		PreparedStatement pStatement;
		StringBuilder query = new StringBuilder();
		
		query.append("SELECT n.networkId, nc.username AS un, nc.password AS pw ");
		query.append("FROM networkcredentials AS nc INNER JOIN networks ");
		query.append("AS n ON nc.networkId = n.networkId WHERE n.name = ? ");
		query.append("LIMIT 1");
		
		pStatement = connection.prepareStatement(query.toString());
		pStatement.setString(1, networkName);
		ResultSet results = pStatement.executeQuery();
		if (results.next()) {
			credentials = new Credentials(results.getString("un"), results.getString("pw"));
		} else {
			credentials = null;
		}
		
		disconnect(connection);
		return credentials;
	}

	@Override
	public void saveNetworkCredentials(String networkName, Credentials credentials, String password) throws SQLException {
	}

	@Override
	public void removeNetworkCredentials(String siteName, Long credentialId) throws SQLException {
		Connection connection = connect();
		
		PreparedStatement pStatement;
		StringBuilder query = new StringBuilder();
		
		query.append("DELETE FROM networkcredentials WHERE credentialId = ?");
		
		pStatement = connection.prepareStatement(query.toString());
		pStatement.setLong(1, credentialId);
		pStatement.execute();
		
		disconnect(connection);
	}

}
