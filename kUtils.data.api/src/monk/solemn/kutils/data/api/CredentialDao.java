package monk.solemn.kutils.data.api;

import java.sql.SQLException;

import monk.solemn.kutils.objects.Credentials;

public interface CredentialDao {
	public Credentials loadSiteCredentials(String siteName, String password) throws SQLException;
	
	public void saveSiteCredentials(String siteName, Credentials credentials, String password) throws SQLException;
	
	public void removeSiteCredentials(String siteName, Long credentialId) throws SQLException;
	
	public Credentials loadNetworkCredentials(String networkName, String password) throws SQLException;
	
	public void saveNetworkCredentials(String networkName, Credentials credentials, String password) throws SQLException;
	
	public void removeNetworkCredentials(String siteName, Long credentialId) throws SQLException;
}
