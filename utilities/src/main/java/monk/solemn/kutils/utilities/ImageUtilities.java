package monk.solemn.kutils.utilities;

import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.ArrayUtils;

public class ImageUtilities {
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
			return HashBytes(imageBytes);
		}
	}
	
	private static String HashBytes(byte[] imageBytes) {
		String hash = null;
		MessageDigest messageDigest = null;
		
		try {
			messageDigest = MessageDigest.getInstance("SHA-512");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}

		messageDigest.update(imageBytes);
		
		byte[] hashBytes = messageDigest.digest();
		StringBuilder hashString = new StringBuilder();
		for (byte b : hashBytes) {
			hashString.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
		}
		
		hash = hashString.toString();
		
		return hash;
	}
}
