package monk.solemn.kutils.data.provider;

import static monk.solemn.kutils.data.provider.Activator.closeDb;
import static monk.solemn.kutils.data.provider.Activator.openDb;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public Long addNewItem(Path entity) throws IOException {
		return addNewItem(entity.toFile());
	}

	@Override
	public Long getItemIdByPath(Path entity) throws IOException {
		return getItemIdByFile(entity.toFile());
	}

	@Override
	public Long getItemIdByFile(File entity) throws IOException {
		return getEntityIdByPath(EntityClass.ITEM, entity);
	}
	
	@Override
	public void removeItem(Long itemId) throws IOException {
		removeEntity(itemId);
	}

	@Override
	public Long addNewBundle(Path parent) throws IOException {
		return addNewBundle(new ArrayList<>(), parent);
	}
	
	@Override
	public Long addNewBundle(List<File> entities, Path parent) throws IOException {
		return addNewBundle(entities, parent, null);
	}
	
	@Override
	public Long addNewBundle(List<File> entities, Path parent, Map<String, String> metadata) throws IOException {
		for (File entity : entities) {
			addNewEntity(entity, EntityClass.ITEM);
		}

		long id = addNewEntity(parent.toString(), EntityClass.BUNDLE);
		
		if (metadata != null && !metadata.isEmpty()) {
			addMetadataToBundle(id, metadata);
		}

		return id;
	}

	@Override
	public Long getBundleIdByPath(Path parent) throws IOException {
		return getEntityIdByPath(EntityClass.BUNDLE, parent.toFile());
	}
	
	@Override
	public Long getBundleContainingEntity(File entity) throws IOException {
		return getBundleContainingEntities(Arrays.asList(entity));
	}

	@Override
	public Long getBundleContainingEntities(List<File> entities) throws IOException {
		return getBundleByEntities(entities);
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
	public Long addItemToBundle(Long bundleId, File entity) throws IOException {
		Long itemId = addNewItem(entity);
		return addRelationship(bundleId, itemId);
	}
	
	@Override
	public Long addItemToBundle(Long bundleId, Long itemId) throws IOException {
		return addRelationship(bundleId, itemId);
	}
	
	@Override
	public Long addItemToBundle(Long bundleId, Path entityPath) throws IOException {
		return addItemToBundle(bundleId, entityPath.toFile());
	}
	
	@Override
	public Long addItemToBundle(Long bundleId, String entityPath) throws IOException {
		return addItemToBundle(bundleId, Paths.get(entityPath));
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
		String query = "DELETE FROM `virtualEntityData` WHERE `entityId` = ?; DELETE FROM `entities` WHERE `entityId` = ?;";
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, entityId);
				pstmt.setLong(2, entityId);
				pstmt.execute();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public Long addRelationship(Long parentId, Long childId) throws IOException {
		String query = "INSERT INTO `relationships` (`parentId`, `childId`) VALUES (?, ?);";
		Long relationshipId = -1L;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, parentId);
				pstmt.setLong(2, childId);
				pstmt.execute();
			}
			
			query = "SELECT DISTINCT last_insert_rowid() FROM `relationships`;";
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					relationshipId = results.getLong(1);
				}
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return relationshipId;
	}
	
	public List<Long> getRelationships(Long parentId) throws IOException {
		String query = "SELECT `relationshipId` FROM `relationships` WHERE `parentId` = ?";
		
		List<Long> relationshipIds = new ArrayList<>();
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, parentId);
				
				ResultSet results = pstmt.executeQuery();
				while (results.next()) {
					relationshipIds.add(results.getLong(1));
				}
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return relationshipIds;
	}
	
	public Long getRelationship(Long parentId, Long childId) throws IOException {
		String query = "SELECT `relationshipId` FROM `relationships` WHERE `parentId` = ? AND `childId` = ?";
		
		Long relationshipId = -1L;
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, parentId);
				pstmt.setLong(2, childId);
				
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					relationshipId = results.getLong(1);
				}
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return relationshipId;
	}
	
	@Override
	public void removeRelationship(Long relationshipId) throws IOException {
		String query = "DELETE FROM `relationships` WHERE `relationshipId` = ?";
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, relationshipId);
				pstmt.execute();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
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
		String query = "UPDATE `entities` SET classId = (SELECT classId FROM classes WHERE name = 'bundle') WHERE entityId = ?";
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, itemId);
				pstmt.execute();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		addMetadataToBundle(itemId, metadata);
	}

	@Override
	public void addMetadataToBundle(Long bundleId, String key, String value) throws IOException {
		String query = "INSERT INTO `metadata` (`entityId`, `key`, `value`) VALUES (?, ?, ?)";
		
		if (value == null) {
			value = "";
		}
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, bundleId);
				pstmt.setString(2, key);
				pstmt.setString(3, value);
				pstmt.execute();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		query = MessageFormat.format(query, bundleId, key, value);
	}

	@Override
	public void addMetadataToBundle(Long bundleId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			addMetadataToBundle(bundleId, key, metadata.get(key));
		}
	}

	@Override
	public void updateMetadataOnBundle(Long bundleId, String key, String value) throws IOException {
		String query = "UPDATE `metadata` SET `value` = ? WHERE `entityId` = ? AND `key` = ?)";

		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setString(1, value);
				pstmt.setLong(2, bundleId);
				pstmt.setString(3, key);

				pstmt.execute();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void updateMetadataOnBundle(Long bundleId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			updateMetadataOnBundle(bundleId, key, metadata.get(key));
		}
	}

	@Override
	public void removeMetadataFromBundle(Long bundleId, String key) throws IOException {
		String query = "DELETE FROM `metadata` WHERE `entityId` = ? AND `key` = ?)";

		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, bundleId);
				pstmt.setString(2, key);

				pstmt.execute();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void removeMetadataFromBundle(Long bundleId, List<String> keys) throws IOException {
		for (String key : keys) {
			removeMetadataFromBundle(bundleId, key);
		}
	}

	@Override
	public String getMetadataForBundle(Long bundleId, String key) throws IOException {
		String query = "SELECT `value` FROM `metadata` WHERE `entityId` = ? AND `key` = ?";
		String value = null;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, bundleId);
				pstmt.setString(2, key);

				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					value = results.getString(1);
				}
				results.close();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
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
		String query = "INSERT INTO `virtualEntityData` (`entityId`, `key`, `value`) VALUES (?, ?, ?))";

		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, virtualEntityId);
				pstmt.setString(2, key);
				pstmt.setString(3, value);
				
				pstmt.execute();
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void addDataToVirtualEntity(Long virtualEntityId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			addDataToVirtualEntity(virtualEntityId, key, metadata.get(key));
		}
	}

	@Override
	public void updateDataOnVirtualEntity(Long virtualEntityId, String key, String value) throws IOException {
		String query = "UPDATE `virtualEntityData` SET `value` = ? WHERE `entityId` = ? AND `key` = ?";

		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setString(1, value);
				pstmt.setLong(2, virtualEntityId);
				pstmt.setString(3, key);

				pstmt.execute();
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void updateDataOnVirtualEntity(Long virtualEntityId, Map<String, String> metadata) throws IOException {
		for (String key : metadata.keySet()) {
			updateDataOnVirtualEntity(virtualEntityId, key, metadata.get(key));
		}
	}

	@Override
	public void removeDataFromVirtualEntity(Long virtualEntityId, String key) throws IOException {
		String query = "DELETE FROM `virtualEntityData` WHERE `entityId` = ? AND `key` = ?";

		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, virtualEntityId);
				pstmt.setString(2, key);

				pstmt.execute();
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
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

	private Long getEntityIdByPath(EntityClass entityType, File entity) {
		String query = "SELECT `entityId` FROM `entities` WHERE `entityPath` = ? AND `classId` = (SELECT classId FROM classes WHERE name = ?)";
		Long id = -1L;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setString(1, entity.getAbsolutePath());
				pstmt.setString(2, entityType.toString().toLowerCase());
				
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					id = results.getLong(1);
				}
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return id;
	}

	private synchronized Long getBundleByEntities(List<File> entities) {
		/* Generalized final query:
		 * 
		 * SELECT e2.`entityId` 
		 * FROM `entities` e1 
		 * JOIN `relationships` r ON e1.`entityId` = r.`childId` 
		 * JOIN `entities` e2 ON r.`parentId` = e2.`entityId` 
		 * WHERE e1.`entityPath` IN ((?, )*?) 
		 * AND e2.`classId` = (SELECT classId FROM classes WHERE name = "bundle") 
		 * GROUP BY e2.`entityId`;
		 */
		StringBuilder queryBuilder = new StringBuilder();
		queryBuilder.append("SELECT e2.`entityId` FROM `entities` e1 ");
		queryBuilder.append("JOIN `relationships` r ON e1.`entityId` = r.`childId` ");
		queryBuilder.append("JOIN `entities` e2 ON r.`parentId` = e2.`entityId` ");
		queryBuilder.append("WHERE e1.`entityPath` IN (");
		for (int i = 0; i < entities.size() - 1; i++) {
			queryBuilder.append("?, ");
		}
		queryBuilder.append(" ?");
		queryBuilder.append(") AND e2.`classId` = (SELECT classId FROM classes WHERE name = bundle) ");
		queryBuilder.append("GROUP BY e2.`entityId`;");
		
		String query = queryBuilder.toString();
		Long id = -1L;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				for (int i = 0; i < entities.size(); i++) {
					pstmt.setString(i + 1, entities.get(i).getAbsolutePath());
				}
				
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					id = results.getLong(1);
				}
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return id;
	}
	
	private synchronized Long addNewEntity(String entityPath, EntityClass entityType) throws IOException {
		String query = "INSERT INTO `entities` (`entityPath`, `classId`) VALUES (?, (SELECT classId FROM classes WHERE name = ?))";
		Long id = null;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setString(1, entityPath);
				pstmt.setString(2, entityType.toString().toLowerCase());

				pstmt.execute();
			}

			query = "SELECT DISTINCT last_insert_rowid() FROM `entities`;";
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					id = results.getLong(1);
				}
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return id;
	}

	private synchronized void removeEntity(Long entityId) throws IOException {
		String query = "DELETE FROM `entities` WHERE `entityId` = ?";

		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, entityId);

				pstmt.execute();
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private synchronized Long recordNewMetadata(Long entityId, String key, String value) throws IOException {
		String query = "INSERT INTO `metadata` (`entityId`, `key`, `value`) VALUES (?, ?, ?)";
		Long id = null;

		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, entityId);
				pstmt.setString(2, key);
				pstmt.setString(3, (value == null ? "" : value));

				pstmt.execute();
			}
			
			query = "SELECT DISTINCT last_insert_rowid() FROM `metadata`;";
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					id = results.getLong(1);
				}
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return id;
	}

	private synchronized void removeMetadata(Long metadataId) throws IOException {
		String query = "DELETE FROM `metadata` WHERE `metadataId` = ?";
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, metadataId);

				pstmt.execute();
			}

			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private Map<Long, Pair<String, String>> retrieveMetadata(Long bundleId) throws IOException {
		String query = "SELECT `metadataId` `key`, `value` FROM `metadata` WHERE `entityId` = ?";
		Map<Long, Pair<String, String>> metadata = new HashMap<>();
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, bundleId);

				ResultSet results = pstmt.executeQuery();
				while (results.next()) {
					metadata.put(results.getLong(1), new ImmutablePair<>(results.getString(2), results.getString(3)));
				}
				results.close();
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return metadata;
	}

	private synchronized Long addDataForVirtualEntity(Long entityId, String key, String value) throws IOException {
		String query = "INSERT INTO `virtualEntityData` (`entityId`, `key`, `value`) VALUES (?, ?, ?)";
		Long id = null;
		
		Connection conn;
		try {
			conn = openDb();
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				pstmt.setLong(1, entityId);
				pstmt.setString(2, key);
				pstmt.setString(3, value);

				pstmt.execute();
			}

			query = "SELECT DISTINCT last_insert_rowid() FROM `virtualEntityData`;";
			
			try (PreparedStatement pstmt = conn.prepareStatement(query)) {
				ResultSet results = pstmt.executeQuery();
				if (results.next()) {
					id = results.getLong(1);
				}
			}
			
			closeDb(conn);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return id;
	}
}
