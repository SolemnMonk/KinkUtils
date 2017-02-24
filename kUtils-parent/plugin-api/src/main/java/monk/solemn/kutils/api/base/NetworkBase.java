
package monk.solemn.kutils.api.base;

import java.util.List;

import ro.fortsoft.pf4j.ExtensionPoint;

public interface NetworkBase extends ExtensionPoint, Runnable {
	/**
	 * Returns the list of friendly site names this network plugin supports 
	 * 
	 * @return the list of friendly site names this network plugin supports
	 */
	List<String> getSites();
	
	boolean taskRequiresAuthentication();
}
