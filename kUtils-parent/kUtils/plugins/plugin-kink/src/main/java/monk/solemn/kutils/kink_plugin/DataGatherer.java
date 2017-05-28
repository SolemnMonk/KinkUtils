package monk.solemn.kutils.kink_plugin;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.google.gson.Gson;

import monk.solemn.kutils.enums.ShootType;
import monk.solemn.kutils.objects.Actor;
import monk.solemn.kutils.objects.ActorAttribute;
import monk.solemn.kutils.objects.KUtilsImage;
import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.objects.Rating;
import monk.solemn.kutils.objects.Shoot;
import monk.solemn.kutils.utilities.high.ActorUtilities;
import monk.solemn.kutils.utilities.high.ImageUtilitiesHigh;
import monk.solemn.kutils.utilities.high.StringUtilitiesHigh;
import monk.solemn.kutils.utilities.low.ImageUtilitiesLow;
import monk.solemn.kutils.utilities.low.StringUtilitiesLow;

public class DataGatherer {
	public static void getShootInfo(WebDriver driver, Shoot shoot, QueuedTask task) {
		shoot.setTitle(StringUtilitiesLow.normalizeString(shoot.getTitle()));
		
		shoot.setExternalUrl(driver.getCurrentUrl());
		shoot.setDescription(driver.findElement(By.xpath(KinkPlugin.getXpath("ShootDescription"))).getText());
		shoot.setSite(task.getData().get("site-friendly-name"));
		
		getShootType(driver, shoot);
		
		String rawDate = driver.findElement(By.xpath(KinkPlugin.getXpath("RawDate"))).getText();
		rawDate = rawDate.substring(rawDate.lastIndexOf(':') + 1).trim();
		Calendar date = Calendar.getInstance();
		date.setTime(KinkUtilities.parseDate("MMMM d, yyyy", rawDate));
		shoot.setDate(date);
	}
	
	private static void getShootType(WebDriver driver, Shoot shoot) {
		boolean imagesPresent = driver.findElements(By.xpath(KinkPlugin.getXpath("ImagesDownloadLinks"))).size() > 0;
		boolean videosPresent = driver.findElements(By.xpath(KinkPlugin.getXpath("MoviePartsDownloadButton"))).size() > 0;
		videosPresent = videosPresent || driver.findElements(By.xpath(KinkPlugin.getXpath("MovieFullDownloadButton"))).size() > 0;
		
		if (imagesPresent && videosPresent) {
			shoot.setShootType(ShootType.VideoAndImages);
		} else if (imagesPresent) {
			shoot.setShootType(ShootType.Images);
		} else if (videosPresent) {
			shoot.setShootType(ShootType.Video);
		} else {
			shoot.setShootType(ShootType.Unknown);
		}
	}

	public static void getShootTags(WebDriver driver, Shoot shoot) {
		String rawTags = driver.findElement(By.xpath(KinkPlugin.getXpath("RawTags"))).getText();
		shoot.setTags(KinkUtilities.parseTags(rawTags));
	}

	public static void getShootRating(WebDriver driver, Shoot shoot) {
		String url = driver.getCurrentUrl();
		String shootId = url.substring(url.lastIndexOf('/') + 1);
		String baseUrl = KinkPlugin.getUrl("Rating");
		url = (new MessageFormat(baseUrl)).format(new String[] {shootId});
		driver.get(url);
		
		String json = driver.findElement(By.xpath(KinkPlugin.getXpath("RatingJson"))).getText();
		Rating rating;
		if (json.contains("unrated")) {
			rating = new Rating(0.0, 0);
		} else {
			rating = (new Gson()).fromJson(json, Rating.class);
		}
		shoot.setRating(rating);
		
		driver.navigate().back();
	}

