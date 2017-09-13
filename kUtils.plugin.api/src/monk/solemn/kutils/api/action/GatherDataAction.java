package monk.solemn.kutils.api.action;

import java.util.Map;

import org.apache.commons.lang3.tuple.Pair;

public interface GatherDataAction extends ActionBase {
	String getTitle();
	
	String getDescription();
	
	Pair<MetadataType, String> getMetadata();
	
	Map<MetadataType, String> getAllMetadata();
}
