package monk.solemn.kutils.enums;

public enum MetadataType {
	CONTENT_TYPE("Content Type"),
	TITLE("Title"),
	DESCRIPTION("Description"),
	DATE("Date"),
	TAG("Tag"),
	RATING("Rating"),
	ACTOR("Actor"),
	IMAGE("Image"),
	EXTERNAL_URL("External URL");

	String actionString;
	
	MetadataType(String actionString) {
		this.actionString = actionString;
	}
	
	@Override
	public String toString() {
		return actionString;
	}
}
