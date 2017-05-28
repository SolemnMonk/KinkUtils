package monk.solemn.kutils.utilities.low;

import org.apache.commons.lang3.SystemUtils;
import org.apache.commons.lang3.text.WordUtils;

public class StringUtilitiesLow {
	public static String sanitizeForPathName(String string) {
		if (SystemUtils.IS_OS_WINDOWS) {
			string = string.replaceAll("[<>:\"/\\|?*]+", "_");
			string = string.replaceAll("_{2,}", "_");
		} else {
			string = string.replaceAll("/", "_");
			string = string.replaceAll("_{2,}", "_");
		}
		
		string = string.trim();
		
		string = string.replaceAll("\\.{2,}$", "…");
		string = string.replaceAll("\\.$", "");
		
		if (string.length() > 64) {
			string = string.substring(0, 64) + "…";
		}
		
		return string;
	}
	
	public static String normalizeString(String string) {
		string = string.replaceAll("\\s+", " ");
		string = string.replaceAll(" {2,}", " ");
		
		string = WordUtils.capitalizeFully(string).trim();
		string.replaceAll("\\.{2,}$", "…");
		string.replaceAll("\\.$", "");
		
		return string;
	}
	
	public static String makeUnique(String string) {
		return string + " [" + System.currentTimeMillis() + "]";
	}
}
