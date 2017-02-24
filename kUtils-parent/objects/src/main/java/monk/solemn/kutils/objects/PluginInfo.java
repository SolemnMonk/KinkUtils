package monk.solemn.kutils.objects;

import java.util.List;

import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.enums.PluginType;

public class PluginInfo {
	String name;
	PluginType type;
	String description;
	String version;
	List<ContentType> contentTypes;
	List<Task> tasks;
	
	public PluginInfo() {
		
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("PluginInfo [name=");
		builder.append(name);
		builder.append(", type=");
		builder.append(type);
		builder.append(", description=");
		builder.append(description);
		builder.append(", version=");
		builder.append(version);
		builder.append(", contentTypes=");
		builder.append(contentTypes);
		builder.append(", tasks=");
		builder.append(tasks);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((contentTypes == null) ? 0 : contentTypes.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((tasks == null) ? 0 : tasks.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		result = prime * result + ((version == null) ? 0 : version.hashCode());
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
		PluginInfo other = (PluginInfo) obj;
		if (contentTypes == null) {
			if (other.contentTypes != null)
				return false;
		} else if (!contentTypes.equals(other.contentTypes))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (tasks == null) {
			if (other.tasks != null)
				return false;
		} else if (!tasks.equals(other.tasks))
			return false;
		if (type != other.type)
			return false;
		if (version == null) {
			if (other.version != null)
				return false;
		} else if (!version.equals(other.version))
			return false;
		return true;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public PluginType getType() {
		return type;
	}

	public void setType(PluginType type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public List<ContentType> getContentTypes() {
		return contentTypes;
	}

	public void setContentTypes(List<ContentType> contentTypes) {
		this.contentTypes = contentTypes;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
}
