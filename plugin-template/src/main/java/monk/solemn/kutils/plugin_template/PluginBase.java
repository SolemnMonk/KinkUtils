package monk.solemn.kutils.plugin_template;

import ro.fortsoft.pf4j.Plugin;
import ro.fortsoft.pf4j.PluginException;
import ro.fortsoft.pf4j.PluginWrapper;

public class PluginBase extends Plugin {
	public PluginBase(PluginWrapper wrapper) {
		super(wrapper);
	}

	@Override
	public void start() throws PluginException {
		super.start();
	}
	
	@Override
	public void stop() throws PluginException {
		super.stop();
	}
}
