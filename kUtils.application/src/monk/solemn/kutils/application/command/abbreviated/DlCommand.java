package monk.solemn.kutils.application.command.abbreviated;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.command.DownloadCommand;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=dl"},
		   service=DlCommand.class)
public class DlCommand {
	public void dl(String pluginKey, String targetType, String url) {
		new DownloadCommand().download(pluginKey, targetType, url);
	}

	public void dl(String pluginKey, String targetType, String url, String renameMask) {
		new DownloadCommand().download(pluginKey, targetType, url, renameMask);
	}
}
