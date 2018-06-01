package monk.solemn.kutils.application.command.abbreviated;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.command.AddSearchCommand;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=ase"},
		   service=AseCommand.class,
		   immediate=true)
public class AseCommand {
	public void ase(String name, String url) {
		new AddSearchCommand().addSearch(name, url);
	}
}
