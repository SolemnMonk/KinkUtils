package monk.solemn.kutils.api.action;

import java.util.List;

/**
 * Terminology:
 * 	Search: a collection of channels/items/bundles based on a custom query
 * 	Channel: a collection of items that share a similar trait (videos, photos, same author, etc) 
 * 	Item: an item that contains a collection of bundles along with metadata (title, description, rating, etc)
 * 	Bundle: a single unit that can be downloaded and stored (image, video, document, archive, etc)
 * 
 * Cardinality
 * 	Search 1..* Channel
 * 	Search 1..* Item
 * 	Search 1..* Bundle
 * 	Channel 1..* Item
 * 	Channel 1..* Bundle
 * 	Item 1..* Item
 * 	Item 1..* Bundle
 * 	Bundle 1..* Bundle
 */
public interface ListAction extends ActionBase {
	long numChannels();
	
	long numItems();
	
	long numBundles();
	
	/**
	 * Get the currently available channel URLs. If the list is paginated, 
	 * this returns all items available on the current page.
	 * 
	 * @return A list of the currently available channel URLs.
	 */
	List<String> listChannels();
	
	/**
	 * Get the currently available item URLs. If the list is paginated, 
	 * this returns all items available on the current page.
	 * 
	 * @return A list of the currently available channel URLs.
	 */
	List<String> listItems();
	
	/**
	 * Get the currently available bundle URLs. If the list is paginated,
	 * this returns all bundles available on the current page.
	 * @return
	 */
	List<String> listBundles();
	
	boolean isPaginated();
	
	/**
	 * Get the number of pages available. 1 should be returned if 
	 * isPaginated() is false, and a negative number should be  
	 * returned if the number cannot be determined.
	 * 
	 * @return The number of pages, or a negative number if unknown.
	 */
	int getNumPages();

	/**
	 * Get the number of the current page. 0 should be returned if 
	 * isPaginated() is false, and a negative number should be  
	 * returned if the number cannot be determined.
	 * 
	 * @return The number of pages, or a negative number if unknown.
	 */
	int getCurrentPage();
	
	
	
	boolean hasPreviousPage();
	
	boolean hasNextPage();
	
	/**
	 * Go to the previous page. This is a no-op if isPaginated() is false;
	 */
	void previousPage();
	
	/**
	 * Go to the previous page. This is a no-op if isPaginated() is false;
	 */
	void nextPage();
}
