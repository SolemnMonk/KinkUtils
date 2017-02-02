package monk.solemn.kutils.actor;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.text.WordUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import monk.solemn.kutils.WicketApplication;
import monk.solemn.kutils.enums.Gender;
import monk.solemn.kutils.objects.Actor;
import monk.solemn.kutils.objects.ActorAttribute;
import monk.solemn.kutils.objects.KUtilsImage;
import monk.solemn.kutils.utilities.ImageUtilities;

public class ActorUtils {
	private static final Logger logger = LogManager.getLogger(ActorUtils.class);
	private static final List<Actor> actors = new LinkedList<>();
	
	public static List<Actor> parseActors(WebDriver driver) throws SQLException {
		logger.traceEntry();
		
		WebElement actorElement;
		String fallbackNameName;
		String actorUrl;
		
		String actorGroupXpath = "//div[@class='shoot-info']//div[@class='column'][1]//p[@class='starring']//a";
		List<Actor> shootActors = new LinkedList<Actor>();
		int numActors = driver.findElements(By.xpath(actorGroupXpath)).size();
		
		for (int i = 1; i <= numActors; i++) {
			actorElement = driver.findElement(By.xpath(actorGroupXpath + "[" + i + "]"));
			fallbackNameName = actorElement.getText().trim();
			actorUrl = actorElement.getAttribute("href");
			
			driver.navigate().to(actorUrl);
			shootActors.add(getActorData(driver, fallbackNameName));
			driver.navigate().back();
		}
		
		logger.traceExit();
		return shootActors;
	}
	
	public static Actor getActorData(WebDriver driver, String fallbackName) throws SQLException {
		logger.traceEntry();
		
		String actorFoundXpath = "//div[@class='model-page']//h1";
		String errorPageXpath = "//div[@class='model-page']/div[@class='error-page']";
		
		Actor actor = new Actor(fallbackName);
		String currentUrl = driver.getCurrentUrl();
		actor.addExternalUrl(currentUrl);
		
		boolean actorFoundPage = driver.findElements(By.xpath(actorFoundXpath)).size() == 1;
		if (actorFoundPage) {
			for (Actor existingActor : actors) {
				if (existingActor.getExternalUrls().contains(currentUrl)) {
					logger.info("Actor for URL '{}' found, updating existing actor.", currentUrl);
					actor = existingActor;
					break;
				}
			}
			
			String name = driver.findElement(By.xpath("//div[@class='model-page']/h1")).getText().trim();
			actor.setName(name);
			logger.trace("name={}", name);
			
			
			List<WebElement> attributeCells = driver.findElements(By.xpath("//div[@class='model-page']/table//td"));
			if (actor != null) {
				parseAttributes(attributeCells, actor.getAttributes());
			}
			
			for (ActorAttribute attribute : actor.getAttributes()) {
				if (attribute.getKey().toLowerCase().equals("gender")) {
					actor.setGender(parseGender(attribute.getValue()));
					break;
				}
			}
			
			List<WebElement> imageElements = driver.findElements(By.xpath("//div[@class='model-page']/div[@id='modelImage']//img"));
			addImages(actor.getName(), imageElements, actor.getImages());
			
			if (!actor.getExternalUrls().contains(currentUrl)) {
				actor.addExternalUrl(currentUrl);
			}
			logger.trace("driver.getCurrentUrl() = {}", currentUrl);
			
			if (!actors.contains(actor)) {
				actors.add(actor);
			}
			
			logger.traceExit();
			((WicketApplication) WicketApplication.get()).getActorDao().saveActor(actor);
			return actor;
		}
		
		return actor;
	}
	
	private static void parseAttributes(List<WebElement> attributeCells, List<ActorAttribute> actorAttributes) {
		logger.traceEntry();
		
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
			
			logger.trace("key = {}, value = {}", key, value);
			
			boolean updated = false;
			for (ActorAttribute attribute : actorAttributes) {
				if (attribute.getKey().equals(key)) {
					attribute.setValue(value);
					updated = true;
					break;
				}
			}
			if (!updated) {
				actorAttributes.add(new ActorAttribute(key, value));
			}
			
		}
		
		logger.traceExit();
	}
	
	private static void addImages(String actorName, List<WebElement> imageElements, List<KUtilsImage> actorImages) {
		logger.traceEntry();
		
		URL sourceUrl;
		KUtilsImage image;
		BufferedImage imageBuffer;
		
		for (WebElement imageElement : imageElements) {
			try {
				sourceUrl = new URL(imageElement.getAttribute("src"));
				imageBuffer = ImageIO.read(sourceUrl);
				
				if (!imageExists(imageBuffer, actorImages)) {
					image = new KUtilsImage(Paths.get("Actors", actorName, "Images", (actorImages.size() + 1) + ".png").toString());
					
					image.setImage(imageBuffer);
					
					actorImages.add(image);
				}
			} catch (MalformedURLException e) {
				logger.error("Malformed URL: {}", imageElement.getAttribute("src"));
			} catch (IOException e) {
				logger.error(e.getStackTrace());
			}
		}
		
		logger.traceExit();
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
	
 	private static Gender parseGender(String genderString) {
		logger.traceEntry("genderString = '{}'", genderString);
		
		Gender gender;
		genderString = genderString.toLowerCase();
		
		if (genderString.equals("female") || genderString.equals("woman") || genderString.equals("girl")) {
			gender = Gender.Female;
		} else if (genderString.equals("male") || genderString.equals("man") || genderString.equals("boy")) {
			gender = Gender.Male;
		} else if (genderString.equals("transsexual") || genderString.equals("trans-sexual") || genderString.equals("trans sexual") || genderString.equals("trans")) {
			gender = Gender.Transsexual;
		} else {
			gender = Gender.Unknown;
		}
		
		logger.traceExit("gender = {}", gender);
		return gender;
	}

	public static List<Actor> getActors() {
		return actors;
	}
}
