package monk.solemn.kutils.dao.impl.database;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import monk.solemn.kutils.dao.BaseDao;
import monk.solemn.kutils.dao.ShootDao;
import monk.solemn.kutils.enums.ImageType;
import monk.solemn.kutils.enums.ShootType;
import monk.solemn.kutils.objects.KUtilsImage;
import monk.solemn.kutils.objects.Rating;
import monk.solemn.kutils.objects.Shoot;

public class ShootDaoImpl extends BaseDao implements ShootDao {

	@Override
	public List<Shoot> loadAllShoots() throws SQLException {
		Connection connection = connect();
		
		List<Shoot> shoots = new LinkedList<>();
		
		PreparedStatement idStatement;
		ResultSet idResults;
		final String idQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		queryBuilder.append("SELECT shootId FROM shootData ORDER BY shootId");
		idQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		idStatement = connection.prepareStatement(idQuery);
		
		idResults = idStatement.executeQuery();
		while (idResults.next()) {
			shoots.add(loadShoot(idResults.getLong(1)));
		}
		idStatement.close();
		
		disconnect(connection);
		return shoots;
	}

	@Override
	public Shoot loadShoot(String title) throws SQLException {
		Connection connection = connect();
		
		Shoot shoot = null;
		StringBuilder queryBuilder = new StringBuilder();
		PreparedStatement idStatement;
		ResultSet idResults;
		
		queryBuilder.append("SELECT shootId FROM shootData WHERE title = ? LIMIT 1");
		idStatement = connection.prepareStatement(queryBuilder.toString());
		
		idStatement.setString(1, title);
		idResults = idStatement.executeQuery();
		if (idResults.next()) {
			shoot = loadShoot(idResults.getLong(1));
		}

		disconnect(connection);
		
		return shoot;
	}
	
	@Override
	public Shoot loadShoot(Long id) throws SQLException {
		Shoot shoot = loadShootData(id);
		loadShootPreviewImages(id, shoot);
		
		return shoot;
	}
	
	@Override
	public Shoot loadShootData(Long id) throws SQLException {
		Connection connection = connect();
		
		Shoot shoot = null;
		
		String site;
		ShootType shootType;
		String title;
		String description;
		Calendar date;
		List<String> tags;
		int numRatings;
		Double avgRating;
		Rating rating;
		String externalUrl;
		
		PreparedStatement dataStatement;
		ResultSet dataResults;
		final String dataQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		queryBuilder.append("SELECT (SELECT siteDisplayName FROM sites WHERE sites.siteId = shootData.siteId) AS site, ");
		queryBuilder.append("(SELECT shootTypeName FROM shootTypes WHERE shootTypes.shootTypeId = shootData.shootTypeId) AS shootType, ");
		queryBuilder.append("title, description, date, tags, numRatings, rating, externalUrl FROM shootData WHERE shootId = ?");
		dataQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		dataStatement = connection.prepareStatement(dataQuery);
		
		dataStatement.setLong(1, id);
		
		dataResults = dataStatement.executeQuery();
		if (dataResults.next()) {
			site = dataResults.getString(1);
			shootType = ShootType.valueOf(dataResults.getString(2));
			title = dataResults.getString(3);
			description = dataResults.getString(4);
			date = Calendar.getInstance();
			date.setTime(dataResults.getDate(5));
			tags = Arrays.asList(dataResults.getString(6).split("|"));
			numRatings = dataResults.getInt(7);
			avgRating = (double) dataResults.getInt(8);
			rating = new Rating(avgRating, numRatings);
			externalUrl = dataResults.getString(9);
			
			shoot = new Shoot(site, shootType, title, description, date, tags, rating, null, null, null, externalUrl, null);
			shoot.setId(id);
		}
		dataStatement.close();

		disconnect(connection);
		
		return shoot;
	}

