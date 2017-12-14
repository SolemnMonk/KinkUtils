package monk.solemn.kutils.core;

import java.util.List;

import monk.solemn.kutils.api.base.PluginBase;

public class PluginContainer {
	private static List<PluginBase> plugins;

	public static List<PluginBase> getPlugins() {
		return plugins;
	}

	public static void setPlugins(List<PluginBase> plugins) {
		PluginContainer.plugins = plugins;
	}
}
