package monk.solemn.kutils.application.command.abbreviated;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.command.AddChannelCommand;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=ac"},
		   service=AcCommand.class,
		   immediate=true)
public class AcCommand {
	public void ac(String name, String url) {
		new AddChannelCommand().addChannel(name, url);
	}
}
