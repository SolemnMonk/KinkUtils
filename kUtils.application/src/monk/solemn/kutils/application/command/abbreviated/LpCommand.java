package monk.solemn.kutils.application.command.abbreviated;

import org.osgi.framework.InvalidSyntaxException;
import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.command.ListPluginsCommand;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=lp"},
		   service=LpCommand.class)
public class LpCommand {
	public String lp() throws InvalidSyntaxException {
		return new ListPluginsCommand().listPlugins();
	}
}
