package monk.solemn.kutils.api.action;

import java.util.List;

public interface ListAction extends ActionBase {
	List<String> listChannels();
	
	boolean isPaginated();
	
	boolean hasPreviousPage();
	
	boolean hasNextPage();
	
	void previousPage();
	
	void nextPage();
	
	long numItemsOnPage();
	
	List<String> listPage();
}
