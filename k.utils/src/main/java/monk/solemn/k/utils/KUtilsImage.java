package monk.solemn.k.utils;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class KUtilsImage {
	private static final Logger logger = LogManager.getLogger(KUtilsImage.class);

	private Long id;
	private String filePath;
	private Image image;
	private String hash;
	private boolean imageIsSaved;

	public KUtilsImage() {
	}

	public KUtilsImage(String filePath) {
		this.filePath = filePath;
	}

	public boolean loadImage() {
		if (StringUtils.isBlank(filePath)) {
			return false;
		}

		File imageFile = new File(filePath);

		try {
			image = ImageIO.read(imageFile);
			hashImage();
		} catch (IOException e) {
			logger.error(e.getStackTrace());
			return false;
		} catch (IllegalArgumentException e) {
			logger.error(e.getStackTrace());
			return false;
		}

		return true;
	}

	public void unloadImage() {
		image = null;
	}

	public boolean saveImage() {
		return saveImage(false);
	}

	public boolean saveImage(boolean unloadAfterSave) {
		if (StringUtils.isBlank(filePath)) {
			return false;
		}

		File imageFile;
		try {
			imageFile = Paths.get(WicketApplication.getConfigDao().loadConfig("basePath"), filePath).toFile();
			Paths.get(imageFile.getPath()).getParent().toFile().mkdirs();
		} catch (SQLException e1) {
			logger.error(e1.getStackTrace());
			return false;
		}

		try {
			ImageIO.write((BufferedImage) image, "png", imageFile);
		} catch (IOException e) {
			logger.error(e.getStackTrace());
			return false;
		} catch (IllegalArgumentException e) {
			logger.error(e.getStackTrace());
			return false;
		}

		if (unloadAfterSave) {
			unloadImage();
		}

		imageIsSaved = true;
		return true;
	}

	private void hashImage() {
		if (!imageIsSaved) {
			boolean saved = saveImage();
			if (!saved) {
				return;
			}
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-512");
			messageDigest.update(Files.readAllBytes(Paths.get(WicketApplication.getConfigDao().loadConfig("basePath"), filePath)));
	
			byte[] hashBytes = messageDigest.digest();
			StringBuilder hashString = new StringBuilder();
			for (byte b : hashBytes) {
				hashString.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
			}
			
			hash = hashString.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("KUtilsImage [filePath=");
		builder.append(filePath);
		builder.append(", hash=");
		builder.append(hash);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((filePath == null) ? 0 : filePath.hashCode());
		result = prime * result + ((hash == null) ? 0 : hash.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		KUtilsImage other = (KUtilsImage) obj;
		if (filePath == null) {
			if (other.filePath != null)
				return false;
		} else if (!filePath.equals(other.filePath))
			return false;
		if (hash == null) {
			if (other.hash != null)
				return false;
		} else if (!hash.equals(other.hash))
			return false;
		return true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
		hashImage();
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}
}
