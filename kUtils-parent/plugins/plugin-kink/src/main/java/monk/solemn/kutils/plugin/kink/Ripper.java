package monk.solemn.kutils.plugin.kink;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import monk.solemn.kutils.objects.QueuedTask;

public class Ripper {
	public static void performRip(WebDriver driver, QueuedTask task) {
		boolean siteHasMoreShoots = true;
		int shootsOnPage = 0;
		List<WebElement> shootLinks;
		
		for (int page = 1; siteHasMoreShoots; page++) {
			KinkUtilities.navigateToShootPage(driver, task, page);
			shootLinks = KinkUtilities.getShootLinks(driver);
			shootsOnPage = KinkUtilities.countShoots(shootLinks);

			if (shootsOnPage == 0) {
				siteHasMoreShoots = false;
				continue;
			} else if (shootsOnPage == 20) {
				siteHasMoreShoots = true;
			} else {
				siteHasMoreShoots = false;
			}

			List<String> links = new ArrayList<>();
			for (WebElement link : shootLinks) {
				links.add(link.getAttribute("href"));
			}

			for (String link : links) {
				ripShoot(driver, link, task);
				driver.navigate().back();
			}
		 }
	}

	private static void ripShoot(WebDriver driver, String url, QueuedTask task) {
		Downloader.downloadShoot(driver, url, task);
	}
}
