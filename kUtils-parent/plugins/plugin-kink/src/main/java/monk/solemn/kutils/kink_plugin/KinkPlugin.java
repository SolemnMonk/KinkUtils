package monk.solemn.kutils.kink_plugin;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.openqa.selenium.WebDriver;

import monk.solemn.kutils.api.base.NetworkBase;
import monk.solemn.kutils.api.base.PluginBase;
import monk.solemn.kutils.api.base.SeleniumPlugin;
import monk.solemn.kutils.dao.ActorDao;
import monk.solemn.kutils.dao.CredentialDao;
import monk.solemn.kutils.dao.ShootDao;
import monk.solemn.kutils.enums.Action;
import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.enums.PluginType;
import monk.solemn.kutils.enums.Target;
import monk.solemn.kutils.objects.PluginInfo;
import monk.solemn.kutils.objects.QueuedTask;
import monk.solemn.kutils.objects.Task;
import monk.solemn.kutils.utilities.high.DaoUtilities;
import ro.fortsoft.pf4j.Plugin;
import ro.fortsoft.pf4j.PluginException;
import ro.fortsoft.pf4j.PluginWrapper;

public class KinkPlugin extends Plugin implements PluginBase, NetworkBase, SeleniumPlugin {
	private static String pluginId;
	
	private static ResourceBundle urls;
	private static ResourceBundle xpaths;
	private static ResourceBundle titles;

	private static Map<String, String> sites;

	private static QueuedTask queuedTask;
	private static PluginInfo info;

	private static WebDriver driver;
	
	private static ActorDao actorDao;
	private static CredentialDao credentialDao;
	private static ShootDao shootDao;
	
	public KinkPlugin(PluginWrapper wrapper) {
		super(wrapper);
		
		pluginId = wrapper.getPluginId();
	}

	@Override
	public void start() throws PluginException {
		System.out.println("Starting " + pluginId);

		loadSites();
		loadProperties();
		
		actorDao = DaoUtilities.getActorDao();
		credentialDao = DaoUtilities.getCredentialDao();
		shootDao = DaoUtilities.getShootDao();
		
		System.out.println(pluginId + " started");
	}

	@Override
	public void stop() throws PluginException {
		System.out.println("Stopping " + pluginId);
		
		unloadProperties();
		
		System.out.println(pluginId + " stopped");
	}

	@Override
	public PluginInfo getPluginInfo() {
		if (info == null) {
			info = new PluginInfo();

			info.setName("Kink.com");
			info.setType(PluginType.Network);
			info.setDescription("A plugin for ripping and gathering the data for shoots on the Kink.com network.");
			info.setVersion("0.0.1");

			List<ContentType> contentTypes = new LinkedList<>();
			contentTypes.add(ContentType.Images);
			contentTypes.add(ContentType.Videos);

			info.setContentTypes(contentTypes);

			List<Task> tasks = new LinkedList<>();
			tasks.add(new Task(Action.Rip, Target.Network));
			tasks.add(new Task(Action.Rip, Target.Site));
			tasks.add(new Task(Action.Rip, Target.Actor));
			tasks.add(new Task(Action.Download, Target.Series));
			tasks.add(new Task(Action.Download, Target.Shoot));
			tasks.add(new Task(Action.GatherData, Target.Series));
			tasks.add(new Task(Action.GatherData, Target.Shoot));
			tasks.add(new Task(Action.GatherData, Target.Actor));

			info.setTasks(tasks);
		}

		return info;
	}

	@Override
	public boolean loadQueuedTask(QueuedTask queuedTask) {
		if (queuedTask == null) {
			return false;
		} else {
			KinkPlugin.queuedTask = queuedTask;
			return true;
		}
	}

	@Override
	public List<String> getSites() {
		List<String> siteList = new LinkedList<>();

		for (String site : sites.keySet()) {
			siteList.add(site);
		}

		return siteList;
	}

