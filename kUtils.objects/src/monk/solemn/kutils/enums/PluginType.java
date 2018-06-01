package monk.solemn.kutils.enums;

public enum PluginType {
	CONTENT_GATHERER("Content Gatherer"),
	DATA_PROVIDER("Data Provider");
	
	String typeString;
	
	PluginType(String typeString) {
		this.typeString = typeString;
	}
	
	@Override
	public String toString() {
		return typeString;
	}
}
