package monk.solemn.kutils.data.provider;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.data.api.EntityRecordDao;
import monk.solemn.kutils.enums.EntityClass;

@Component
public class EntityRecordDaoImpl implements EntityRecordDao {
	Runtime runtime = Runtime.getRuntime();

	@Override
	public Long addNewItem(File entity) throws IOException {
		return addNewEntity(entity, EntityClass.ITEM);
	}

	@Override
	public void removeItem(Long itemId) throws IOException {
		removeEntity(itemId);
	}

	@Override
	public Long addNewBundle(File entity, Map<String, String> metadata) throws IOException {
		Long id = addNewEntity(entity, EntityClass.BUNDLE);

		if (metadata != null && !metadata.isEmpty()) {
			for (String key : metadata.keySet()) {
				recordNewMetadata(id, key, metadata.get(key));
			}
		}

		return id;
	}

	@Override
	public void removeBundle(Long bundleId) throws IOException {
		Map<Long, Pair<String, String>> metadata = retrieveMetadata(bundleId);
		for (Long id : metadata.keySet()) {
			removeMetadata(id);
		}
		removeEntity(bundleId);
	}

	@Override
	public Long addNewVirtualEntity(String path, EntityClass entityClass) throws IOException, IllegalArgumentException {
		return addNewVirtualEntity(path, entityClass, null);
	}

	@Override
	public Long addNewVirtualEntity(String path, EntityClass entityClass, Map<String, String> data)
			throws IOException, IllegalArgumentException {
		if (!entityClass.isAbstract()) {
			throw new IllegalArgumentException("isAbstract() method of entityClass must return true.");
		}

		Long entityId = addNewEntity(path, entityClass);

		for (String key : data.keySet()) {
			addDataForVirtualEntity(entityId, key, data.get(key));
		}

		return entityId;
	}

