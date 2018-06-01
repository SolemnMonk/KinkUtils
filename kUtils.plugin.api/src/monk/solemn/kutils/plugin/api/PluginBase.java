package monk.solemn.kutils.plugin.api;

import org.osgi.annotation.versioning.ProviderType;

import monk.solemn.kutils.objects.PluginInfo;

@ProviderType
public interface PluginBase {
	/**
	 * Gets the information for the plugin.
	 */
	PluginInfo getPluginInfo();
}
