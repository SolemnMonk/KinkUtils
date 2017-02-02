package monk.solemn.kutils.api.authentication;

import ro.fortsoft.pf4j.ExtensionPoint;

public interface Authentication extends ExtensionPoint {
	boolean login();
	
	void logout();
}
