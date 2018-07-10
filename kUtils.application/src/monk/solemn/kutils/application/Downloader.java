package monk.solemn.kutils.application;

import javax.naming.OperationNotSupportedException;

import monk.solemn.kutils.objects.Task;
import monk.solemn.kutils.plugin.api.SourceSiteDownloaderPlugin;

public class Downloader {
	public static void download(SourceSiteDownloaderPlugin plugin, Task task) throws OperationNotSupportedException {
		switch (task.getTarget()) {
		case BUNDLE:
			downloadBundle(plugin, task);
			break;
		case ITEM:
			downloadItem(plugin, task);
			break;
		default:
			break;
		}
	}

	private static void downloadBundle(SourceSiteDownloaderPlugin plugin, Task task) throws OperationNotSupportedException {
		plugin.downloadBundle();
	}

	private static void downloadItem(SourceSiteDownloaderPlugin plugin, Task task) throws OperationNotSupportedException {
		plugin.downloadItem();
	}
}
