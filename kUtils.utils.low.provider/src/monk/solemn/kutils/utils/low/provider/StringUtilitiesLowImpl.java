package monk.solemn.kutils.utils.low.provider;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.SystemUtils;
import org.apache.commons.lang.WordUtils;
import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.utils.low.StringUtilitiesLow;


@Component(service=StringUtilitiesLow.class,
		   immediate=true)
public class StringUtilitiesLowImpl implements StringUtilitiesLow {
	@Override
	public String sanitizeForPathName(String string) {
		if (StringUtils.isNotBlank(string)) {
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
		}		
		return string;
	}
	
	@Override
	public String normalizeString(String string) {
		string = string.replaceAll("\\s+", " ");
		string = string.replaceAll(" {2,}", " ");
		
		string = WordUtils.capitalizeFully(string).trim();
		string.replaceAll("\\.{2,}$", "…");
		string.replaceAll("\\.$", "");
		
		return string;
	}
}
