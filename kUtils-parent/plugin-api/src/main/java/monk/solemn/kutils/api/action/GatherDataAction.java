package monk.solemn.kutils.api.action;

import ro.fortsoft.pf4j.ExtensionPoint;

public interface GatherDataAction extends ExtensionPoint {
	boolean requiresAuthentication();
}
