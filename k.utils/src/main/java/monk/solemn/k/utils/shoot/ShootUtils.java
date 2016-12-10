package monk.solemn.k.utils.shoot;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.google.gson.Gson;

import monk.solemn.k.utils.KUtilsImage;
import monk.solemn.k.utils.LaunchSelenium;
import monk.solemn.k.utils.Rating;
import monk.solemn.k.utils.actor.Actor;
import monk.solemn.k.utils.actor.ActorUtils;
import monk.solemn.k.utils.enums.ShootType;

public class ShootUtils {
	private static final Logger logger = LogManager.getLogger(ShootUtils.class);
	private static final List<Shoot> shoots = new LinkedList<>();
	
	public static Shoot getShootData(WebDriver driver) throws SQLException {
		logger.traceEntry();
		
		String externalUrl = driver.getCurrentUrl().trim();
		logger.trace("externalUrl = {}", externalUrl);
		String id = externalUrl.substring(externalUrl.lastIndexOf('/') + 1);
		logger.trace("id = {}", id);
		String site = "Kink Test Shoots";
		ShootType shootType = ShootType.Video;
		String title = driver.findElement(By.xpath("//div[@class='shoot-info']/h1")).getText().trim();
		logger.trace("title = {}", title);
		String description = driver.findElement(By.xpath("//div[@class='shoot-info']/div[@class='description']")).getText().trim();
		logger.trace("description = {}", description);
		Calendar date = Calendar.getInstance();
		date.setTime(parseDate(driver, "MMMM d, yyyy"));
		List<String> tags = parseTags(driver);
		Rating rating = parseRating(driver, id);
		List<Actor> shootActors = ActorUtils.parseActors(driver);
		List<KUtilsImage> previewImages = getPreviewImages(driver);
		KUtilsImage coverImage = getCoverImage(driver);
		
		Shoot shoot = new Shoot(id);
		shoot.setSite(site);
		shoot.setShootType(shootType);
		shoot.setTitle(title);
		shoot.setDescription(description);
		shoot.setDate(date);
		shoot.setTags(tags);
		shoot.setRating(((Double)(rating.getAvgRating() * 51)).intValue());
		shoot.setNumRatings(rating.getNumRatings());
		shoot.setActors(shootActors);
		shoot.setCoverImage(coverImage);
		shoot.setPreviewImages(previewImages);
		shoot.setExternalUrl(externalUrl);
		
		for (Actor actor : shootActors) {
			actor.addShoot(shoot);
		}
		
		shoots.add(shoot);
		logger.traceExit();
		return shoot;
	}
	
	private static List<KUtilsImage> getPreviewImages(WebDriver driver) {
		String kinkPreviewImageListXpath = "//div[@class='shoot-info']/div[@class='gallery']//img";
		String kinkPreviewImageDialogXpath = "//div[@id='previewImageDialog']";
		String kinkLargeImageFileNameAttributeName = "data-image-file";
		String kinkLargeImageFilePathAttributeName = "data-src";
		
		logger.traceEntry();
		
		List<KUtilsImage> previewImages = new LinkedList<KUtilsImage>();
		List<WebElement> imageElements = driver.findElements(By.xpath(kinkPreviewImageListXpath));
		String sourceUrl;
		String largeImageFile;
		String largeImagePath;
		BufferedImage image = null;
		KUtilsImage tempImage;
		for (WebElement imageElement : imageElements) {
			largeImageFile = imageElement.getAttribute(kinkLargeImageFileNameAttributeName);
			largeImagePath = driver.findElement(By.xpath(kinkPreviewImageDialogXpath)).getAttribute(kinkLargeImageFilePathAttributeName);
			sourceUrl = largeImagePath + largeImageFile;
			try {
				image = ImageIO.read(new URL(sourceUrl));
			} catch (MalformedURLException e) {
				logger.error("Malformed URL: {}", sourceUrl);
			} catch (IOException e) {
				logger.error(e.getStackTrace());
			}
			if (image != null) {
				tempImage = new KUtilsImage();
				tempImage.setImage(image);
				previewImages.add(tempImage);
			}
		}
		
		logger.traceExit();
		return previewImages;
	}
	
