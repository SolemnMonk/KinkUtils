package monk.solemn.kutils.application.command.abbreviated;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.command.AddSiteCommand;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=asi"},
		   service=AsiCommand.class,
		   immediate=true)
public class AsiCommand {
	public void asi(String name, String url) {
		new AddSiteCommand().addSite(name, url);
	}
}
