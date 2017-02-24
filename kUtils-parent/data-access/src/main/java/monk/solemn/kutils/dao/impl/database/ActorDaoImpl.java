package monk.solemn.kutils.dao.impl.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import monk.solemn.kutils.dao.ActorDao;
import monk.solemn.kutils.dao.BaseDao;
import monk.solemn.kutils.enums.Gender;
import monk.solemn.kutils.enums.Priority;
import monk.solemn.kutils.objects.Actor;
import monk.solemn.kutils.objects.ActorAttribute;
import monk.solemn.kutils.objects.KUtilsImage;

public class ActorDaoImpl extends BaseDao implements ActorDao {
	@Override
	public List<Actor> loadAllActors() throws SQLException {
		Connection connection = connect();
		
		List<Actor> actors = new LinkedList<Actor>();
		
		Actor actor;
		Long id;
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
		
		queryBuilder.append("SELECT ad.actorId, ad.name, g.genderName, ad.priority, ad.externalLinks ");
		queryBuilder.append("FROM ActorData AS ad INNER JOIN genders AS g ON g.genderId = ad.genderId");
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
		
		dataResults = dataStatement.executeQuery();
		while (dataResults.next()) {
			id = dataResults.getLong(1);
			name = dataResults.getString(2);
			gender = Gender.valueOf(dataResults.getString(3));
			priority = Priority.valueOf(dataResults.getString(4));
			externalUrls = new LinkedList<>();
			if (dataResults.getString(5).indexOf("|") != -1) {
				CollectionUtils.addAll(externalUrls, dataResults.getString(5).split("|"));
			} else {
				externalUrls.add(dataResults.getString(5));
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
			actors.add(actor);
		}
		dataStatement.close();
		attributeStatement.close();
		imageStatement.close();
		
		disconnect(connection);
		return actors;
	}

	@Override
	public List<Actor> loadActorById(String id) {
		return null;
	}

	@Override
	public List<Actor> loadActorsByName(String name) {
		return null;
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