	private static KUtilsImage getCoverImage(WebDriver driver) {
		String kinkPlayerXpath = "//div[@class='player']//div[@class='mejs-layers']/div[1]";
		String kinkPlayerPlaceHolderXpath = "//div[@class='me-cannotplay']//img";
		
		logger.traceEntry();
		
		KUtilsImage coverImage = new KUtilsImage();
		
		boolean playerFound = driver.findElements(By.xpath(kinkPlayerXpath)).size() == 1;
		String source = "";
		try {
			if (playerFound) {
				String style = driver.findElement(By.xpath(kinkPlayerXpath)).getAttribute("style");
				style = style.substring(style.indexOf("background-image")).trim();
				style = style.substring(style.indexOf("url(\""));
				if (style.contains(";")) {
					style = style.substring(0, style.indexOf(';')).trim();
				}
				source = style.substring(5, style.length() - 2);
			} else {
				logger.warn("No streaming player on page, attempting to get cover image from placeholder");
				boolean coverAlternateFound = driver.findElements(By.xpath(kinkPlayerPlaceHolderXpath)).size() == 1;
				if (coverAlternateFound) {
					source = driver.findElement(By.xpath(kinkPlayerPlaceHolderXpath)).getAttribute("src");
				}
			}
			
			if (StringUtils.isNotBlank(source)) {
				coverImage.setImage(ImageIO.read(new URL(source)));
			}
		} catch (MalformedURLException e) {
			logger.error("Malformed URL: {}", source);
		} catch (IOException e) {
			logger.error(e.getStackTrace());
		}
		
		logger.traceExit();
		return coverImage;
	}
	
	public static Date parseDate(WebDriver driver, String dateFormatString) {
		String kinkRawDateXpath = "//div[@class='shoot-info']//div[@class='column'][1]/p[1]";
		
		logger.traceEntry();
		
		SimpleDateFormat dateFormat = new SimpleDateFormat(dateFormatString, Locale.US);
		String rawDate = driver.findElement(By.xpath(kinkRawDateXpath)).getText().trim();
		logger.trace("rawDate = {}", rawDate);
		rawDate = rawDate.substring(6);
		Date date = new Date();
		try {
			date = dateFormat.parse(rawDate);
		} catch (ParseException e) {
			logger.error(e.getStackTrace());
		}
		
		logger.traceExit(date);
		return date;
	}
	
	public static List<String> parseTags(WebDriver driver) {
		String kinkTagXpath = "//div[@class='shoot-info']//div[@class='column'][2]/p";
		
		logger.traceEntry();
		
		List<String> tags = new LinkedList<>();
		String[] tagArray;
		String rawTags = driver.findElement(By.xpath(kinkTagXpath)).getText().trim();
		rawTags = rawTags.substring(6);
		tagArray = rawTags.split(",");
		for(String tag : tagArray) {
			tags.add(WordUtils.capitalize(tag.trim()));
		}
		
		logger.traceExit("tags = {}", tags);
		return tags;
	}
	
	public static Rating parseRating(WebDriver driver, String id) {
		String kinkRatingUrl = "http://www.kink.com/api/ratings/{0}"; 
		String kinkUnratedFlag = "unrated";
		
		logger.traceEntry("id = {}");
		
		Rating rating;
		
		driver.navigate().to(MessageFormat.format(kinkRatingUrl, id));
		
		String json = driver.findElement(By.tagName("body")).getText().trim();
		logger.info("json = {}", json);
		
		driver.navigate().back();
		if (json.contains(kinkUnratedFlag)) {
			rating = new Rating(0, 0);
		} else {
			Gson gson = new Gson();
			rating = gson.fromJson(json, Rating.class);
		}
		
		logger.traceExit("rating = {}", rating);
		return rating;
	}
	
