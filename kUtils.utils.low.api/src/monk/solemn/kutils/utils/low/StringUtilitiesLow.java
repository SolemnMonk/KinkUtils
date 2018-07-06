package monk.solemn.kutils.utils.low;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface StringUtilitiesLow {
	public String sanitizeForPathName(String string);
	
	public String normalizeString(String string);
}
