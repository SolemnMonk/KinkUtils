package monk.solemn.kutils.data.api;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import monk.solemn.kutils.enums.EntityClass;

public interface EntityRecordDao {
	Long addNewItem(File entity) throws IOException;
	
	void removeItem(Long itemId) throws IOException;
	
	Long addNewBundle(File entity, Map<String, String> metadata) throws IOException;
	
	void removeBundle(Long bundleId) throws IOException;
	
	Long addNewVirtualEntity(String path, EntityClass entityClass) throws IOException, IllegalArgumentException;
	
	Long addNewVirtualEntity(String path, EntityClass entityClass, Map<String, String> data) throws IOException, IllegalArgumentException;
	
	void removeVirtualEntity(Long entityId) throws IOException;
	
	Long addNewChannel(String path) throws IOException;
	
	Long addNewChannel(String path, Map<String, String> data) throws IOException;
	
	void removeChannel(Long entityId) throws IOException;
	
	Long addNewSearch(String path) throws IOException;
	
	Long addNewSearch(String path, Map<String, String> data) throws IOException;
	
	void removeSearch(Long entityId) throws IOException;
	
	Long addNewSite(String path) throws IOException;
	
	Long addNewSite(String path, Map<String, String> data) throws IOException;
	
	void removeSite(Long entityId) throws IOException;
	
	boolean verifyEntityRecords(boolean cleanInvalidEntries) throws IOException;
	
	void convertItemToBundle(Long itemId) throws IOException;
	
	void convertItemToBundle(Long itemId, Map<String, String> metadata) throws IOException;
	
	void addMetadataToBundle(Long bundleId, String key, String value) throws IOException;
	
	void addMetadataToBundle(Long bundleId, Map<String, String> metadata) throws IOException;
	
	void updateMetadataOnBundle(Long bundleId, String key, String value) throws IOException;
	
	void updateMetadataOnBundle(Long bundleId, Map<String, String> metadata) throws IOException;
	
	void removeMetadataFromBundle(Long bundleId, String key) throws IOException;
	
	void removeMetadataFromBundle(Long bundleId, List<String> keys) throws IOException;
	
	String getMetadataForBundle(Long bundleId, String key) throws IOException;
	
	List<String> getMetadataForBundle(Long bundleId, List<String> keys) throws IOException;
	
	void addDataToVirtualEntity(Long virtualEntityId, String key, String value) throws IOException;
	
	void addDataToVirtualEntity(Long virtualEntityId, Map<String, String> metadata) throws IOException;
	
	void updateDataOnVirtualEntity(Long virtualEntityId, String key, String value) throws IOException;
	
	void updateDataOnVirtualEntity(Long virtualEntityId, Map<String, String> metadata) throws IOException;
	
	void removeDataFromVirtualEntity(Long virtualEntityId, String key) throws IOException;
	
	void removeDataFromVirtualEntity(Long virtualEntityId, List<String> keys) throws IOException;
}
