package monk.solemn.kutils.shoot;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import monk.solemn.kutils.WicketApplication;
import monk.solemn.kutils.actor.ActorUtils;
import monk.solemn.kutils.enums.ShootType;
import monk.solemn.kutils.objects.Actor;
import monk.solemn.kutils.objects.KUtilsImage;
import monk.solemn.kutils.objects.Rating;
import monk.solemn.kutils.objects.Shoot;
import monk.solemn.kutils.utilities.ImageUtilities;

public class ShootUtils {
	private static final Logger logger = LogManager.getLogger(ShootUtils.class);
	private static final List<Shoot> shoots = new LinkedList<>();
	
	public static Shoot getShootData(WebDriver driver) throws SQLException {
		String kinkRawDateXpath = "//div[@class='shoot-info']//div[@class='column'][1]/p[1]";
		String kinkRawTagXpath = "//div[@class='shoot-info']//div[@class='column'][2]/p";
		
		logger.traceEntry();
		
		String externalUrl = driver.getCurrentUrl().trim();
		String site = "Kink Test Shoots";
		ShootType shootType = determineShootType(driver);
		String title = driver.findElement(By.xpath("//div[@class='shoot-info']/h1")).getText().trim();
		String description = driver.findElement(By.xpath("//div[@class='shoot-info']/div[@class='description']")).getText().trim();
		Calendar date = Calendar.getInstance();
		date.setTime(ShootParser.parseDateFromPage(driver, "MMMM d, yyyy", kinkRawDateXpath, ": (?<date>.*\\d{4})"));
		List<String> tags = null;//ShootParser.parseTags(driver, kinkRawTagXpath, ": (?<allTags>(?<tagWithDelimiter>(?<tag>\\p{ASCII}),)*)");
		Rating rating = ShootParser.parseRatingsFromJson(driver, "http://www.kink.com/api/ratings/{0}", "unrated");
		List<Actor> shootActors = ActorUtils.parseActors(driver);
		
		Shoot shoot = new Shoot(title);

		for(Shoot existingShoot : shoots) {
			if (existingShoot.getExternalUrl().equals(driver.getCurrentUrl())) {
				shoot = existingShoot;
				break;
			}
		}

		List<KUtilsImage> previewImages = getPreviewImages(driver, shoot);
		KUtilsImage coverImage = getCoverImage(driver, shoot);
		
		shoot.setSite(site);
		shoot.setTitle(title);
		shoot.setDescription(description);
		shoot.setDate(date);
		shoot.setTags(tags);
		shoot.setRating(rating);
		shoot.setActors(shootActors);
		shoot.setCoverImage(coverImage);
		shoot.setPreviewImages(previewImages);
		shoot.setExternalUrl(externalUrl);
		
		for (Actor actor : shootActors) {
			actor.addShoot(shoot);
		}
		
		if (!shoots.contains(shoot)) {
			shoots.add(shoot);
		}
		
		logger.traceExit();
		((WicketApplication) WicketApplication.get()).getShootDao().saveShoot(shoot);
		return shoot;
	}
	
	private static ShootType determineShootType(WebDriver driver) {
		String kinkImageShootXpath = "//div[@class='shoot-info']//div[@class='zips']";
		String kinkVideoShootXpath = "//div[@class='member-content']/div[@class='full' or @class='clips']";
		
		ShootType shootType = ShootType.Unknown;
		
		boolean imagesFound = false;
		boolean videosFound = false;
		
		imagesFound = driver.findElements(By.xpath(kinkImageShootXpath)).size() > 0;
		videosFound = driver.findElements(By.xpath(kinkVideoShootXpath)).size() > 0;
		
		if (imagesFound && videosFound) {
			shootType = ShootType.VideoAndImages;
		} else if (imagesFound) {
			shootType = ShootType.Images;
		} else if (videosFound) {
			shootType = ShootType.Video;
		}
		
		return shootType;
	}
	
	private static List<KUtilsImage> getPreviewImages(WebDriver driver, Shoot shoot) {
		String kinkPreviewImageListXpath = "//div[@class='shoot-info']/div[@class='gallery']//img";
		String kinkPreviewImageDialogXpath = "//div[@id='previewImageDialog']";
		String kinkLargeImageFileNameAttributeName = "data-image-file";
		String kinkLargeImageFilePathAttributeName = "data-src";
		
		logger.traceEntry();
		
		List<KUtilsImage> previewImages = new LinkedList<KUtilsImage>();
		previewImages.addAll(shoot.getPreviewImages());
		List<WebElement> imageElements = driver.findElements(By.xpath(kinkPreviewImageListXpath));
		String source;
		URL sourceUrl;
		String largeImageFile;
		String largeImagePath;
		BufferedImage imageBuffer = null;
		KUtilsImage image;
		for (WebElement imageElement : imageElements) {
			largeImageFile = imageElement.getAttribute(kinkLargeImageFileNameAttributeName);
			largeImagePath = driver.findElement(By.xpath(kinkPreviewImageDialogXpath)).getAttribute(kinkLargeImageFilePathAttributeName);
			source = largeImagePath + largeImageFile;
			try {
				if (StringUtils.isNotBlank(source)) {
					sourceUrl = new URL(source);
					imageBuffer = ImageIO.read(sourceUrl);
					
					if (!imageExists(imageBuffer, shoot.getPreviewImages())) {
						image = new KUtilsImage(Paths.get("Shoots", shoot.getTitle(), "Images", (previewImages.size() + 1)+ ".png").toString());
						image.setImage(imageBuffer);
						previewImages.add(image);
					}
				}
			} catch (MalformedURLException e) {
				logger.error("Malformed URL: {}", source);
			} catch (IOException e) {
				logger.error(e.getStackTrace());
			}
		}
		
		logger.traceExit();
		return previewImages;
	}
	
	private static KUtilsImage getCoverImage(WebDriver driver, Shoot shoot) {
		String kinkPlayerXpath = "//div[@class='player']//div[@class='mejs-layers']/div[1]";
		String kinkPlayerPlaceHolderXpath = "//div[@class='me-cannotplay']//img";
		
		logger.traceEntry();
		
		KUtilsImage coverImage = shoot.getCoverImage();
		
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
				URL sourceUrl = new URL(source);
				BufferedImage imageBuffer = ImageIO.read(sourceUrl);
				
				if (coverImage == null) {
					coverImage = new KUtilsImage(Paths.get("Shoots", shoot.getTitle(), "Images", "cover.png").toString());
				}
				
				String bufferHash = ImageUtilities.HashImage((RenderedImage) coverImage.getImage());
				
				if (StringUtils.isEmpty(coverImage.getHash()) || !coverImage.getHash().equals(bufferHash)) {
					coverImage.setImage(imageBuffer);
				}
			}
		} catch (MalformedURLException e) {
			logger.error("Malformed URL: {}", source);
		} catch (IOException e) {
			logger.error(e.getStackTrace());
		}
		
		logger.traceExit();
		return coverImage;
	}
	
	private static boolean imageExists(RenderedImage image, List<KUtilsImage> actorImages) {
		boolean imageExists = false;
		String hash = ImageUtilities.HashImage(image);
		
		if (hash == null) {
			imageExists = true;
		} else {
			for (KUtilsImage actorImage : actorImages) {
				if (actorImage.getHash().equals(hash)) {
					imageExists = true;
					break;
				}
			}
		}
		
		return imageExists;
	}
		
	public static List<Shoot> getShoots() {
		return shoots;
	}
}
