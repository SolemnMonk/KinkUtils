package monk.solemn.kutils.objects;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import monk.solemn.kutils.enums.ContentType;

public class BundleDownloadTicket extends DownloadTicket {
	private List<String> itemUrls;
	
	public BundleDownloadTicket(ContentType contentType, String pluginKey, List<String> itemUrls, File tempDirectory) {
		super();
		this.contentType = contentType;
		this.pluginKey = pluginKey;
		this.itemUrls = itemUrls;
		this.tempDirectory = tempDirectory;
	}

	public static BundleDownloadTicket clone(BundleDownloadTicket original) {
		return original.clone();
	}

	public BundleDownloadTicket clone() {
		List<String> urlsClone = new ArrayList<>();
		for (String url : this.itemUrls) {
			urlsClone.add(url);
		}
		
		BundleDownloadTicket clone = new BundleDownloadTicket(this.contentType, this.pluginKey, urlsClone, this.tempDirectory);
		
		return clone;
	}

	@Override
	public String toString() {
		return "BundleDownloadTicket [itemUrls=" + itemUrls + ", tempDirectory=" + tempDirectory + ", contentType="
				+ contentType + ", pluginKey=" + pluginKey + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((itemUrls == null) ? 0 : itemUrls.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		BundleDownloadTicket other = (BundleDownloadTicket) obj;
		if (itemUrls == null) {
			if (other.itemUrls != null)
				return false;
		} else if (!itemUrls.equals(other.itemUrls))
			return false;
		return true;
	}

	public List<String> getItemUrls() {
		return itemUrls;
	}
}
