package monk.solemn.kutils.application;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

public class Activator implements BundleActivator {
	private static BundleContext context;
	private static Thread taskRunner;
	
	@Override
	public void start(BundleContext context) throws Exception {
		Activator.context = context;
		
		taskRunner = new Thread(new TaskRunner());
		taskRunner.start();
	}

	@Override
	public void stop(BundleContext context) throws Exception {
	}
	
	public static BundleContext getContext() {
		return context;
	}
}
// sgcv aria2Location "C:\Users\Mr. Nakaan\GitRepos\kUtils\helpers\aria2-1.29.0-win-64bit-build1\aria2c.exe"