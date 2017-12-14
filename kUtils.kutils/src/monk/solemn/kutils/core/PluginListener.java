package monk.solemn.kutils.core;

import org.osgi.framework.ServiceEvent;
import org.osgi.framework.ServiceListener;

public class PluginListener implements ServiceListener {

	@Override
	public void serviceChanged(ServiceEvent event) {
		System.out.println(event.getClass());
	}
}
