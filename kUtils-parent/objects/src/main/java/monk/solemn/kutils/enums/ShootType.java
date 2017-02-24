package monk.solemn.kutils.enums;

public enum ShootType {
	Video("Video"),
	Images("Images"),
	VideoAndImages("VideoAndImages"),
	Unknown("Unknown");
	
	private final String shootTypeString;
	
	ShootType(String shootTypeString) {
		this.shootTypeString = shootTypeString;
	}

	@Override
	public String toString() {
		return shootTypeString;
	}
}
