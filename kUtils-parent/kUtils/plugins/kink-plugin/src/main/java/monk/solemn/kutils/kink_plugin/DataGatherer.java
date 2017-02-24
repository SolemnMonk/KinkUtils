package monk.solemn.kutils.kink_plugin;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.text.MessageFormat;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.google.gson.Gson;

import monk.solemn.kutils.objects.KUtilsImage;
import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.objects.Rating;
import monk.solemn.kutils.objects.Shoot;
import monk.solemn.kutils.utilities.high.ImageUtilitiesHigh;
import monk.solemn.kutils.utilities.low.ImageUtilitiesLow;

public class DataGatherer {
	public static void getShootInfo(WebDriver driver, Shoot shoot, QueuedTask task) {
		shoot.setExternalUrl(driver.getCurrentUrl());
		shoot.setDescription(driver.findElement(By.xpath(KinkPlugin.getXpath("ShootDescription"))).getText());
		shoot.setSite(task.getData().get("site-friendly-name"));
		
		String rawDate = driver.findElement(By.xpath(KinkPlugin.getXpath("Raw"))).getText();
		rawDate = rawDate.substring(rawDate.lastIndexOf(':') + 1).trim();
		Calendar date = Calendar.getInstance();
		date.setTime(KinkUtilities.parseDate("MMMM d, yyyy", rawDate));
		shoot.setDate(date);
	}
	
	public static void getTags(WebDriver driver, Shoot shoot) {
		String rawTags = driver.findElement(By.xpath(KinkPlugin.getXpath(""))).getText();
		shoot.setTags(KinkUtilities.parseTags(rawTags));
	}

	public static void getRating(WebDriver driver, Shoot shoot) {
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
	
	//TODO
	public static void getActors(WebDriver driver, Shoot shoot) {
	}
	
	public static void getCoverImage(WebDriver driver, Shoot shoot) {
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
					coverImage = new KUtilsImage(Paths.get("Shoots", shoot.getTitle(), "Images", "cover.png").toString());
				}
				
				String bufferHash = ImageUtilitiesLow.HashImage((RenderedImage) coverImage.getImage());
				
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
	
	public static void getPreviewImages(WebDriver driver, Shoot shoot) {
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
						image = new KUtilsImage(Paths.get("Shoots", shoot.getTitle(), "Images", (previewImages.size() + 1)+ ".png").toString());
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
}
