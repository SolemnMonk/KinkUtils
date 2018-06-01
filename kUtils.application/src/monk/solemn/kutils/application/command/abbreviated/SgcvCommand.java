package monk.solemn.kutils.application.command.abbreviated;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.command.SetGlobalConfigValueCommand;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=sgcv"},
		   service=SgcvCommand.class)
public class SgcvCommand {
	public void sgcv(String key, String value) {
		new SetGlobalConfigValueCommand().setGlobalConfigValue(key, value);
	}
}