	@Override
	public void loadShootPreviewImages(Long id, Shoot shoot) throws SQLException {
		Connection connection = connect();
		
		PreparedStatement imageStatement;
		ResultSet imageResults;
		final String imagesQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		queryBuilder.append("SELECT imageId, (SELECT imageTypeName FROM ShootImageTypes WHERE imageTypeId = shootImageTypeId), imagePath, ");
		queryBuilder.append("imageHash FROM shootImages WHERE shootId = ? ORDER BY imageId");
		imagesQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		imageStatement = connection.prepareStatement(imagesQuery);

		imageStatement.setLong(1, id);
		
		imageResults = imageStatement.executeQuery();
		
		String imageType;
		KUtilsImage image;
		Long imageId;
		while (imageResults.next()) {
			imageId = imageResults.getLong(1);
			imageType = imageResults.getString(2);
			image = new KUtilsImage(imageResults.getString(3));
			image.setId(imageId);
			image.setHash(imageResults.getString(4));
			if (ImageType.valueOf(imageType) == ImageType.Cover) {
				shoot.setCoverImage(image);
			} else if (ImageType.valueOf(imageType) == ImageType.Preview) {
				shoot.addPreviewImage(image);
			}
		}
		imageStatement.close();
		
		disconnect(connection);
	}
	
