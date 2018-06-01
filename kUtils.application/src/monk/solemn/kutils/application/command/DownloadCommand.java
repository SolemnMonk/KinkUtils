package monk.solemn.kutils.application.command;

import java.util.HashMap;
import java.util.Map;

import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.TaskQueue;
import monk.solemn.kutils.enums.Action;
import monk.solemn.kutils.enums.EntityClass;
import monk.solemn.kutils.objects.Task;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=download"},
		   service=DownloadCommand.class)
public class DownloadCommand {
	public void download(String pluginKey, String targetType, String url) {
		Task task = null;
		try {
			task = new Task(Action.DOWNLOAD, EntityClass.valueOf(targetType.toUpperCase()));
		} catch (IllegalArgumentException e) {
			System.out.println("'" + targetType + "' is not a valid target. Valid targets are: ");
			for (EntityClass t : EntityClass.values()) {
				System.out.println("\t" + t.toString());
			}
			return;
		}
		
		Map<String, String> data = new HashMap<>();
		data.put("pluginKey", pluginKey);
		data.put("url", url);
		
		task.setData(data);
		
		TaskQueue.addTask(task);
	}
}
