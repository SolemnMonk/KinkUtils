package monk.solemn.k.utils;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebApplication;

import monk.solemn.k.utils.data.ActorDao;
import monk.solemn.k.utils.data.ActorDaoImpl;
import monk.solemn.k.utils.data.ConfigDao;
import monk.solemn.k.utils.data.ConfigDaoImpl;
import monk.solemn.k.utils.data.CredentialDao;
import monk.solemn.k.utils.data.CredentialDaoImpl;

/**
 * Application object for your web application.
 * If you want to run this application without deploying, run the Start class.
 * 
 * @see monk.solemn.k.utils.Start#main(String[])
 */
public class WicketApplication extends WebApplication
{
	private static ConfigDao configDao = null;
	private static ActorDao actorDao = null;
	private static CredentialDao credentialDao = null;
	
	/**
	 * @see org.apache.wicket.Application#getHomePage()
	 */
	@Override
	public Class<? extends WebPage> getHomePage()
	{
		return LaunchSelenium.class;
	}

	/**
	 * @see org.apache.wicket.Application#init()
	 */
	@Override
	public void init()
	{
		super.init();

		// add your configuration here
	}
	
	public static ConfigDao getConfigDao() {
		if (configDao == null) {
			configDao = new ConfigDaoImpl();
		}
		
		return configDao;
	}
	
	public static ActorDao getActorDao() {
		if (actorDao == null) {
			actorDao = new ActorDaoImpl();
		}
		
		return actorDao;
	}
	
	public static CredentialDao getCredentialDao() {
		if (credentialDao == null) {
			credentialDao = new CredentialDaoImpl();
		}
		
		return credentialDao;
	}
}
