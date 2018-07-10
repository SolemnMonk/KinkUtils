package monk.solemn.kutils.data.api;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import monk.solemn.kutils.enums.EntityClass;

public interface EntityRecordDao {
	Long addNewItem(File entity) throws IOException;
	
	Long addNewItem(Path entity) throws IOException;
	
	Long getItemIdByPath(Path entity) throws IOException;
	
	Long getItemIdByFile(File entity) throws IOException;
	
	void removeItem(Long itemId) throws IOException;

	Long addNewBundle(Path parent) throws IOException;
	
	Long addNewBundle(List<File> entities, Path parent) throws IOException;
	
	Long addNewBundle(List<File> entities, Path parent, Map<String, String> metadata) throws IOException;

	Long getBundleIdByPath(Path parent) throws IOException;
	
	Long getBundleContainingEntity(File entity) throws IOException;
	
	Long getBundleContainingEntities(List<File> entities) throws IOException;
	
	void removeBundle(Long bundleId) throws IOException;
	
	Long addItemToBundle(Long bundleId, File entity) throws IOException;
	
	Long addItemToBundle(Long bundleId, Long itemId) throws IOException;
	
	Long addItemToBundle(Long bundleId, Path entityPath) throws IOException;
	
	Long addItemToBundle(Long bundleId, String entityPath) throws IOException;
	
	Long addNewVirtualEntity(String path, EntityClass entityClass) throws IOException, IllegalArgumentException;
	
	Long addNewVirtualEntity(String path, EntityClass entityClass, Map<String, String> data) throws IOException, IllegalArgumentException;
	
	void removeVirtualEntity(Long entityId) throws IOException;
	
	Long addRelationship(Long parentId, Long childId) throws IOException;
	
	List<Long> getRelationships(Long parentId) throws IOException;
	
	Long getRelationship(Long parentId, Long childId) throws IOException;
	
	void removeRelationship(Long relationshipId) throws IOException;
	
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