	public static void ExportShoot(Shoot shoot, Connection connection, String siteDisplayName) throws IOException, SQLException {
		exportBasicData(shoot, connection, siteDisplayName);
		exportCoverImage(shoot, connection);
		exportPreviewImages(shoot, connection);
	}
	
	private static void exportBasicData(Shoot shoot, Connection connection, String siteDisplayName) throws SQLException {
		PreparedStatement pStatement;
  		StringBuilder queryBuilder = new StringBuilder();
 
  		queryBuilder.append("INSERT INTO ShootData (siteId, shootTypeId, title, description, date, tags, numRatings, rating, externalUrl) VALUES ");
 		queryBuilder.append("((SELECT siteId FROM Sites WHERE siteDisplayName = ?), ");
 		queryBuilder.append("(SELECT shootTypeId FROM ShootTypes WHERE shootTypeName = ?), ");
 		queryBuilder.append("?, ?, ?, ?, ?, ?, ?)");

 		pStatement = connection.prepareStatement(queryBuilder.toString());
 		pStatement.setString(1, siteDisplayName);
 		pStatement.setString(2, shoot.getShootType().toString());
 		pStatement.setString(3, shoot.getTitle());
 		pStatement.setString(4, shoot.getDescription());
 		pStatement.setString(5, shoot.getDate().getTime().toString());
 		pStatement.setString(6, StringUtils.join(shoot.getTags(), '|'));
 		pStatement.setInt(7, shoot.getNumRatings());
 		pStatement.setInt(8, shoot.getRating());
 		pStatement.setString(9, shoot.getExternalUrl());
 		
 		pStatement.execute();
	}
	
	private static void exportCoverImage(Shoot shoot, Connection connection) throws SQLException {
		if (shoot.getCoverImage().getImage() == null) {
			return;
		}
		
		new File(LaunchSelenium.basePath + "shoots/" + shoot.getId()).mkdirs();
		
		PreparedStatement pStatement;
		
  		StringBuilder queryBuilder = new StringBuilder();
  		queryBuilder.append("INSERT INTO ShootCoverImages (shootId, image) VALUES ");
 		queryBuilder.append("((SELECT shootId FROM ShootData WHERE title = ?), ?)");
 		
		shoot.getCoverImage().setFilePath(LaunchSelenium.basePath + "shoots/" + shoot.getId() + "/cover.png");
		shoot.getCoverImage().saveImage();
		
		pStatement = connection.prepareStatement(queryBuilder.toString());
		pStatement.setString(1, shoot.getTitle());
		pStatement.setString(2, "cover.png");
		pStatement.execute();
	}
	
	private static void exportPreviewImages(Shoot shoot, Connection connection) throws SQLException {
		new File(LaunchSelenium.basePath + "shoots/" + shoot.getId()).mkdirs();
		
		List<KUtilsImage> images = shoot.getPreviewImages();
		PreparedStatement pStatement;
  		StringBuilder queryBuilder = new StringBuilder();
  		
 		queryBuilder.append("INSERT INTO ShootPreviewImages (shootId, image) VALUES ");
 		queryBuilder.append("((SELECT shootId FROM ShootData WHERE title = ?), ?)");
 		
		for (int i = 0; i < images.size(); i++) {
			if (images.get(i).getImage() == null) {
				continue;
			}
			
			images.get(i).setFilePath(LaunchSelenium.basePath + "shoots/" + shoot.getId() + "/" + (i + 1) + " of " + images.size() + ".png");
			images.get(i).saveImage();
			
			pStatement = connection.prepareStatement(queryBuilder.toString());
 			pStatement.setString(1, shoot.getTitle());
 			pStatement.setString(2, ((i + 1) + " of " + images.size() + ".png"));
 			pStatement.execute();
		}
	}

	public static List<Shoot> getShoots() {
		return shoots;
	}
}
