package monk.solemn.kutils.application.command;

import java.io.IOException;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

import monk.solemn.kutils.data.api.ConfigDao;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=setGlobalConfigValue"},
		   service=SetGlobalConfigValueCommand.class,
		   immediate=true)
public class SetGlobalConfigValueCommand {
	private static ConfigDao configDao;
	
	@Reference(
			service=ConfigDao.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetConfigDao"
			)
	public void setConfigDao(ConfigDao configDao) {
		SetGlobalConfigValueCommand.configDao = configDao;
	}
	
	public void unsetConfigDao(ConfigDao configDao) {
		SetGlobalConfigValueCommand.configDao = null;
	}
	
	@Activate
	public void start() {
	}
	
	public void setGlobalConfigValue(String key, String value) {
		try {
			if (configDao != null) {
				configDao.saveGlobalConfig(key, value);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
