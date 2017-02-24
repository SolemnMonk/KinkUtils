package monk.solemn.kutils;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebApplication;

import monk.solemn.kutils.api.base.DataProviderBase;
import monk.solemn.kutils.api.base.NetworkBase;
import monk.solemn.kutils.api.base.PluginBase;
import monk.solemn.kutils.api.base.SiteBase;
import monk.solemn.kutils.api.base.UiBase;
import monk.solemn.kutils.api.ui.desktop.SwingWindow;
import monk.solemn.kutils.api.ui.web.kUtilsWebSegment;
import ro.fortsoft.pf4j.DefaultPluginManager;
import ro.fortsoft.pf4j.Plugin;
import ro.fortsoft.pf4j.PluginManager;
import ro.fortsoft.pf4j.PluginWrapper;

/**
 * Application object for your web application.
 * If you want to run this application without deploying, run the Start class.
 * 
 * @see monk.solemn.kutils.Start#main(String[])
 */
public class KUtilsApplication extends WebApplication
{
	private static PluginManager pluginManager;
	
	private static List<PluginWrapper> sitePlugins = new LinkedList<>();
	private static List<PluginWrapper> networkPlugins = new LinkedList<>();
	private static List<PluginWrapper> uiPlugins = new LinkedList<>();
	private static List<PluginWrapper> dataProviderPlugins = new LinkedList<>();
	
	private static boolean useWebInterface = false;
	private static boolean useDesktopInterface = false;
	
	@Override
	public Class<? extends WebPage> getHomePage()
	{
		return LaunchSelenium.class;
	}

	@Override
	public void init()
	{
		super.init();
		
		pluginManager = new DefaultPluginManager(new File("plugins/"));
		loadPlugins();
		startInterfaces();
	}
	
	@Override
	protected void onDestroy() {
		pluginManager.stopPlugins();
	}
	
	public void loadPlugins() {
		pluginManager.loadPlugins();
		validatePlugins();
		pluginManager.startPlugins();
		
		Plugin plugin;
		for (PluginWrapper pluginWrapper : pluginManager.getPlugins()) {
			plugin = pluginWrapper.getPlugin();
			if (plugin instanceof SiteBase) {
				sitePlugins.add(pluginWrapper);
			} else if (plugin instanceof NetworkBase) {
				networkPlugins.add(pluginWrapper);
			} else if (plugin instanceof UiBase) {
				uiPlugins.add(pluginWrapper);
				if (!useWebInterface && plugin instanceof kUtilsWebSegment) {
					useWebInterface = true;
				} else if (!useDesktopInterface && plugin instanceof SwingWindow) {
					useDesktopInterface = true;
				}
			} else if (plugin instanceof DataProviderBase) {
				dataProviderPlugins.add(pluginWrapper);
			} else {
				pluginManager.unloadPlugin(pluginWrapper.getPluginId());
			}
		}
	}
	
	public void reloadPlugins() {
		pluginManager.stopPlugins();
		loadPlugins();
		
		startInterfaces();
	}
	
	private void startInterfaces() {
		if (useWebInterface) {
			kUtilsWebSegment segment;
			
			for (PluginWrapper plugin : uiPlugins) {
				if (plugin instanceof kUtilsWebSegment) {
					segment = (kUtilsWebSegment) plugin;
					mountPage(segment.getUrlMount(), segment.getSectionHomePage().getClass());
				}
			}
		}
		
		if (useDesktopInterface) {
			
		}
	}
	
	private void validatePlugins() {
		for (PluginWrapper pluginWrapper : pluginManager.getPlugins()) {
			if (!(pluginWrapper.getPlugin() instanceof PluginBase)) {
				pluginManager.unloadPlugin(pluginWrapper.getPluginId());
			}
		}
	}
	
	public PluginManager getPluginManager() {
		return pluginManager;
	}
}
