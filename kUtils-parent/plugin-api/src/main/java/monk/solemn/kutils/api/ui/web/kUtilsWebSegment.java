package monk.solemn.kutils.api.ui.web;

import org.apache.wicket.markup.html.WebPage;

public interface kUtilsWebSegment {
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
