package monk.solemn.kutils.core;

import java.util.Hashtable;

import javax.servlet.Filter;
import javax.servlet.Servlet;

import org.apache.wicket.protocol.http.WicketFilter;
import org.apache.wicket.protocol.http.WicketServlet;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

import monk.solemn.kutils.utilities.high.SeleniumServerUtilities;

public class Activator implements BundleActivator {
	BundleContext osgiContext;
	
	@Override
	public void start(BundleContext context) throws Exception {
		osgiContext = context;
		
		Hashtable<String, String> properties = new Hashtable<>();
		properties.put("osgi.http.whiteboard.filter.regex", "/*");
		properties.put("osgi.http.whiteboard.servlet.pattern", "/ku");
		properties.put("filter.init.applicationClassName", KUtilsApplication.class.getName());
		context.registerService(Filter.class.getName(), new WicketFilter(), properties);
		context.registerService(Servlet.class.getName(), new WicketServlet(), properties);
		
		SeleniumServerUtilities.sendSeleniumCommand("Some Command Text!");
	}

	@Override
	public void stop(BundleContext context) throws Exception {
	}
}
