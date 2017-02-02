package monk.solemn.kutils.kink_plugin;

import java.text.MessageFormat;
import java.util.List;

import org.openqa.selenium.By;
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
		int page = 1;
		int shootsOnPage = 0;
		List<WebElement> shootLinks;
		
		for (int i = 1; siteHasMoreShoots; i++) {
			navigateToShootPage(driver, task, i);
			shootLinks = getShootLinks(driver);
			shootsOnPage = countShoots(shootLinks);
			
			if (shootsOnPage == 0) {
				siteHasMoreShoots = false;
				continue;
			} else if (shootsOnPage == 20) {
				siteHasMoreShoots = true;
			} else {
				siteHasMoreShoots = false;
			}
			
			for (WebElement link : shootLinks) {
				ripShoot(link);
			}
		}
	}
	
	private static void ripShoot() {
		
	}
}
