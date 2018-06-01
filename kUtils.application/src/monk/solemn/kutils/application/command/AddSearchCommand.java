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
		 			 Debug.COMMAND_FUNCTION + "=addSearch"},
		   service=AddSearchCommand.class,
		   immediate=true)
public class AddSearchCommand {
	private static EntityRecordDao entityRecordDao;
	
	@Reference(
			service=EntityRecordDao.class,
			cardinality=ReferenceCardinality.MANDATORY,
			policy=ReferencePolicy.STATIC,
			unbind="unsetConfigDao"
			)
	public void setConfigDao(EntityRecordDao entityRecordDao) {
		AddSearchCommand.entityRecordDao = entityRecordDao;
	}
	
	public void unsetConfigDao(EntityRecordDao entityRecordDao) {
		AddSearchCommand.entityRecordDao = null;
	}
	
	@Activate
	public void start() {
	}
	
	public void addSearch(String name, String url) {
		try {
			if (entityRecordDao != null) {
				Map<String, String> data = new HashMap<>();
				data.put("name", name);
				entityRecordDao.addNewSearch(url, data);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
