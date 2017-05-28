package monk.solemn.kutils.core;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.link.Link;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.osgi.framework.ServiceReference;

import monk.solemn.kutils.api.base.NetworkBase;
import monk.solemn.kutils.api.base.PluginBase;
import monk.solemn.kutils.api.base.SeleniumPlugin;
import monk.solemn.kutils.enums.Action;
import monk.solemn.kutils.enums.Target;
import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.objects.Task;

public class LaunchSelenium extends WebPage {
	private static final long serialVersionUID = -8453950956898010035L;
	
	private WebDriver driver;
	
	public LaunchSelenium() throws SQLException {
		System.setProperty("webdriver.gecko.driver", "../../web_drivers/geckodriver.exe");
		System.setProperty("webdriver.chrome.driver", "../../web_drivers/chromedriver.exe");
	}
	
	@Override
	protected void onInitialize() {
		super.onInitialize();
		Link<Void> launchKtsSeleniumLink = new Link<Void>("launchKtsSeleniumLink") {
			private static final long serialVersionUID = 1L;

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
		
		add(launchKtsSeleniumLink);
	}

	public void launchKtsSeleniumClick() throws InterruptedException, IOException, ParseException, SQLException {
		configureDriver();
		
		KUtilsApplication wApp = (KUtilsApplication) KUtilsApplication.get();
//		ServiceReference<PluginBase> sRef = wApp.getOsgiContext().getServiceReference(PluginBase.class);
//		PluginBase plugin = wApp.getOsgiContext().getService(sRef);
		
		Task task = new Task(Action.Rip, Target.Site);
		Map<String, String> options = new HashMap<>();
		options.put("site-friendly-name", "Kink Test Shoots");
		options.put("video-quality-label", "large");
		QueuedTask queuedTask = new QueuedTask(task, options);
//		plugin.loadQueuedTask(queuedTask);
//		
//		if (plugin instanceof SeleniumPlugin) {
//			((SeleniumPlugin) plugin).loadWebdriver(driver);
//		}
		
//		if (((NetworkBase) plugin).taskRequiresAuthentication()) {
//			pMan.getExtensions(SeleniumAuthentication.class, "plugin-kink").get(0).login(driver);
//			((NetworkBase) plugin).run();
//			pMan.getExtensions(SeleniumAuthentication.class, "plugin-kink").get(0).logout(driver);
//		} else {
//			((NetworkBase) plugin).run();
//		}
		
//		((KUtilsApplication) KUtilsApplication.get()).getPluginManager().getExtensions(SeleniumAuthentication.class, "plugin-kink").get(0).logout(driver);
		exit();
	}
	
	public void configureDriver() {
		driver = new ChromeDriver();
		
		driver.manage().timeouts().implicitlyWait(4, TimeUnit.SECONDS);
		driver.manage().window().maximize();
	}

	public void exit() {
		driver.close();
		driver = null;
	}
}
