package monk.solemn.kutils.api.base;

import monk.solemn.kutils.objects.PluginInfo;
import monk.solemn.kutils.objects.QueuedTask;

public interface PluginBase {
	void install();
	
	/**
	 * Gets the information for the plugin.
	 * 
	 * @return the plugin's information
	 */
	PluginInfo getPluginInfo();
	
	/**
	 * Load a QueuedTask for the next call to execute()  
	 * 
	 * @param queuedTask the queued task to load
	 * @return true to indicate successful loading, false otherwise
	 */
	boolean loadQueuedTask(QueuedTask queuedTask);
}
