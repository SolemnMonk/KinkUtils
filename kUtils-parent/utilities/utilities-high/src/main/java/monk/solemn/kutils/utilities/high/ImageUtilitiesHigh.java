package monk.solemn.kutils.utilities.high;

import java.awt.image.RenderedImage;
import java.util.List;

import monk.solemn.kutils.objects.KUtilsImage;
import monk.solemn.kutils.utilities.low.ImageUtilitiesLow;

public class ImageUtilitiesHigh {
	public static boolean imageExists(KUtilsImage newImage, List<KUtilsImage> images) {
		boolean imageExists = false;
		String hash = newImage.getHash();
		
		if (hash == null) {
			imageExists = true;
		} else {
			for (KUtilsImage image : images) {
				if (image.getHash().equals(hash)) {
					imageExists = true;
					break;
				}
			}
		}
		
		return imageExists;
	}
	
	public static boolean imageExists(RenderedImage newImage, List<KUtilsImage> images) {
		boolean imageExists = false;
		String hash = ImageUtilitiesLow.HashImage(newImage);
		
		if (hash == null) {
			imageExists = true;
		} else {
			for (KUtilsImage image : images) {
				if (image.getHash().equals(hash)) {
					imageExists = true;
					break;
				}
			}
		}
		
		return imageExists;
	}
}
