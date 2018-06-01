package monk.solemn.kutils.application;

import java.util.ArrayList;
import java.util.List;

import monk.solemn.kutils.objects.Task;

public class TaskQueue {
	private static List<Task> tasks = new ArrayList<>();
	
	public static boolean addTask(Task task) {
		if (TaskValidator.isValidTask(PluginTools.findPlugin(task.getData().get("pluginKey")), 	task)) {
			tasks.add(task);
			return true;
		}
		
		return false;
	}
	
	public static Task popTask() {
		Task t = tasks.get(0);
		tasks.remove(0);
		return t;
	}
	
	public static Task popTask(int index) {
		if (index > (tasks.size() - 1)) {
			return null;
		}
		
		Task t = tasks.get(index);
		tasks.remove(index);
		return t;
	}
	
	public static int getTaskCount() {
		return tasks.size();
	}
	
	public static boolean hasTasks() {
		return tasks.size() > 0;
	}
}
