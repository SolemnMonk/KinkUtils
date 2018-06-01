package monk.solemn.kutils.plugin.core.danbooru;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

import monk.solemn.kutils.application.PluginTools;
import monk.solemn.kutils.plugin.api.PluginBase;
import monk.solemn.kutils.plugin.api.SourceSiteDownloaderPlugin;
import monk.solemn.kutils.plugin.api.SourceSitePlugin;

public class Activator implements BundleActivator {
	private static BundleContext context;
	
	@Override
	public void start(BundleContext context) throws Exception {
		Activator.context = context;
		
		SourceSiteDownloaderPlugin plugin = new SourceSiteDownloaderPluginImpl(); 
//		context.registerService(PluginBase.class, plugin, null);
//		context.registerService(SourceSitePlugin.class, plugin, null);
//		context.registerService(SourceSiteDownloaderPlugin.class, plugin, null);
		
		PluginTools.registerPlugin("dbruCore", plugin);
	}

	@Override
	public void stop(BundleContext context) throws Exception {
	}
	
	public static BundleContext getContext() {
		return context;
	}
}

