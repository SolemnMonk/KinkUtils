package monk.solemn.kutils.api.base;

public interface SiteBase extends Runnable {
	/**
	 * Returns the friendly name for the site this plugin targets
	 * 
	 * @return the friendly name for the site this plugin targets
	 */
	String getSite();
	
	boolean taskRequiresAuthentication();
}
