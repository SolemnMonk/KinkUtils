package monk.solemn.kutils.application.command;

import org.osgi.framework.BundleContext;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;
import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.application.Activator;
import monk.solemn.kutils.plugin.api.PluginBase;
import osgi.enroute.debug.api.Debug;

@Component(property={Debug.COMMAND_SCOPE + "=core",
		 			 Debug.COMMAND_FUNCTION + "=listPlugins"},
		   service=ListPluginsCommand.class)
public class ListPluginsCommand {
	public String listPlugins() throws InvalidSyntaxException {
		StringBuilder output = new StringBuilder();
		
		BundleContext context = Activator.getContext();
		
		ServiceReference<PluginBase>[] services = (ServiceReference<PluginBase>[]) context.getAllServiceReferences(null, "(objectClass=monk.solemn.kutils.api.PluginBase)");
		for (ServiceReference<PluginBase> service : services) {
			output.append(context.getService(service).getPluginInfo().getName());
		}
		
		return output.toString();
	}
}
