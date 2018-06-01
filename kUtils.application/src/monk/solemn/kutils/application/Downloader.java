package monk.solemn.kutils.application;

import monk.solemn.kutils.objects.Task;
import monk.solemn.kutils.plugin.api.SourceSiteDownloaderPlugin;

public class Downloader {
	public static void download(SourceSiteDownloaderPlugin plugin, Task task) {
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

	private static void downloadBundle(SourceSiteDownloaderPlugin plugin, Task task) {
		plugin.downloadBundle();
	}

	private static void downloadItem(SourceSiteDownloaderPlugin plugin, Task task) {
		plugin.downloadItem();
	}
}