	private void loadProperties() {
		unloadProperties();

		urls = ResourceBundle.getBundle("urls");
		xpaths = ResourceBundle.getBundle("xpaths");
		titles = ResourceBundle.getBundle("titles");
	}

	private void unloadProperties() {
		urls = null;
		xpaths = null;
		titles = null;
	}

	private void loadSites() {
		sites = new HashMap<>();

		sites.put("Device Bondage", "devicebondage");
		sites.put("Hardcore Gangbang", "hardcoregangbang");
		sites.put("Hogtied", "hogtied");
		sites.put("Kink University", "kinkuniversity");
		sites.put("Public Disgrace", "publicdisgrace");
		sites.put("Sex and Submission", "sexandsubmission");
		sites.put("The Training of O", "thetrainingofo");
		sites.put("The Upper Floor", "theupperfloor");
		sites.put("Bound Gang Bangs", "boundgangbangs");
		sites.put("Dungeon Sex", "dungeonsex");
		sites.put("Sadistic Rope", "sadisticrope");
		sites.put("Water Bondage", "waterbondage");
		sites.put("Everything Butt", "everythingbutt");
		sites.put("Fucking Machines", "fuckingmachines");
		sites.put("Ultimate Surrender", "ultimatesurrender");
		sites.put("Foot Worship", "footworship");
		sites.put("Animated Kink", "animatedkink");
		sites.put("Divine Bitches", "divinebitches");
		sites.put("Electro Sluts", "electrosluts");
		sites.put("Whipped Ass", "whippedass");
		sites.put("Men in Pain", "meninpain");
		sites.put("Wired Pussy", "wiredpussy");
		sites.put("TS Seduction", "tsseduction");
		sites.put("TS Pussy Hunters", "tspussyhunters");
		sites.put("Bound Gods", "boundgods");
		sites.put("Men on Edge", "menonedge");
		sites.put("Naked Kombat", "nakedkombat");
		sites.put("Bound in Public", "boundinpublic");
		sites.put("30 Minutes of Torment", "30minutesoftorment");
		sites.put("Butt Machine Boys", "buttmachineboys");
		sites.put("Kink Test Shoots", "kinktestshoots");
		sites.put("KinkMen Test Shoots", "kinkmentestshoots");
		sites.put("Kink Raw Test Shoots", "kinkrawtestshoots");
	}

	public static String getUrl(String key) {
		if (urls.containsKey(key)) {
			return urls.getString(key);
		} else {
			return null;
		}
	}

	public static String getXpath(String key) {
		if (xpaths.containsKey(key)) {
			return xpaths.getString(key);
		} else {
			return null;
		}
	}

	public static String getTitle(String key) {
		if (titles.containsKey(key)) {
			return titles.getString(key);
		} else {
			return null;
		}
	}

	public static String getSiteShortName(String key) {
		if (sites.containsKey(key)) {
			return sites.get(key);
		} else {
			return null;
		}
	}

	public static QueuedTask getQueuedTask() {
		return queuedTask;
	}

	public static ActorDao getActorDao() {
		return actorDao;
	}

	public static CredentialDao getCredentialDao() {
		return credentialDao;
	}

	public static ShootDao getShootDao() {
		return shootDao;
	}

	@Override
	public void run() {
		if (queuedTask.getTask().getAction() == Action.Rip) {
			Ripper.performRip(driver, queuedTask);
		} else if (queuedTask.getTask().getAction() == Action.Download) {
			performDownload();
		} else if (queuedTask.getTask().getAction() == Action.GatherData) {
			gatherData();
		}
	}

	private void performDownload() {

	}

	private void gatherData() {

	}

	@Override
	public boolean taskRequiresAuthentication() {
		if (queuedTask.getTask().getAction() == Action.GatherData) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public void loadWebdriver(WebDriver driver) {
		KinkPlugin.driver = driver;
	}
}
