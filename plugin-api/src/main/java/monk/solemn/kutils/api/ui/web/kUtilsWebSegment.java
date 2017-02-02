package monk.solemn.kutils.api.ui.web;

import org.apache.wicket.markup.html.WebPage;

import ro.fortsoft.pf4j.ExtensionPoint;

public interface kUtilsWebSegment extends ExtensionPoint {
	/**
	 * Gets the URL to mount this section to such as /pluginInterface
	 */
	String getUrlMount();
	
	/**
	 * Gets the home page for this section.
	 */
	WebPage getSectionHomePage();
	
	String getTitle();
	
	String getDescription();
	
	/**
	 * Returns the semantic version for this plugin
	 */
	String getVersion();
}
