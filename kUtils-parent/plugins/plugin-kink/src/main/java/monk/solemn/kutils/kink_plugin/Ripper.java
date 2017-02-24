package monk.solemn.kutils.kink_plugin;

import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import monk.solemn.kutils.objects.QueuedTask;

public class Ripper {
	public static void performRip(WebDriver driver, QueuedTask task) {
		/*
		 * navigate to shoot page
		 * count shoots
		 * rip each shoot
		 * if 20 shoots, go to next page
		 */
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
			
			for (WebElement link : shootLinks) {
				ripShoot(driver, link.getAttribute("href"), task);
			}
		}
	}
	
	private static void ripShoot(WebDriver driver, String url, QueuedTask task) {
		Downloader.downloadShoot(driver, url, task);
	}
}
