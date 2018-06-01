package monk.solemn.kutils.utils.low;

import java.io.File;
import java.io.IOException;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface FileUtilitiesLow {
	public String hashFile(File file) throws IOException;

	public String hashBytes(byte[] bytes);
}