	@Override
	public void saveShoot(Shoot shoot) throws SQLException {
		Connection connection = connect();
		
		final boolean shootExists = shoot.getId() != null;
		
		PreparedStatement dataStatement;
		PreparedStatement idStatement;
		PreparedStatement imageStatement;
		ResultSet idResults;
		final String dataQuery;
		final String idQuery;
		final String insertImageQuery;
		final String updateImageQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		if (shootExists) {
			queryBuilder.append("UPDATE shootData SET siteId=(SELECT siteId FROM sites WHERE ");
			queryBuilder.append("sites.siteDisplayName = ?), shootTypeId=(SELECT shootTypeId FROM ");
			queryBuilder.append("shootTypes WHERE shootTypes.shootTypeName = ?), title=?, description=?, ");
			queryBuilder.append("date=?, tags=?, numRatings=?, rating=?, externalUrl=? WHERE shootId = ?");
		} else {
			queryBuilder.append("INSERT INTO shootData (siteId, shootTypeId, title, description, date, ");
			queryBuilder.append("tags, numRatings, rating, externalUrl) VALUES ((SELECT siteId FROM sites ");
			queryBuilder.append("WHERE sites.siteDisplayName = ?), (SELECT shootTypeId FROM shootTypes ");
			queryBuilder.append("WHERE shootTypes.shootTypeName = ?), ?, ?, ?, ?, ?, ?, ?)");
		}
		dataQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("SELECT shootId FROM shootData WHERE siteId = (SELECT siteId FROM sites WHERE ");
		queryBuilder.append("sites.siteDisplayName = ?) AND shootTypeId = (SELECT shootTypeId FROM shootTypes ");
		queryBuilder.append("WHERE shootTypes.shootTypeName = ?) AND title = ? AND description = ? AND ");
		queryBuilder.append("date = ? AND tags = ? AND numRatings = ? AND rating = ? AND externalUrl = ?");
		idQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("INSERT INTO shootImages (shootImageTypeId, shootId, imagePath, imageHash) VALUES (");
		queryBuilder.append("(SELECT imageTypeId FROM shootImageTypes WHERE imageTypeName = ?), ?, ?, ?)");
		insertImageQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		queryBuilder.append("UPDATE shootImages SET shootImageTypeId=(SELECT imageTypeId FROM shootImageTypes WHERE ");
		queryBuilder.append("imageTypeName = ?), shootId=?, imagePath=?, imageHash=? WHERE imageId = ?");
		updateImageQuery = queryBuilder.toString();
		queryBuilder.setLength(0);
		
		dataStatement = connection.prepareStatement(dataQuery);
		if (shootExists) {
			dataStatement.setString(1, shoot.getSite());
			dataStatement.setString(2, shoot.getShootType().toString());
			dataStatement.setString(3, shoot.getTitle());
			dataStatement.setString(4, shoot.getDescription());
			dataStatement.setDate(5, new Date(shoot.getDate().getTime().getTime()));
			dataStatement.setString(6, StringUtils.join(shoot.getTags(), "|"));
			dataStatement.setInt(7, shoot.getRating().getNumRatings());
			dataStatement.setInt(8, shoot.getRating().getAvgRating().intValue());
			dataStatement.setString(9, shoot.getExternalUrl());
			dataStatement.setLong(10, shoot.getId());
		} else {
			dataStatement.setString(1, shoot.getSite());
			dataStatement.setString(2, shoot.getShootType().toString());
			dataStatement.setString(3, shoot.getTitle());
			dataStatement.setString(4, shoot.getDescription());
			dataStatement.setDate(5, new Date(shoot.getDate().getTime().getTime()));
			dataStatement.setString(6, StringUtils.join(shoot.getTags(), "|"));
			dataStatement.setInt(7, shoot.getRating().getNumRatings());
			dataStatement.setInt(8, shoot.getRating().getAvgRating().intValue());
			dataStatement.setString(9, shoot.getExternalUrl());
		}
		dataStatement.execute();
		dataStatement.close();
		
		if (!shootExists) {
			idStatement = connection.prepareStatement(idQuery);
			idStatement.setString(1, shoot.getSite());
			idStatement.setString(2, shoot.getShootType().toString());
			idStatement.setString(3, shoot.getTitle());
			idStatement.setString(4, shoot.getDescription());
			idStatement.setDate(5, new Date(shoot.getDate().getTime().getTime()));
			idStatement.setString(6, StringUtils.join(shoot.getTags(), "|"));
			idStatement.setInt(7, shoot.getRating().getNumRatings());
			idStatement.setInt(8, shoot.getRating().getAvgRating().intValue());
			idStatement.setString(9, shoot.getExternalUrl());
			idResults = idStatement.executeQuery();
			
			if (idResults.next()) {
				shoot.setId(idResults.getLong(1));
			} else {
				return;
			}
		}
		
		if (shoot.getCoverImage().getId() != null) {
			imageStatement = connection.prepareStatement(updateImageQuery);
			imageStatement.setString(1, ImageType.Cover.toString());
			imageStatement.setLong(2, shoot.getId());
			imageStatement.setString(3, shoot.getCoverImage().getFilePath());
			imageStatement.setString(4, shoot.getCoverImage().getHash());
			imageStatement.setLong(5, shoot.getCoverImage().getId());
		} else {
			imageStatement = connection.prepareStatement(insertImageQuery);
			imageStatement.setString(1, ImageType.Cover.toString());
			imageStatement.setLong(2, shoot.getId());
			imageStatement.setString(3, shoot.getCoverImage().getFilePath());
			imageStatement.setString(4, shoot.getCoverImage().getHash());
		}
		imageStatement.execute();
		imageStatement.close();
		
		for (KUtilsImage image : shoot.getPreviewImages()) {
			if (image.getId() != null) {
				imageStatement = connection.prepareStatement(updateImageQuery);
				imageStatement.setString(1, ImageType.Preview.toString());
				imageStatement.setLong(2, shoot.getId());
				imageStatement.setString(3, image.getFilePath());
				imageStatement.setString(4, image.getHash());
				imageStatement.setLong(5, image.getId());
			} else {
				imageStatement = connection.prepareStatement(insertImageQuery);
				imageStatement.setString(1, ImageType.Preview.toString());
				imageStatement.setLong(2, shoot.getId());
				imageStatement.setString(3, image.getFilePath());
				imageStatement.setString(4, image.getHash());
			}
			imageStatement.execute();
			imageStatement.close();
		}
		
		disconnect(connection);
	}

}
