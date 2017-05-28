package monk.solemn.kutils.plugin.kink;

import java.text.MessageFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import monk.solemn.kutils.objects.QueuedTask;

public class KinkUtilities {
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
	
	public static Date parseDate(String dateFormat, String rawDate) {
		SimpleDateFormat dateFormatter = new SimpleDateFormat(dateFormat, Locale.US);
		
		Date date = new Date();
		try {
			date = dateFormatter.parse(rawDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return date;
	}
	
	public static String formatDate(Date date) {
		SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
		return dateFormatter.format(date);
	}
	
	public static List<String> parseTags(String rawTags) {
		List<String> tags = new LinkedList<>();
		String[] tagArray = null;
		
		tagArray = rawTags.split(",");
		for (String tag : tagArray) {
			tags.add(StringUtils.capitalize(tag.trim()));
		}
		
		return tags;
	}
}
