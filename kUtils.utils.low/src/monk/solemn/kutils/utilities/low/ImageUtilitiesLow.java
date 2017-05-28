package monk.solemn.kutils.utilities.low;

import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.ArrayUtils;

public class ImageUtilitiesLow {
	public static String HashImage(RenderedImage image) {
		byte[] imageBytes = null;
		
		try (ByteArrayOutputStream hashOutput = new ByteArrayOutputStream()) {
			ImageIO.write(image, "png", hashOutput);
			imageBytes = hashOutput.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		
		if (ArrayUtils.isEmpty(imageBytes)) {
			return null;
		} else {
			return FileUtilitiesLow.hashBytes(imageBytes);
		}
	}
}
