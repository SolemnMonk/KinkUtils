package monk.solemn.kutils.objects;

import java.io.File;

import monk.solemn.kutils.enums.ContentType;

public class ItemDownloadTicket extends DownloadTicket {
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
		return "ItemDownloadTicket [itemUrl=" + itemUrl + ", tempDirectory=" + tempDirectory + ", contentType="
				+ contentType + ", pluginKey=" + pluginKey + "]";
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((itemUrl == null) ? 0 : itemUrl.hashCode());
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
		ItemDownloadTicket other = (ItemDownloadTicket) obj;
		if (itemUrl == null) {
			if (other.itemUrl != null)
				return false;
		} else if (!itemUrl.equals(other.itemUrl))
			return false;
		return true;
	}

	public String getItemUrl() {
		return itemUrl;
	}
}
