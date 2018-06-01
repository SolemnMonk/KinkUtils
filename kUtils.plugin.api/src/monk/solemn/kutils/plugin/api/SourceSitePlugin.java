package monk.solemn.kutils.plugin.api;

import org.osgi.annotation.versioning.ProviderType;

import monk.solemn.kutils.objects.Task;

@ProviderType
public interface SourceSitePlugin extends PluginBase {
	/**
	 * Validates and loads a task.
	 * 
	 * @param - task the task to be loaded.
	 * 
	 * @return true if the task validated and loaded successfully.
	 */
	boolean loadTask(Task task);
	
	/**
	 * Returns the currently loaded task, or null if no task is loaded. 
	 */
	Task getTask();

	/**
	 * Returns true if the loaded task requires authentication. 
	 */
	boolean taskRequiresAuthentication();
	
	/**
	 * Authenticate with the source site. If authentication has already been done or 
	 * is not a discrete action, such as every network request requires authentication,
	 * this method may return immediately. kUtils will call this method if necessary when
	 * beginning each task.
	 */
	void authenticate();
	
	/**
	 * Deauthenticate with the source site. If deauthentication has been done or is 
	 * not a discrete action, such as every network request requires authentication,
	 * this method may return immediately. While kUtils is guaranteed to call 
	 * authenticate if the task is reported as requiring authentication, deauthentication
	 * is not guaranteed to ever be called by kUtils. Due to this, deauthentication
	 * should be handled primarily by the plugin if it is necessary.
	 */
	void deauthenticate();
}