	@Override
	public void removeVirtualEntity(Long entityId) throws IOException {
		StringBuilder queryBuilder = new StringBuilder();
		queryBuilder.append("DELETE FROM `virtualEntityData` WHERE `entityId` = {0};");
		queryBuilder.append("DELETE FROM `entities` WHERE `entityId` = {1};");

		String query = MessageFormat.format(queryBuilder.toString(), entityId, entityId);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	@Override
	public Long addNewChannel(String path) throws IOException {
		return addNewChannel(path, null);
	}

	@Override
	public Long addNewChannel(String path, Map<String, String> data) throws IOException {
		Long entityId = addNewEntity(path, EntityClass.CHANNEL);

		for (String key : data.keySet()) {
			addDataForVirtualEntity(entityId, key, data.get(key));
		}

		return entityId;
	}

	@Override
	public void removeChannel(Long entityId) throws IOException {
		removeVirtualEntity(entityId);
	}

	@Override
	public Long addNewSearch(String path) throws IOException {
		return addNewSearch(path, null);
	}

	@Override
	public Long addNewSearch(String path, Map<String, String> data) throws IOException {
		Long entityId = addNewEntity(path, EntityClass.SEARCH);

		for (String key : data.keySet()) {
			addDataForVirtualEntity(entityId, key, data.get(key));
		}

		return entityId;
	}

	@Override
	public void removeSearch(Long entityId) throws IOException {
		removeVirtualEntity(entityId);
	}

	@Override
	public Long addNewSite(String path) throws IOException {
		return addNewSite(path, null);
	}

	@Override
	public Long addNewSite(String path, Map<String, String> data) throws IOException {
		Long entityId = addNewEntity(path, EntityClass.SITE);

		for (String key : data.keySet()) {
			addDataForVirtualEntity(entityId, key, data.get(key));
		}

		return entityId;
	}

	@Override
	public void removeSite(Long entityId) throws IOException {
		removeVirtualEntity(entityId);
	}

	@Override
	public boolean verifyEntityRecords(boolean cleanInvalidEntries) throws IOException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void convertItemToBundle(Long itemId) throws IOException {
		convertItemToBundle(itemId, new HashMap<>());
	}

	@Override
	public void convertItemToBundle(Long itemId, Map<String, String> metadata) throws IOException {
		String query = "UPDATE `entities` SET classId = (SELECT classId FROM classes WHERE name = ''bundle'') WHERE entityId = {0}";
		query = MessageFormat.format(query, itemId.toString());
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");

		addMetadataToBundle(itemId, metadata);
	}

	@Override
	public void addMetadataToBundle(Long bundleId, String key, String value) throws IOException {
		String query = "INSERT INTO `metadata` (`entityId`, `key`, `value`) VALUES ({0}, ''{1}'', ''{2}'')";
		query = MessageFormat.format(query, bundleId, key, value);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	@Override
	public void addMetadataToBundle(Long bundleId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			addMetadataToBundle(bundleId, key, metadata.get(key));
		}
	}

	@Override
	public void updateMetadataOnBundle(Long bundleId, String key, String value) throws IOException {
		String query = "UPDATE `metadata` SET `value` = ''{0}'' WHERE `entityId` = {1} AND `key` = ''{2}'')";
		query = MessageFormat.format(query, value, bundleId, key);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	@Override
	public void updateMetadataOnBundle(Long bundleId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			updateMetadataOnBundle(bundleId, key, metadata.get(key));
		}
	}

	@Override
	public void removeMetadataFromBundle(Long bundleId, String key) throws IOException {
		String query = "DELETE FROM `metadata` WHERE `entityId` = {1} AND `key` = ''{2}'')";
		query = MessageFormat.format(query, bundleId, key);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	@Override
	public void removeMetadataFromBundle(Long bundleId, List<String> keys) throws IOException {
		for (String key : keys) {
			removeMetadataFromBundle(bundleId, key);
		}
	}

	@Override
	public String getMetadataForBundle(Long bundleId, String key) throws IOException {
		String query = "SELECT `value` FROM `metadata` WHERE `entityId` = {0} AND `key` = ''{1}''";
		query = MessageFormat.format(query, bundleId, key);
		Process process = runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
		BufferedReader processOutput = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String value = processOutput.readLine();
		if (!StringUtils.isBlank(value) && value.length() > 2) {
			value = value.substring(1, value.length() - 1);
		}

		return value;
	}

	@Override
	public List<String> getMetadataForBundle(Long bundleId, List<String> keys) throws IOException {
		List<String> values = new ArrayList<>();
		for (String key : keys) {
			values.add(getMetadataForBundle(bundleId, key));
		}
		return values;
	}

	@Override
	public void addDataToVirtualEntity(Long virtualEntityId, String key, String value) throws IOException {
		String query = "INSERT INTO `virtualEntityData` (`entityId`, `key`, `value`) VALUES ({0}, ''{1}'', ''{2}''))";
		query = MessageFormat.format(query, virtualEntityId, key, value);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	@Override
	public void addDataToVirtualEntity(Long virtualEntityId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			addDataToVirtualEntity(virtualEntityId, key, metadata.get(key));
		}
	}

	@Override
	public void updateDataOnVirtualEntity(Long virtualEntityId, String key, String value) throws IOException {
		String query = "UPDATE `virtualEntityData` SET `value` = ''{0}'' WHERE `entityId` = {1} AND `key` = ''{2}''";
		query = MessageFormat.format(query, value, virtualEntityId, key);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	@Override
	public void updateDataOnVirtualEntity(Long virtualEntityId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			updateDataOnVirtualEntity(virtualEntityId, key, metadata.get(key));
		}
	}

	@Override
	public void removeDataFromVirtualEntity(Long virtualEntityId, String key) throws IOException {
		String query = "DELETE FROM `virtualEntityData` WHERE `entityId` = {0} AND `key` = ''{1}''";
		query = MessageFormat.format(query, virtualEntityId, key);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	@Override
	public void removeDataFromVirtualEntity(Long virtualEntityId, List<String> keys) throws IOException {
		for (String key : keys) {
			removeDataFromVirtualEntity(virtualEntityId, key);
		}
	}

	private synchronized Long addNewEntity(File entity, EntityClass entityType) throws IOException {
		return addNewEntity(entity.getAbsolutePath(), entityType);
	}

	private synchronized Long addNewEntity(String entityPath, EntityClass entityType) throws IOException {
		String query = "INSERT INTO `entities` (`entityPath`, `classId`) VALUES (''{0}'', (SELECT classId FROM classes WHERE name = ''{1}''))";
		query = MessageFormat.format(query, entityPath, entityType.toString().toLowerCase());
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");

		query = "SELECT `entityId` FROM `entities` ORDER BY `entityId` DESC LIMIT 1;";
		Process process = runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
		BufferedReader processOutput = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String value = processOutput.readLine();
		if (!StringUtils.isBlank(value) && value.length() > 2) {
			value = value.substring(1, value.length() - 1);
		}

		return Long.valueOf(value);
	}

	private synchronized void removeEntity(Long entityId) throws IOException {
		String query = "DELETE FROM `entities` WHERE `entityId` = {0}";
		query = MessageFormat.format(query, entityId);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	private synchronized Long recordNewMetadata(Long entityId, String key, String value) throws IOException {
		String query = "INSERT INTO `metadata` (`entityId`, `key`, `value`) VALUES ({0}, ''{1}'', ''{2}''))";
		query = MessageFormat.format(query, entityId, key, value);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");

		query = "SELECT `entityId` FROM `entities` ORDER BY `entityId` DESC LIMIT 1;";
		Process process = runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
		BufferedReader processOutput = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String metadataId = processOutput.readLine();
		if (!StringUtils.isBlank(metadataId) && metadataId.length() > 2) {
			metadataId = metadataId.substring(1, value.length() - 1);
		}

		return Long.valueOf(metadataId);
	}

	private synchronized void removeMetadata(Long metadataId) throws IOException {
		String query = "DELETE FROM `metadata` WHERE `metadataId` = {0}";
		query = MessageFormat.format(query, metadataId);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
	}

	private Map<Long, Pair<String, String>> retrieveMetadata(Long bundleId) throws IOException {
		String query = "SELECT `key`, `value` FROM `metadata` WHERE `entityId` = {0}";
		query = MessageFormat.format(query, bundleId);
		Process process = runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
		BufferedReader processOutput = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String rawMetadata = processOutput.readLine();
		Map<Long, Pair<String, String>> metadata = new HashMap<>();
		if (!StringUtils.isBlank(rawMetadata) && rawMetadata.length() > 2) {
			List<String> columns;
			for (String record : rawMetadata.split("'|'")) {
				columns = Arrays.asList(record.split("','"));
				metadata.put(Long.valueOf(columns.get(0)), new ImmutablePair<>(
						columns.get(1).substring(1, columns.get(1).length() - 1), columns.get(2).substring(1)));

			}
		}

		return metadata;
	}

	private synchronized Long addDataForVirtualEntity(Long entityId, String key, String value) throws IOException {
		String query = "INSERT INTO `virtualEntityData` (`entityId`, `key`, `value`) VALUES ({0}, ''{1}'', ''{2}'')";
		query = MessageFormat.format(query, entityId, key, value);
		runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");

		query = "SELECT `virtualEntityDataId` FROM `virtualEntityData` ORDER BY `virtualEntityDataId` DESC LIMIT 1;";
		Process process = runtime.exec("python.exe sqlite_interface.py -q \"" + query + "\"");
		BufferedReader processOutput = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String metadataId = processOutput.readLine();
		if (!StringUtils.isBlank(metadataId) && metadataId.length() > 2) {
			metadataId = metadataId.substring(1, metadataId.length() - 1);
		}

		return Long.valueOf(metadataId);
	}
}
