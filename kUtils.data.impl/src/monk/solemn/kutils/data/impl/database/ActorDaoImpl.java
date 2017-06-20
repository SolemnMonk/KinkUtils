package monk.solemn.kutils.data.impl.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.data.api.ActorDao;
import monk.solemn.kutils.data.api.BaseDao;
import monk.solemn.kutils.enums.Gender;
import monk.solemn.kutils.enums.Priority;
import monk.solemn.kutils.objects.Actor;
import monk.solemn.kutils.objects.ActorAttribute;
import monk.solemn.kutils.objects.KUtilsImage;

@Component
public class ActorDaoImpl extends BaseDao implements ActorDao {
	@Override
	public List<Actor> loadAllActors() throws SQLException {
		Connection connection = connect();
		
		List<Actor> actors = new LinkedList<Actor>();
		
		PreparedStatement idStatement;
		ResultSet idResults;
		final String idQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		queryBuilder.append("SELECT actorId FROM actorData ORDER BY actorId");
		idQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		idStatement = connection.prepareStatement(idQuery);
		
		idResults = idStatement.executeQuery();
		while (idResults.next()) {
			actors.add(loadActor(idResults.getLong(1)));
		}
		idStatement.close();
		
		disconnect(connection);
		return actors;
	}

	@Override
	public List<Actor> loadActors(String name) throws SQLException {
		Connection connection = connect();
		
		List<Actor> actors = new ArrayList<>();
		StringBuilder queryBuilder = new StringBuilder();
		PreparedStatement idStatement;
		ResultSet idResults;
		
		queryBuilder.append("SELECT actorId FROM actorData WHERE name = ?");
		idStatement = connection.prepareStatement(queryBuilder.toString());
		
		idStatement.setString(1, name);
		idResults = idStatement.executeQuery();
		while (idResults.next()) {
			actors.add(loadActor(idResults.getLong(1)));
		}
		
		if (actors.isEmpty()) {
			actors.add(new Actor(name));
		}
		
		disconnect(connection);
		
		return actors;
	}

	@Override
	public Actor loadActor(Long id) throws SQLException {
		Connection connection = connect();
		
		Actor actor = null;
		String name;
		Gender gender;
		Priority priority;
		List<ActorAttribute> attributes;
		List<String> externalUrls;
		List<KUtilsImage> images;
		
		PreparedStatement dataStatement;
		PreparedStatement attributeStatement;
		PreparedStatement imageStatement;
		ResultSet dataResults;
		ResultSet attributeResults;
		ResultSet imageResults;
		final String dataQuery;
		final String attributesQuery;
		final String imagesQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		queryBuilder.append("SELECT ad.name, g.genderName, ad.priority, ad.externalLinks FROM ActorData AS ad ");
		queryBuilder.append("INNER JOIN genders AS g ON g.genderId = ad.genderId WHERE ad.actorId = ?");
		dataQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("SELECT actorAttributeId, `key`, `value` FROM ActorAttributes WHERE actorId = ?");
		attributesQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("SELECT actorImageId, imagePath, imageHash FROM ActorImages WHERE actorId = ?");
		imagesQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		dataStatement = connection.prepareStatement(dataQuery);
		attributeStatement = connection.prepareStatement(attributesQuery);
		imageStatement = connection.prepareStatement(imagesQuery);
		
		dataStatement.setLong(1, id);
		
		dataResults = dataStatement.executeQuery();
		if (dataResults.next()) {
			name = dataResults.getString(1);
			gender = Gender.valueOf(dataResults.getString(2));
			priority = Priority.valueOf(dataResults.getString(3));
			externalUrls = new LinkedList<>();
			if (dataResults.getString(4).indexOf("|") != -1) {
				CollectionUtils.addAll(externalUrls, dataResults.getString(4).split("|"));
			} else {
				externalUrls.add(dataResults.getString(4));
			}
			
			attributeStatement.setLong(1, id);
			attributeResults = attributeStatement.executeQuery();
			
			attributes = new LinkedList<>();
			
			while(attributeResults.next()) {
				attributes.add(new ActorAttribute(attributeResults.getLong(1), attributeResults.getString(2), attributeResults.getString(3)));
			}
			
			imageStatement.setLong(1, id);
			imageResults = imageStatement.executeQuery();
			
			images = new LinkedList<>();
			KUtilsImage image;
			
			while (imageResults.next()) {
				image = new KUtilsImage(imageResults.getString(2));
				image.setId(imageResults.getLong(1));
				image.setHash(imageResults.getString(3));
				images.add(image);
			}
			
			actor = new Actor(id, name, gender, priority, attributes, images, null, externalUrls);
		}
		dataStatement.close();
		attributeStatement.close();
		imageStatement.close();
		
		disconnect(connection);
		return actor;
	}
	
