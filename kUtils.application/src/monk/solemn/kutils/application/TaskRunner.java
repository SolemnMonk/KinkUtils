package monk.solemn.kutils.application;

import monk.solemn.kutils.objects.Task;
import monk.solemn.kutils.plugin.api.SourceSiteDownloaderPlugin;
import monk.solemn.kutils.plugin.api.SourceSitePlugin;

public class TaskRunner implements Runnable {
	boolean isShuttingDown = false;

	@Override
	public void run() {
		System.out.println("TaskRunner has started.");
		while (!isShuttingDown) {
			if (TaskQueue.hasTasks()) {
				Task task = TaskQueue.popTask();

				SourceSitePlugin plugin = PluginTools.findSourceSitePlugin(task.getData().get("pluginKey"));
				plugin.loadTask(task);
				
				if (plugin.taskRequiresAuthentication()) {
					plugin.authenticate();
				}
				
				switch (task.getAction()) {
				case DOWNLOAD:
					Downloader.download((SourceSiteDownloaderPlugin) plugin, task);
					break;
				case GATHER_DATA:
					break;
				case RIP:
					break;
				case MONITOR:
					break;
				default:
					break;
				}
			}
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	public void shutdown() {
		isShuttingDown = true;
	}

	public void cancelShutdown() {
		isShuttingDown = false;
	}
}
