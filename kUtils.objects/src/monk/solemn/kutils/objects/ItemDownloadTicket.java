package monk.solemn.kutils.objects;

import java.io.File;

import monk.solemn.kutils.enums.ContentType;

public class ItemDownloadTicket {
	private File tempDirectory;
	private ContentType contentType;
	private String pluginKey;
	private String itemUrl;
	
	public ItemDownloadTicket(ContentType contentType, String pluginKey, String itemUrl, File tempDirectory) {
		super();
		this.contentType = contentType;
		this.pluginKey = pluginKey;
		this.itemUrl = itemUrl;
		this.tempDirectory = tempDirectory;
	}

	public static ItemDownloadTicket clone(ItemDownloadTicket original) {
		return original.clone();
	}

	public ItemDownloadTicket clone() {
		ItemDownloadTicket clone = new ItemDownloadTicket(this.contentType, this.pluginKey, this.itemUrl, this.tempDirectory);
		
		return clone;
	}
	
	@Override
	public String toString() {
		return "ItemDownloadTicket [tempDirectory=" + tempDirectory + ", contentType=" + contentType + ", pluginKey="
				+ pluginKey + ", itemUrl=" + itemUrl + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((contentType == null) ? 0 : contentType.hashCode());
		result = prime * result + ((itemUrl == null) ? 0 : itemUrl.hashCode());
		result = prime * result + ((pluginKey == null) ? 0 : pluginKey.hashCode());
		result = prime * result + ((tempDirectory == null) ? 0 : tempDirectory.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ItemDownloadTicket other = (ItemDownloadTicket) obj;
		if (contentType != other.contentType)
			return false;
		if (itemUrl == null) {
			if (other.itemUrl != null)
				return false;
		} else if (!itemUrl.equals(other.itemUrl))
			return false;
		if (pluginKey == null) {
			if (other.pluginKey != null)
				return false;
		} else if (!pluginKey.equals(other.pluginKey))
			return false;
		if (tempDirectory == null) {
			if (other.tempDirectory != null)
				return false;
		} else if (!tempDirectory.equals(other.tempDirectory))
			return false;
		return true;
	}

	public File getTempDirectory() {
		return tempDirectory;
	}

	public ContentType getContentType() {
		return contentType;
	}

	public String getPluginKey() {
		return pluginKey;
	}

	public String getItemUrl() {
		return itemUrl;
	}
}
