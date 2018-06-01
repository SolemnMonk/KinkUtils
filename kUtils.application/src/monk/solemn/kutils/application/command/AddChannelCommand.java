package monk.solemn.kutils.application.command;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

import monk.solemn.kutils.data.api.EntityRecordDao;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=addChannel"},
		   service=AddChannelCommand.class,
		   immediate=true)
public class AddChannelCommand {
	private static EntityRecordDao entityRecordDao;
	
	@Reference(
			service=EntityRecordDao.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetConfigDao"
			)
	public void setConfigDao(EntityRecordDao entityRecordDao) {
		AddChannelCommand.entityRecordDao = entityRecordDao;
	}
	
	public void unsetConfigDao(EntityRecordDao entityRecordDao) {
		AddChannelCommand.entityRecordDao = null;
	}
	
	@Activate
	public void start() {
	}
	
	public void addChannel(String name, String url) {
		try {
			if (entityRecordDao != null) {
				Map<String, String> data = new HashMap<>();
				data.put("name", name);
				entityRecordDao.addNewChannel(url, data);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
