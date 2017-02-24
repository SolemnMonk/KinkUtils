package monk.solemn.kutils.api.base;

import ro.fortsoft.pf4j.ExtensionPoint;

public interface SiteBase extends ExtensionPoint, Runnable {
	/**
	 * Returns the friendly name for the site this plugin targets
	 * 
	 * @return the friendly name for the site this plugin targets
	 */
	String getSite();
	
	boolean taskRequiresAuthentication();
}