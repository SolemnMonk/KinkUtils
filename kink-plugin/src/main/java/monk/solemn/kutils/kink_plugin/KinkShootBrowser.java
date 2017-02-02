package monk.solemn.kutils.kink_plugin;

import java.text.MessageFormat;

import org.openqa.selenium.WebDriver;

import monk.solemn.kutils.api.shoots.SeleniumShootBrowser;
import monk.solemn.kutils.objects.QueuedTask;

public class KinkShootBrowser implements SeleniumShootBrowser {
	@Override
	public void loadBrowsePage(WebDriver driver) {
		QueuedTask queuedTask = KinkPlugin.getQueuedTask();
		
		String url = KinkPlugin.getUrl("LatestShootsUrl");
		url = MessageFormat.format(url, KinkPlugin.getSiteShortName(queuedTask.getData().get("SiteName")), 1);
		driver.get(url);
	}

	@Override
	public void previousBrowsePage(WebDriver driver) {
	}

	@Override
	public void nextBrowsePage(WebDriver driver) {
	}

	@Override
	public void loadShoot(WebDriver driver) {
	}
}
