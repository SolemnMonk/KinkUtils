package monk.solemn.kutils.kink_plugin;

import java.sql.SQLException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.objects.Shoot;
import monk.solemn.kutils.utilities.high.ShootUtilities;

public class Downloader {
	public static Shoot downloadShoot(WebDriver driver, String url, QueuedTask task) {
		driver.get(url);
		
		String title = driver.findElement(By.xpath(KinkPlugin.getXpath("ShootTitle"))).getText();
		Shoot shoot;
		try {
			shoot = ShootUtilities.getShootByTitle(title);
		} catch (SQLException e1) {
			e1.printStackTrace();
			return null;
		}
		
		DataGatherer.getShootInfo(driver, shoot, task);
		DataGatherer.getTags(driver, shoot);
		DataGatherer.getRating(driver, shoot);
		DataGatherer.getActors(driver, shoot);
		DataGatherer.getCoverImage(driver, shoot);
		DataGatherer.getPreviewImages(driver, shoot);
		
		try {
			KinkPlugin.getShootDao().saveShoot(shoot);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		downloadVideo(driver, shoot);
		downloadImageSet(driver, shoot);
		
		return shoot;
	}
	
	public static void downloadVideo(WebDriver driver, Shoot shoot) {
//		String ariaLocation = "C:/Users/MrNakaan/Git Repos/KinkUtils/helpers/aria2-1.29.0-win-64bit-build1/aria2c.exe";
//		String cookieLocation = "C:/Users/MrNakaan/AppData/Local/Google/Chrome/User Data/Default/Cookies";
//		String downloadCompleteFlag = "Download complete";
//		
//		StringBuilder builder = new StringBuilder();
//		builder.append("\"{0}\" ");
//		builder.append("--file-allocation=none ");
//		builder.append("\"--load-cookies={1}\" ");
//		builder.append("-d ");
//		builder.append("\"{2}\" ");
//		builder.append(url);
//		
//		String command = MessageFormat.format(builder.toString(), ariaLocation, cookieLocation, downloadPath);
//		
//		Process process = Runtime.getRuntime().exec(command);
//
//		BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//		String line = reader.readLine();
//		
//		while (!line.contains(downloadCompleteFlag)) {
//			System.out.println(line);
//			line = reader.readLine();
//		}
//		
//		System.out.println(line);
	}

	public static void downloadImageSet(WebDriver driver, Shoot shoot) {
	}
}
