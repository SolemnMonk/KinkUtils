package monk.solemn.kutils.objects;

import java.io.File;

import monk.solemn.kutils.enums.ContentType;

public abstract class DownloadTicket {
	protected File tempDirectory;
	protected ContentType contentType;
	protected String pluginKey;
	
	public File getTempDirectory() {
		return tempDirectory;
	}

	public ContentType getContentType() {
		return contentType;
	}

	public String getPluginKey() {
		return pluginKey;
	}

	@Override
	public String toString() {
		return "DownloadTicket [tempDirectory=" + tempDirectory + ", contentType=" + contentType + ", pluginKey="
				+ pluginKey + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((contentType == null) ? 0 : contentType.hashCode());
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
		DownloadTicket other = (DownloadTicket) obj;
		if (contentType != other.contentType)
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
}
