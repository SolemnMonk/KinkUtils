package monk.solemn.k.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.link.Link;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import monk.solemn.k.utils.actor.Actor;
import monk.solemn.k.utils.actor.ActorUtils;
import monk.solemn.k.utils.shoot.Shoot;
import monk.solemn.k.utils.shoot.ShootUtils;

public class LaunchSelenium extends WebPage {
	public static final String basePath = "C:/Users/MrNakaan/Desktop/kUtils/";
	
	private static final long serialVersionUID = -8453950956898010035L;
	private static final Logger logger = LogManager.getLogger(LaunchSelenium.class);
	
	private WebDriver driver;
	private Connection connection;
	
	public LaunchSelenium() throws SQLException {
		System.setProperty("webdriver.gecko.driver", "C:/Users/MrNakaan/Git Repos/KinkUtils/web_drivers/geckodriver.exe");
		System.setProperty("webdriver.chrome.driver", "C:/Users/MrNakaan/Git Repos/KinkUtils/web_drivers/chromedriver.exe");
		
		ActorUtils.getActors().addAll(WicketApplication.getActorDao().loadAllActors());
	}
	
	@Override
	protected void onInitialize() {
		super.onInitialize();
		Link launchKtsSeleniumLink = new Link("launchKtsSeleniumLink") {
			@Override
			public void onClick() {
				try {
					launchKtsSeleniumClick();
				} catch (InterruptedException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} catch (ParseException e) {
					e.printStackTrace();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		};
		Link launchRmlSeleniumLink = new Link("launchRmlSeleniumLink") {
			@Override
			public void onClick() {
				try {
					launchRmlSeleniumClick();
				} catch (InterruptedException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
		};
		
		add(launchKtsSeleniumLink);
		add(launchRmlSeleniumLink);
	}

	public void launchRmlSeleniumClick() throws InterruptedException, IOException, ParseException {
		
	}
	
	public void launchKtsSeleniumClick() throws InterruptedException, IOException, ParseException, SQLException {
		configureDriver();
		login("Kink.com", true);
		
		WicketApplication.getActorDao().loadAllActors();
		
		int page = 0;
		int shootsOnLastPage;
		while (true) {
			loadLatestShoots("kinktestshoots", page);
			shootsOnLastPage = downloadPage();
			break;
//			if (shootsOnLastPage != 20) {
//				break;
//			}
//			page++;
		}
		
		logout();
		exit();
		
		exportShoots();
	}
	
	public void configureDriver() {
		driver = new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(4, TimeUnit.SECONDS);
		driver.manage().window().maximize();
	}

	public void login(String locationName, boolean useNetworkCredentials) throws SQLException {
		String kinkLoginUrl = "http://www.kink.com/login/";
		String kinkContentPreferenceDismissXpath = "//form[@id='viewingPreferences']/button[1]";
		String kinkLoginUsernameXpath = "//input[@type='text' and @id='usernameLogin']";
		String kinkLoginPasswordXpath = "//input[@type='password' and @id='passwordLogin']";
		String kinkLoginFormXpath = "//form[@id='login']";
		String kinkSuccessfulLoginTitle = "BDSM, Gangbangs & Extreme Porn - Welcome to Kink";

		Credentials credentials = null;
		if (useNetworkCredentials) {
			credentials = WicketApplication.getCredentialDao().loadNetworkCredentials(locationName, null);
		} else {
			credentials = WicketApplication.getCredentialDao().loadSiteCredentials(locationName, null);
		}
		
		if (credentials != null) {
			driver.get(kinkLoginUrl);
			
			driver.findElement(By.xpath(kinkContentPreferenceDismissXpath)).click();
			
			driver.findElement(By.xpath(kinkLoginUsernameXpath)).sendKeys(credentials.getUsername());
			driver.findElement(By.xpath(kinkLoginPasswordXpath)).sendKeys(credentials.getPassword());
			
			driver.findElement(By.xpath(kinkLoginFormXpath)).submit();
			
			new WebDriverWait(driver, 10).until(ExpectedConditions.titleIs(kinkSuccessfulLoginTitle));
		} else {
			//TODO handle a lack of credentials
		}
	}
	
	public void loadLatestShoots(String urlSafeSiteName, int page) {
		String kinkLatestShootsUrl = "http://www.kink.com/channel/{0}/latest/page/{1}";
		
		String url = MessageFormat.format(kinkLatestShootsUrl, urlSafeSiteName, page);
		driver.get(url);
	}
	
	public int downloadPage() throws IOException, InterruptedException, ParseException, SQLException {
		String kinkShootListAllShootsXpath = "//div[@class='shoot']//div[@class='shoot-thumb-title']//a";
		String kinkShootListShootXpath = "//div[@class=''shoot''][{0}]//div[@class=''shoot-thumb-title'']//a";
		String kinkDownloadSingleVideoXpath = "//div[@class='member-content']//h4[text()='Download']/../ul//a[text()=' LARGE ']"; 
		String kinkDownloadSegmentedVideoFormatsXpath = "//div[@class='member-content']//h4[text()='Scenes']/../ul/li";
		
		Shoot shoot;
		String downloadPath;
		
		int results = driver.findElements(By.xpath(kinkShootListAllShootsXpath)).size();
		for (int i = 1; i <= 2; i++) {
			WebElement link = driver.findElement(By.xpath(MessageFormat.format(kinkShootListShootXpath, i)));
			link.click();
			shoot = ShootUtils.getShootData(driver);
			downloadPath = basePath + "shoots/" + shoot.getId();
			new File(downloadPath).mkdirs();
			try {
				String downloadLink = driver.findElement(By.xpath(kinkDownloadSingleVideoXpath)).getAttribute("href");
				download(downloadLink, downloadPath);
			} catch (NoSuchElementException e) {
				for (WebElement format : driver.findElements(By.xpath(kinkDownloadSegmentedVideoFormatsXpath))) {
					List<WebElement> segments = format.findElements(By.name("a"));
					for (WebElement segment : segments) {
						String downloadLink = segment.getAttribute("href");
						download(downloadLink, downloadPath);
					}
				}
			}			
			driver.navigate().back();
		}
		
		return results;
	}

	public void download(String url, String downloadPath) throws IOException, InterruptedException {
		String ariaLocation = "C:/Users/MrNakaan/Git Repos/KinkUtils/helpers/aria2-1.29.0-win-64bit-build1/aria2c.exe";
		String cookieLocation = "C:/Users/MrNakaan/AppData/Local/Google/Chrome/User Data/Default/Cookies";
		String downloadCompleteFlag = "Download complete";
		
		StringBuilder builder = new StringBuilder();
		builder.append("\"{0}\" ");
		builder.append("--file-allocation=none ");
		builder.append("\"--load-cookies={1}\" ");
		builder.append("-d ");
		builder.append("\"{2}\" ");
		builder.append(url);
		
		String command = MessageFormat.format(builder.toString(), ariaLocation, cookieLocation, downloadPath);
		
		Process process = Runtime.getRuntime().exec(command);

		BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String line = reader.readLine();
		
		while (!line.contains(downloadCompleteFlag)) {
			System.out.println(line);
			line = reader.readLine();
		}
		
		System.out.println(line);
	}

	public void logout() {
		String kinkLogoutUrl = "http://www.kink.com/logout";
		
		driver.navigate().to(kinkLogoutUrl);
	}
	
	public void exit() {
		driver.close();
		driver = null;
	}

	public void exportShoots() throws IOException, SQLException {
		for (Shoot shoot : ShootUtils.getShoots()) {
			ShootUtils.ExportShoot(shoot, connection, "Kink Test Shoots");
			shoot.setPreviewImages(new LinkedList<KUtilsImage>());
		}
	}
	
}
