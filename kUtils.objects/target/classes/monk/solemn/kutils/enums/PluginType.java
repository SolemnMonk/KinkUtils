package monk.solemn.kutils.enums;

public enum PluginType {
	Network("Network"),
	Site("Site"),
	Ui("UI"),
	DataProvider("Data Provider");
	
	String typeString;
	
	PluginType(String typeString) {
		this.typeString = typeString;
	}
	
	@Override
	public String toString() {
		return typeString;
	}
}
