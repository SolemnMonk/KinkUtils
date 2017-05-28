package monk.solemn.kutils.plugin.kink;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import monk.solemn.kutils.enums.ShootType;
import monk.solemn.kutils.objects.Actor;
import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.objects.Shoot;
import monk.solemn.kutils.utilities.high.ShootUtilities;
import monk.solemn.kutils.utilities.low.StringUtilitiesLow;

public class Downloader {
	public static Shoot performDownload(WebDriver driver, QueuedTask task) {
		return downloadShoot(driver, task.getData().get("download-shoot-url"), task);
	}
	
	public static Shoot downloadShoot(WebDriver driver, String url, QueuedTask task) {
		driver.get(url);

		String title = driver.findElement(By.xpath(KinkPlugin.getXpath("ShootTitle"))).getText();
		Shoot shoot;
		try {
			shoot = ShootUtilities.getShootByTitle(title);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}

		DataGatherer.getShootInfo(driver, shoot, task);
		DataGatherer.getShootTags(driver, shoot);
		DataGatherer.getShootRating(driver, shoot);
		DataGatherer.getActors(driver, shoot);
		DataGatherer.getShootCoverImage(driver, shoot);
		DataGatherer.getShootPreviewImages(driver, shoot);

		try {
			KinkPlugin.getShootDao().saveShoot(shoot);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		String sanitizedTitle = StringUtilitiesLow.sanitizeForPathName(shoot.getTitle());
		
		downloadTrailer(driver, shoot, sanitizedTitle);

		if (shoot.getShootType() == ShootType.Video || shoot.getShootType() == ShootType.VideoAndImages) {
			downloadVideo(driver, shoot, sanitizedTitle, task);
		}

		if (shoot.getShootType() == ShootType.Images || shoot.getShootType() == ShootType.VideoAndImages) {
			downloadImageSet(driver, shoot, sanitizedTitle);
		}

		shoot.unloadImages();

		return shoot;
	}

	public static void downloadTrailer(WebDriver driver, Shoot shoot, String sanitizedName) {
		List<WebElement> trailerButtons = driver.findElements(By.xpath(KinkPlugin.getXpath("TrailerDownloadButton")));
		if (trailerButtons.size() > 0) {
			String source = driver.findElement(By.xpath(KinkPlugin.getXpath("TrailerSource"))).getAttribute("data-url");
			
			String date = KinkUtilities.formatDate(shoot.getDate().getTime());
			String path = Paths.get("Shoots", date + " - " + sanitizedName).toString();

			File trailer = null;

			try {
				trailer = KinkPlugin.getFileStorageDao().downloadFile(source, path, true);
				trailer.renameTo(Paths
						.get(trailer.getParent(), date + " - " + sanitizedName + "-trailer." + FilenameUtils.getExtension(trailer.getName())).toFile());
			} catch (SQLException | IOException | InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	public static void downloadVideo(WebDriver driver, Shoot shoot, String sanitizedName, QueuedTask task) {
		List<WebElement> fullMovieDownloadLinks = driver
				.findElements(By.xpath(KinkPlugin.getXpath("MovieFullDownloadLinks")));

		String date = KinkUtilities.formatDate(shoot.getDate().getTime());

		Map<String, String> metadataMap = new HashMap<>();
		
		StringBuilder actors = new StringBuilder();
		for (Actor actor : shoot.getActors()) {
			actors.append(actor.getName());
			actors.append('/');
		}
		
		metadataMap.put("album", task.getData().get("site-friendly-name"));
		metadataMap.put("album_artist", "Kink.com");
		metadataMap.put("artist", actors.toString().substring(0, actors.toString().length() - 1));
		metadataMap.put("composer", "Kink.com");
		metadataMap.put("POPM", ((Integer) ((Double) (shoot.getRating().getAvgRating() * 51)).intValue()).toString());
		metadataMap.put("TDAT", new SimpleDateFormat("ddMM").format(shoot.getDate().getTime()));
		metadataMap.put("TIT2", shoot.getDescription());		
		metadataMap.put("title", shoot.getTitle());
		metadataMap.put("date", new SimpleDateFormat("yyyy").format(shoot.getDate().getTime()));
		
		if (fullMovieDownloadLinks.size() > 0) {
			driver.findElement(By.xpath(KinkPlugin.getXpath("MovieFullDownloadButton"))).click();

			String qualityLabel = task.getData().get("video-quality-label");
			String linkText;

			WebElement downloadLink = null;
			for (WebElement link : fullMovieDownloadLinks) {
				linkText = link.getText().trim().toLowerCase();
				if (qualityLabel.equals(linkText)) {
					downloadLink = link;
					break;
				}
			}

			String path = Paths.get("Shoots", date + " - " + sanitizedName).toString();

			File movie = null;
			String url = "";
			
			try {
				if (downloadLink.getAttribute("download") != null) {
					url = downloadLink.getAttribute("download");
				} else if (downloadLink.getAttribute("href") != null) {
					url = downloadLink.getAttribute("href");
				}
				movie = KinkPlugin.getFileStorageDao().downloadFile(url, path, true);
				movie.renameTo(
						Paths.get(movie.getParent(), sanitizedName + "." + FilenameUtils.getExtension(movie.getName()))
								.toFile());
				movie = Paths.get(movie.getParent(), sanitizedName + "." + FilenameUtils.getExtension(movie.getName())).toFile();
				movie = KinkPlugin.getFileStorageDao().applyMetadata(movie, metadataMap, null);
			} catch (SQLException | IOException | InterruptedException e) {
				e.printStackTrace();
			}
		} else {
			String path = Paths.get("Shoots", date + " - " + sanitizedName).toString();

			driver.findElement(By.xpath(KinkPlugin.getXpath("MoviePartsDownloadButton"))).click();

			List<WebElement> clipSections = driver.findElements(By.xpath(KinkPlugin.getXpath("MoviePartsSections")));
			String sectionName;
			List<String> urls;

			for (WebElement clipSection : clipSections) {
				sectionName = clipSection.getText().trim().toUpperCase();
				urls = new ArrayList<>();

				List<WebElement> clips = clipSection.findElements(By.xpath("." + KinkPlugin.getXpath("a")));
				for (WebElement clip : clips) {
					try {
						if (clip.getAttribute("download") != null) {
							urls.add(clip.getAttribute("download"));
						} else if (clip.getAttribute("href") != null) {
							urls.add(clip.getAttribute("href"));
						}
					} catch (NullPointerException e) {
						e.printStackTrace();
					}
				}

				try {
					KinkPlugin.getFileStorageDao().downloadClips(urls, path, sectionName, sanitizedName, true, true,
							metadataMap);
				} catch (IOException | SQLException | InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static void downloadImageSet(WebDriver driver, Shoot shoot, String sanitizedName) {
		List<WebElement> imageSetLinks = driver.findElements(By.xpath(KinkPlugin.getXpath("ImagesDownloadLinks")));

		String date = KinkUtilities.formatDate(shoot.getDate().getTime());
		String path = Paths.get("Shoots", date + " - " + sanitizedName).toString();

		List<String> urls = new ArrayList<>();

		for (WebElement link : imageSetLinks) {
			try {
				if (link.getAttribute("download") != null) {
					urls.add(link.getAttribute("download"));
				} else if (link.getAttribute("href") != null) {
					urls.add(link.getAttribute("href"));
				}
			} catch (NullPointerException e) {
				e.printStackTrace();
			}
		}

		try {
			KinkPlugin.getFileStorageDao().downloadArchives(urls, path, sanitizedName, true);
		} catch (IOException | SQLException | InterruptedException e) {
			e.printStackTrace();
		}
	}
}
