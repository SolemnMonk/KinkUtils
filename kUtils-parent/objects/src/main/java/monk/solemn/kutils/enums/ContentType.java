package monk.solemn.kutils.enums;

public enum ContentType {
	Videos("Video"),
	Images("Images"),
	Text("Text");
	
	private String typeString;
	
	ContentType(String typeString) {
		this.typeString = typeString;
	}
	
	@Override
	public String toString() {
		return typeString;
	}
}
