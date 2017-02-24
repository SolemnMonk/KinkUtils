package monk.solemn.kutils.api.action;

import ro.fortsoft.pf4j.ExtensionPoint;

public interface DownloadAction extends ExtensionPoint {
	boolean requiresAuthentication();
}
