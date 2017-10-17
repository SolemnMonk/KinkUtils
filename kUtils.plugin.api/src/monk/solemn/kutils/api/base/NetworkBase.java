
package monk.solemn.kutils.api.base;

import java.util.List;

public interface NetworkBase {
	/**
	 * Returns the list of friendly site names this network plugin supports 
	 * 
	 * @return the list of friendly site names this network plugin supports
	 */
	List<String> getSites();
}
