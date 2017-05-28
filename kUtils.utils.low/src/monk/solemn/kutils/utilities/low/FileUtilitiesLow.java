package monk.solemn.kutils.utilities.low;

import java.io.File;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.io.FileUtils;

public class FileUtilitiesLow {
	public static String hashFile(File file) throws IOException {
		if (file == null || !file.exists()) {
			return null;
		} else {
			return hashBytes(FileUtils.readFileToByteArray(file));
		}
	}

	public static String hashBytes(byte[] bytes) {
		String hash = null;
		MessageDigest messageDigest = null;

		try {
			messageDigest = MessageDigest.getInstance("SHA-512");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}

		messageDigest.update(bytes);

		byte[] hashBytes = messageDigest.digest();
		StringBuilder hashString = new StringBuilder();
		for (byte b : hashBytes) {
			hashString.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
		}

		hash = hashString.toString();

		return hash;
	}
}
