package monk.solemn.kutils.objects;

import java.util.LinkedList;
import java.util.List;

import monk.solemn.kutils.enums.Gender;

public class Actor {
	private Long id;
	private String name;
	private Gender gender = Gender.UNKNOWN;
	private List<ActorAttribute> attributes;
	private List<Entity> entities;
	private List<String> externalUrls;
	
	public Actor(String name) {
		this.name = name;
	}

	public Actor(String name, Gender gender) {
		this.name = name;
		this.gender = gender;
	}

	public Actor(Long id, String name, Gender gender, List<ActorAttribute> attributes, List<Entity> entities, List<String> externalUrls) {
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.attributes = attributes;
		this.entities = entities;
		this.externalUrls = externalUrls;
	}

	public void addAttribute(String key, String value) {
		if (attributes == null) {
			attributes = new LinkedList<>();
		}
		attributes.add(new ActorAttribute(key, value));
	}
	
	public void editAttribute(String key, String value) {
		if (attributes == null) {
			attributes = new LinkedList<>();
		}
		attributes.add(new ActorAttribute(key, value));
	}
	
	public void removeAttribute(ActorAttribute attribute) {
		if (attributes != null) {
			attributes.remove(attribute);
		}
	}
	
	public void addEntity(Entity entity) {
		if (entities == null) {
			entities = new LinkedList<>();
		}
		entities.add(entity);
	}
	
	public void removeEntity(Entity entity) {
		if (entities != null) {
			entities.remove(entity);
		}
	}

	public void addExternalUrl(String externalUrl) {
		if (externalUrls == null) {
			externalUrls = new LinkedList<>();
		}
		externalUrls.add(externalUrl);
	}
	
	public void removeExternalUrl(String externalUrl) {
		if (externalUrls != null) {
			externalUrls.remove(externalUrl);
		}
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Actor [id=");
		builder.append(id);
		builder.append(", name=");
		builder.append(name);
		builder.append(", gender=");
		builder.append(gender);
		builder.append(", attributes=");
		builder.append(attributes);
		builder.append(", externalUrls=");
		builder.append(externalUrls);
		builder.append("]");
		return builder.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((attributes == null) ? 0 : attributes.hashCode());
		result = prime * result + ((externalUrls == null) ? 0 : externalUrls.hashCode());
		result = prime * result + ((gender == null) ? 0 : gender.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
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
		Actor other = (Actor) obj;
		if (attributes == null) {
			if (other.attributes != null)
				return false;
		} else if (!attributes.equals(other.attributes))
			return false;
		if (externalUrls == null) {
			if (other.externalUrls != null)
				return false;
		} else if (!externalUrls.equals(other.externalUrls))
			return false;
		if (gender != other.gender)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public List<ActorAttribute> getAttributes() {
		if (attributes == null) {
			attributes = new LinkedList<>();
		}
		
		return attributes;
	}

	public void setAttributes(List<ActorAttribute> attributes) {
		this.attributes = attributes;
	}

	public List<Entity> getEntities() {
		if (entities == null) {
			entities = new LinkedList<>();
		}
		
		return entities;
	}

	public void setEntities(List<Entity> entities) {
		this.entities = entities;
	}

	public List<String> getExternalUrls() {
		if (externalUrls == null) {
			externalUrls = new LinkedList<>();
		}
		
		return externalUrls;
	}

	public void setExternalUrls(List<String> externalUrls) {
		this.externalUrls = externalUrls;
	}
}