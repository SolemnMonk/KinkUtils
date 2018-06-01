package monk.solemn.kutils.utils.low;

import java.awt.image.RenderedImage;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface ImageUtilitiesLow {
	public String HashImage(RenderedImage image);
}
