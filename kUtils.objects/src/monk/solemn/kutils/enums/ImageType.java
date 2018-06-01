package monk.solemn.kutils.enums;

public enum ImageType {
	COVER("cover"),
	PREVIEW("preview"),
	ACTOR("actor");
	
	private final String imageTypeName;
	
	ImageType(String imageTypeName) {
		this.imageTypeName = imageTypeName; 
	}
	
	@Override
	public String toString() {
		return imageTypeName;
	}
}
