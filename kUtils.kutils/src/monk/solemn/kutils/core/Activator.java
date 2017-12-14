package monk.solemn.kutils.core;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceListener;

public class Activator implements BundleActivator {
	private static BundleContext context;
	private static ServiceListener serviceListener;
	
	@Override
	public void start(BundleContext context) throws Exception {
		Activator.context = context;
		Activator.serviceListener = new PluginListener();
		context.removeServiceListener(Activator.serviceListener);
	}

	@Override
	public void stop(BundleContext context) throws Exception {
	}
	
	public static BundleContext getContext() {
		return context;
	}
}
