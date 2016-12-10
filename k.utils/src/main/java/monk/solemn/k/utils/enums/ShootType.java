package monk.solemn.k.utils.enums;

public enum ShootType {
	Video("Video"),
	Images("Images"),
	VideoAndImages("Video & Images"),
	Unknown("Unknown Shoot Type");
	
	private final String shootTypeString;
	
	ShootType(String shootTypeString) {
		this.shootTypeString = shootTypeString;
	}

	@Override
	public String toString() {
		return shootTypeString;
	}
}
