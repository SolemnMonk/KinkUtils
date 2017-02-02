package monk.solemn.kutils.shoot;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import com.google.gson.Gson;

import monk.solemn.kutils.objects.Rating;

public class ShootParser {
	private static final Logger logger = LogManager.getLogger(ShootParser.class);
	
	public static Date parseDateFromPage(WebDriver driver, String dateFormat, String dateXpath, String dateRegex) {
		String traceString = "dateFormat = \"{}\", dateXpath = \"{}\", dateRegex = \"{}\"";
		logger.traceEntry(traceString, dateFormat, dateXpath, dateRegex);
		
		SimpleDateFormat dateFormatter = new SimpleDateFormat(dateFormat, Locale.US);
		Pattern regex = Pattern.compile(dateRegex);
		Matcher matcher;
		
		String rawDate = driver.findElement(By.xpath(dateXpath)).getText().trim();
		logger.trace("After xpath, rawDate = \"{}\"", rawDate);
		matcher = regex.matcher(rawDate);
		matcher.find();
		rawDate = matcher.group("date");
		logger.trace("After regex, rawDate = \"{}\"", rawDate);
		
		Date date = new Date();
		try {
			date = dateFormatter.parse(rawDate);
		} catch (ParseException e) {
			logger.error(e.getStackTrace());
		}
		
		logger.traceExit("date = \"{}\"", date);
		return date;
	}
	
	public static List<String> parseTagsFromPage(WebDriver driver, String tagXpath, String tagRegex, String prefix, String postfix) {
		String traceString = "tagXpath = \"{}\", tagRegex = \"{}\", prefix = \"{}\", postfix = \"{}\"";
		logger.traceEntry(traceString, tagXpath, tagRegex, prefix, postfix);
		
		Pattern regex = Pattern.compile(tagRegex);
		Matcher matcher;
		List<String> tags = new LinkedList<>();
		String[] tagArray = null;
		
		String rawTags = driver.findElement(By.xpath(tagXpath)).getText().trim();
		logger.trace("After xpath, rawTags = \"{}\"", rawTags);
		
		if (rawTags.indexOf(prefix) == 0) {
			rawTags = rawTags.substring(prefix.length()).trim();
			logger.trace("Prefix found, rawTags = \"{}\"", rawTags);
		}
		
		int postfixPos = rawTags.length() - postfix.length();
		if (rawTags.indexOf(postfix) == postfixPos) {
			rawTags = rawTags.substring(0, postfixPos).trim();
			logger.trace("Postfix found, rawTags = \"{}\"", rawTags);
		}
		// TODO get regex code
		
		logger.traceExit("tags = {}", tags);
		return tags;
	}
	
	public static Rating parseRatingsFromJson(WebDriver driver, String url) {
		return parseRatingsFromJson(driver, url, null);
	}

	public static Rating parseRatingsFromJson(WebDriver driver, String url, String unratedFlag) {
		String traceString = "url = \"{}\", unratedFlag = \"{}\"";
		logger.traceEntry(traceString, url, unratedFlag);
		
		Rating rating;
//		String id = url.substring(url.lastIndexOf('/') + 1);
		
		driver.navigate().to(url);
		
		String json = driver.findElement(By.tagName("body")).getText().trim();
		logger.info("json = {}", json);
		
		driver.navigate().back();
		if (json.contains(unratedFlag)) {
			rating = new Rating(0.0, 0);
		} else {
			Gson gson = new Gson();
			rating = gson.fromJson(json, Rating.class);
			rating.setAvgRating((Double)(rating.getAvgRating() * 51.0));
		}
		
		logger.traceExit("rating = {}", rating);
		return rating;
	}
}
