package monk.solemn.kutils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import monk.solemn.kutils.api.authentication.SeleniumAuthentication;
import monk.solemn.kutils.api.base.NetworkBase;
import monk.solemn.kutils.api.base.PluginBase;
import monk.solemn.kutils.api.base.SeleniumPlugin;
import monk.solemn.kutils.enums.Action;
import monk.solemn.kutils.enums.Target;
import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.objects.Shoot;
import monk.solemn.kutils.objects.Task;
import monk.solemn.kutils.shoot.ShootUtils;
import ro.fortsoft.pf4j.PluginManager;
import ro.fortsoft.pf4j.PluginWrapper;

public class LaunchSelenium extends WebPage {
	public static final String basePath = "C:/Users/MrNakaan/Desktop/kUtils/";
	
	private static final long serialVersionUID = -8453950956898010035L;
	private static final Logger logger = LogManager.getLogger(LaunchSelenium.class);
	
	private WebDriver driver;
	private Connection connection;
	
	public LaunchSelenium() throws SQLException {
		System.setProperty("webdriver.gecko.driver", "C:/Users/MrNakaan/Git Repos/kUtils/web_drivers/geckodriver.exe");
		System.setProperty("webdriver.chrome.driver", "C:/Users/MrNakaan/Git Repos/kUtils/web_drivers/chromedriver.exe");
		
		//ActorUtils.getActors().addAll(WicketApplication.getActorDao().loadAllActors());
		//ShootUtils.getShoots().addAll(WicketApplication.getShootDao().loadAllShoots());
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
		Link reloadPluginsLink = new Link("reloadPluginsLink") {
			public void onClick() {
				((KUtilsApplication) KUtilsApplication.get()).reloadPlugins();
			};
		};
		
		add(launchKtsSeleniumLink);
	}

	public void launchKtsSeleniumClick() throws InterruptedException, IOException, ParseException, SQLException {
		configureDriver();
		
		KUtilsApplication wApp = (KUtilsApplication) KUtilsApplication.get();
		PluginManager pMan = wApp.getPluginManager();
		PluginWrapper pWrp = pMan.getPlugin("kink-plugin");
		PluginBase kinkPlugin = (PluginBase) pWrp.getPlugin();
		
		Task task = new Task(Action.Rip, Target.Site);
		Map<String, String> options = new HashMap<>();
		options.put("site-friendly-name", "Kink Test Shoots");
		QueuedTask queuedTask = new QueuedTask(task, options);
		kinkPlugin.loadQueuedTask(queuedTask);
		
		if (kinkPlugin instanceof SeleniumPlugin) {
			((SeleniumPlugin) kinkPlugin).loadWebdriver(driver);
		}
		
		if (((NetworkBase) kinkPlugin).taskRequiresAuthentication()) {
			pMan.getExtensions(SeleniumAuthentication.class, "kink-plugin").get(0).login(driver);
			((NetworkBase) kinkPlugin).run();
			pMan.getExtensions(SeleniumAuthentication.class, "kink-plugin").get(0).logout(driver);
		} else {
			((NetworkBase) kinkPlugin).run();
		}
		
//		WicketApplication.getActorDao().loadAllActors();
//		
//		int page = 1;
//		int shootsOnLastPage;
//		while (true) {
//			loadLatestShoots("kinktestshoots", page);
//			shootsOnLastPage = downloadPage();
//			break;
//			if (shootsOnLastPage != 20) {
//				break;
//			}
//			page++;
//		}
//		
		((KUtilsApplication) KUtilsApplication.get()).getPluginManager().getExtensions(SeleniumAuthentication.class, "kink-plugin").get(0).logout(driver);
		exit();
	}
	
	public void configureDriver() {
		driver = new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(4, TimeUnit.SECONDS);
		driver.manage().window().maximize();
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
			shoot = null;//ShootUtils.getShootData(driver);
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

	public void exit() {
		driver.close();
		driver = null;
	}
}