	public static void getShootCoverImage(WebDriver driver, Shoot shoot) {
		KUtilsImage coverImage = shoot.getCoverImage();
		
		boolean playerFound = driver.findElements(By.xpath(KinkPlugin.getXpath("VideoPlayer"))).size() == 1;
		String source = "";
		try {
			if (playerFound) {
				String style = driver.findElement(By.xpath(KinkPlugin.getXpath("VideoPlayer"))).getAttribute("style");
				style = style.substring(style.indexOf("background-image")).trim();
				style = style.substring(style.indexOf("url(\""));
				if (style.contains(";")) {
					style = style.substring(0, style.indexOf(';')).trim();
				}
				source = style.substring(5, style.length() - 2);
			} else {
				boolean coverAlternateFound = driver.findElements(By.xpath(KinkPlugin.getXpath("VideoPlayerPlaceholder"))).size() == 1;
				if (coverAlternateFound) {
					source = driver.findElement(By.xpath(KinkPlugin.getXpath("VideoPlayerPlaceholder"))).getAttribute("src");
				}
			}
			
			if (StringUtils.isNotBlank(source)) {
				URL sourceUrl = new URL(source);
				BufferedImage imageBuffer = ImageIO.read(sourceUrl);
				
				if (coverImage == null) {
					String date = KinkUtilities.formatDate(shoot.getDate().getTime());
					String name = StringUtilitiesLow.sanitizeForPathName(shoot.getTitle());
					coverImage = new KUtilsImage(Paths.get("Shoots", date + " - " + name, "poster.png").toString());
				}
				
				String bufferHash = null;
				if (coverImage.getImage() != null) {
					bufferHash = ImageUtilitiesLow.HashImage((RenderedImage) coverImage.getImage());
				} else {
					bufferHash = "";
				}
				
				if (StringUtils.isEmpty(coverImage.getHash()) || !coverImage.getHash().equals(bufferHash)) {
					coverImage.setImage(imageBuffer);
				}
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		shoot.setCoverImage(coverImage);
	}
	
	public static void getShootPreviewImages(WebDriver driver, Shoot shoot) {
		String kinkLargeImageFileNameAttributeName = "data-image-file";
		String kinkLargeImageFilePathAttributeName = "data-src";
		
		List<KUtilsImage> previewImages = new LinkedList<KUtilsImage>();
		previewImages.addAll(shoot.getPreviewImages());
		List<WebElement> imageElements = driver.findElements(By.xpath(KinkPlugin.getXpath("PreviewImageList")));
		String source;
		URL sourceUrl;
		String largeImageFile;
		String largeImagePath;
		BufferedImage imageBuffer = null;
		KUtilsImage image;
		for (WebElement imageElement : imageElements) {
			largeImageFile = imageElement.getAttribute(kinkLargeImageFileNameAttributeName);
			largeImagePath = driver.findElement(By.xpath(KinkPlugin.getXpath("PreviewImageDialog"))).getAttribute(kinkLargeImageFilePathAttributeName);
			source = largeImagePath + largeImageFile;
			try {
				if (StringUtils.isNotBlank(source)) {
					sourceUrl = new URL(source);
					imageBuffer = ImageIO.read(sourceUrl);
					
					if (!ImageUtilitiesHigh.imageExists(imageBuffer, shoot.getPreviewImages())) {
						String date = KinkUtilities.formatDate(shoot.getDate().getTime());
						String name = StringUtilitiesLow.sanitizeForPathName(shoot.getTitle());
						image = new KUtilsImage(Paths.get("Shoots", date + " - " + name, "preview-" + (previewImages.size() + 1)+ ".png").toString());
						image.setImage(imageBuffer);
						previewImages.add(image);
					}
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		shoot.setPreviewImages(previewImages);
	}

	public static void getActors(WebDriver driver, Shoot shoot) {
		WebElement actorElement;
		String fallbackNameName;
		String actorUrl;
		
		String actorGroupXpath = KinkPlugin.getXpath("ActorGroup");
		if (shoot.getActors() == null) {
			shoot.setActors(new ArrayList<>());
		}
		int numActors = driver.findElements(By.xpath(actorGroupXpath)).size();
		
		for (int i = 1; i <= numActors; i++) {
			actorElement = driver.findElement(By.xpath(actorGroupXpath + "[" + i + "]"));
			fallbackNameName = actorElement.getText().trim();
			actorUrl = actorElement.getAttribute("href");
			
			driver.navigate().to(actorUrl);
			try {
				shoot.getActors().add(getActorData(driver, shoot, fallbackNameName));
			} catch (SQLException e) {
				e.printStackTrace();
			}
			driver.navigate().back();
		}
	}
	
	public static Actor getActorData(WebDriver driver, Shoot shoot, String fallbackName) throws SQLException {
		Actor actor = ActorUtilities.getActorByName(fallbackName);
		String currentUrl = driver.getCurrentUrl();
		
		boolean actorFoundPage = driver.findElements(By.xpath(KinkPlugin.getXpath("ActorFound"))).size() == 1;
		if (actorFoundPage) {
			String name = driver.findElement(By.xpath("//div[@class='model-page']/h1")).getText().trim();
			actor = ActorUtilities.getActorByName(name);
			
			if (!actor.getExternalUrls().contains(currentUrl)) {
				actor.getExternalUrls().add(currentUrl);
			}
			
			getActorAttributes(driver, actor);
			
			for (ActorAttribute attribute : actor.getAttributes()) {
				if (attribute.getKey().toLowerCase().equals("gender")) {
					actor.setGender(StringUtilitiesHigh.parseGender(attribute.getValue()));
					break;
				}
			}
			
			getActorImages(driver, actor);
			
			if (!actor.getExternalUrls().contains(currentUrl)) {
				actor.addExternalUrl(currentUrl);
			}
			
			KinkPlugin.getActorDao().saveActor(actor);
			
			actor.unloadImages();
			
			return actor;
		}
		
		return actor;
	}
	
	public static void getActorAttributes(WebDriver driver, Actor actor) {
		List<WebElement> attributeCells = driver.findElements(By.xpath(KinkPlugin.getXpath("ActorAttributeCells")));
		
		String key;
		String value;
		for(int i = 0; i < attributeCells.size(); i += 2) {
			key = attributeCells.get(i).getText().trim();
			value = attributeCells.get(i + 1).getText().trim();
			
			key = WordUtils.capitalize(key);
			value = WordUtils.capitalize(value);

			if (key.endsWith(":")) {
				key = key.substring(0, key.length() - 1);
			}
			
			boolean updated = false;
			for (ActorAttribute attribute : actor.getAttributes()) {
				if (attribute.getKey().equals(key)) {
					attribute.setValue(value);
					updated = true;
					break;
				}
			}
			if (!updated) {
				actor.getAttributes().add(new ActorAttribute(key, value));
			}
			
		}
	}
	
	public static void getActorImages(WebDriver driver, Actor actor) {
		List<WebElement> imageElements = driver.findElements(By.xpath(KinkPlugin.getXpath("ActorImages")));
		
		URL sourceUrl;
		KUtilsImage image;
		BufferedImage imageBuffer;
		
		for (WebElement imageElement : imageElements) {
			try {
				sourceUrl = new URL(imageElement.getAttribute("src"));
				imageBuffer = ImageIO.read(sourceUrl);
				
				if (!ImageUtilitiesHigh.imageExists(imageBuffer, actor.getImages())) {
					image = new KUtilsImage(Paths.get("Actors", actor.getName(), "Images", (actor.getImages().size() + 1) + ".png").toString());
					
					image.setImage(imageBuffer);
					
					actor.getImages().add(image);
				}
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
