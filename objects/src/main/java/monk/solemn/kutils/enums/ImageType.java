package monk.solemn.kutils.enums;

public enum ImageType {
	Cover("cover"),
	Preview("preview"),
	Actor("actor");
	
	private final String imageTypeName;
	
	ImageType(String imageTypeName) {
		this.imageTypeName = imageTypeName; 
	}
	
	@Override
	public String toString() {
		return imageTypeName;
	}
}
