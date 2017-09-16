package monk.solemn.kutils.api.action;

import java.util.Map;

public interface GatherDataAction extends ActionBase {
	/**
	 * A convenience method for getMetadata(MetadataType.TITLE)
	 * 
	 * @return
	 */
	String getTitle();
	
	/**
	 * A convenience method for getMetadata(MetadataType.DESCRIPTION)
	 * 
	 * @return
	 */
	String getDescription();
	
	/**
	 * Get the specified type of metadata. If it is unavailable, null should be returned. 
	 * For binary data, the key from a call to the File Storage DAO should be returned. 
	 * For images, this can return either a base-64 encoded PNG or treated them the same 
	 * as binary data. 
	 * 
	 * @param metadataType
	 * @return
	 */
	String getMetadata(MetadataType metadataType);
	
	/**
	 * Gets all available metadata. This is effectively the same as calling getMetadata() once 
	 * for every metadata type and then filtering out the unavailable data.
	 * 
	 * @return
	 */
	Map<MetadataType, String> getAllMetadata();
}
