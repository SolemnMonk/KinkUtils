package monk.solemn.kutils.enums;

public enum ContentType {
	VIDEOS("Video"),
	IMAGES("Images"),
	TEXT("Text"),
	UNKNOWN("Unknown");
	
	private String typeString;
	
	ContentType(String typeString) {
		this.typeString = typeString;
	}
	
	@Override
	public String toString() {
		return typeString;
	}
}
