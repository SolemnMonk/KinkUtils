package monk.solemn.kutils.objects;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Reference;

import monk.solemn.kutils.utils.low.ImageUtilitiesLow;

//TODO Add something to check if an image is still on disk
public class KUtilsImage {
	private static String basePath = ".";
	private static ImageUtilitiesLow imageUtilsLow;
	
	private Long id;
	private String filePath;
	private Image image;
	private String hash;
	private boolean imageIsSaved;
	
	@Reference
	public void bindImageUtilsLow(ImageUtilitiesLow imageUtilsLow) {
		KUtilsImage.imageUtilsLow = imageUtilsLow;
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
			hash = imageUtilsLow.HashImage((RenderedImage) this.image);
		} catch (IOException e) {
			return false;
		} catch (IllegalArgumentException e) {
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
		imageFile = Paths.get(basePath, filePath).toFile();
		Paths.get(imageFile.getPath()).getParent().toFile().mkdirs();

		try {
			ImageIO.write((BufferedImage) image, "png", imageFile);
		} catch (IOException e) {
			return false;
		} catch (IllegalArgumentException e) {
			return false;
		}

		if (unloadAfterSave) {
			unloadImage();
		}

		imageIsSaved = true;
		return true;
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

		if (!imageIsSaved) {
			boolean saved = false;
			saved = saveImage(false);
			if (saved) {
				hash = imageUtilsLow.HashImage((RenderedImage) this.image);
			}
		}
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public static String getBasePath() {
		return basePath;
	}

	public static void setBasePath(String basePath) {
		KUtilsImage.basePath = basePath;
	}
}