	@Override
	public void saveActor(Actor actor) throws SQLException {
		Connection connection = connect();
		
		final boolean actorExists = actor.getId() != null;
		
		PreparedStatement dataStatement;
		PreparedStatement idStatement;
		PreparedStatement attributeStatement;
		PreparedStatement imageStatement;
		ResultSet idResults;
		final String dataQuery;
		final String idQuery;
		final String insertAttributeQuery;
		final String updateAttributeQuery;
		final String insertImagesQuery;
		final String updateImagesQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		if (actorExists) {
			queryBuilder.append("UPDATE ActorData SET name=?, genderId=(SELECT genderId FROM Genders WHERE genderName = ?), ");
			queryBuilder.append("priority=?, externalLinks=? WHERE actorId=?");
		} else {
			queryBuilder.append("INSERT INTO ActorData (name, genderId, priority, externalLinks) ");
			queryBuilder.append("VALUES (?, (SELECT genderId FROM Genders WHERE genderName = ?), ?, ?)");
		}
		dataQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("SELECT actorId FROM ActorData WHERE name = ? AND genderId = (SELECT genderId FROM Genders ");
		queryBuilder.append("WHERE genderName = ?) AND priority = ? AND externalLinks = ?");
		idQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("INSERT INTO ActorAttributes (actorId, `key`, `value`) VALUES (?, ?, ?)");
		insertAttributeQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("UPDATE ActorAttributes SET `key`=?, `value`=? WHERE actorId = ? AND actorAttributeId = ?");
		updateAttributeQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("INSERT INTO ActorImages (actorId, imagePath, imageHash) VALUES (?, ?, ?)");
		insertImagesQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("UPDATE ActorImages SET imagePath=?, imageHash=? WHERE actorId = ? AND actorImageId = ?");
		updateImagesQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		dataStatement = connection.prepareStatement(dataQuery);
		if (actorExists) {
			dataStatement.setString(1, actor.getName());
			dataStatement.setString(2, actor.getGender().toString());
			dataStatement.setString(3, actor.getPriority().toString());
			dataStatement.setString(4, StringUtils.join(actor.getExternalUrls(), "|"));
			dataStatement.setLong(5, actor.getId());
		} else {
			dataStatement.setString(1, actor.getName());
			dataStatement.setString(2, actor.getGender().toString());
			dataStatement.setString(3, actor.getPriority().toString());
			dataStatement.setString(4, StringUtils.join(actor.getExternalUrls(), "|"));
		}
		dataStatement.execute();
		dataStatement.close();
		
		if (!actorExists) {
			idStatement = connection.prepareStatement(idQuery);
			idStatement.setString(1, actor.getName());
			idStatement.setString(2, actor.getGender().toString());
			idStatement.setString(3, actor.getPriority().toString());
			idStatement.setString(4, StringUtils.join(actor.getExternalUrls(), "|"));
			idResults = idStatement.executeQuery();
			
			if (idResults.next()) {
				actor.setId(idResults.getLong(1));
			} else {
				return;
			}
		}
		
		for (ActorAttribute attribute : actor.getAttributes()) {
			if (attribute.getId() != null) {
				attributeStatement = connection.prepareStatement(updateAttributeQuery);
				attributeStatement.setString(1, attribute.getKey());
				attributeStatement.setString(2, attribute.getValue());
				attributeStatement.setLong(3, actor.getId());
				attributeStatement.setLong(4, attribute.getId());
			} else {
				attributeStatement = connection.prepareStatement(insertAttributeQuery);
				attributeStatement.setLong(1, actor.getId());
				attributeStatement.setString(2, attribute.getKey());
				attributeStatement.setString(3, attribute.getValue());
			}
			attributeStatement.execute();
			attributeStatement.close();
		}
		
		for (KUtilsImage image : actor.getImages()) {
			if (image.getId() != null) {
				imageStatement = connection.prepareStatement(updateImagesQuery);
				imageStatement.setString(1, image.getFilePath());
				imageStatement.setString(2, image.getHash());
				imageStatement.setLong(3, actor.getId());
				imageStatement.setLong(4, image.getId());
			} else {
				imageStatement = connection.prepareStatement(insertImagesQuery);
				imageStatement.setLong(1, actor.getId());
				imageStatement.setString(2, image.getFilePath());
				imageStatement.setString(3, image.getHash());
			}
			imageStatement.execute();
			imageStatement.close();
		}
		
		disconnect(connection);
	}
}
