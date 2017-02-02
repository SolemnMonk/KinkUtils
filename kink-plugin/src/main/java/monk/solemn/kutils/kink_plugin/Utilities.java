package monk.solemn.kutils.kink_plugin;

import java.text.MessageFormat;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import monk.solemn.kutils.objects.QueuedTask;

public class Utilities {
	public static void navigateToLatestShoots(WebDriver driver, QueuedTask task) {
		navigateToShootPage(driver, task, 1);
	}
	
	public static void navigateToShootPage(WebDriver driver, QueuedTask task, Integer page) {
		String baseUrl = KinkPlugin.getUrl("ChannelShootPage");
		String channel = KinkPlugin.getSiteShortName(task.getData().get("site-friendly-name"));
		String channelUrl = (new MessageFormat(baseUrl)).format(new String[] {channel, page.toString()});
		driver.get(channelUrl);
	}
	
	public static List<WebElement> getShootLinks(WebDriver driver) {
		String xpath = KinkPlugin.getXpath("AllShoots");
		return driver.findElements(By.xpath(xpath));
	}
	
	public static int countShoots(List<WebElement> shootLinks) {
		return shootLinks.size();
	}
}
