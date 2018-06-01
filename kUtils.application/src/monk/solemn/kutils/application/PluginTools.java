package monk.solemn.kutils.application;

import java.util.HashMap;
import java.util.Map;

import monk.solemn.kutils.plugin.api.PluginBase;
import monk.solemn.kutils.plugin.api.SourceSiteDataGathererPlugin;
import monk.solemn.kutils.plugin.api.SourceSiteDownloaderPlugin;
import monk.solemn.kutils.plugin.api.SourceSitePlugin;

public class PluginTools {
	private static Map<String, PluginBase> plugins = new HashMap<>();
	
	public static PluginBase findPlugin(String pluginKey) {
		if (plugins.containsKey(pluginKey)) {
			return plugins.get(pluginKey);
		} else {
			return null;
		}
	}
	
	public static SourceSitePlugin findSourceSitePlugin(String pluginKey) {
		PluginBase plugin = findPlugin(pluginKey);
		if (plugin instanceof SourceSitePlugin) {
			return (SourceSitePlugin) plugin;
		}
		
		return null;
	}
	
	public static SourceSiteDownloaderPlugin findSourceSiteDownloaderPlugin(String pluginKey) {
		PluginBase plugin = findPlugin(pluginKey);
		if (plugin instanceof SourceSiteDownloaderPlugin) {
			return (SourceSiteDownloaderPlugin) plugin;
		}
		
		return null;
	}
	
	public static SourceSiteDataGathererPlugin findSourceSiteDataGathererPlugin(String pluginKey) {
		PluginBase plugin = findPlugin(pluginKey);
		if (plugin instanceof SourceSiteDataGathererPlugin) {
			return (SourceSiteDataGathererPlugin) plugin;
		}
		
		return null;
	}
	
	public static void registerPlugin(String pluginKey, PluginBase plugin) {
		plugins.put(pluginKey, plugin);
	}
	
	public static void unregisterPlugin(String pluginKey) {
		plugins.remove(pluginKey);
	}
}
