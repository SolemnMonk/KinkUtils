package monk.solemn.kutils.enums;

public enum Target {
	SITE("Site"),
	SEARCH("Search"),
	CHANNEL("Channel"),
	ITEM("Item"),
	BUNDLE("Bundle");
	
	String targetString;
	
	Target(String targetString) {
		this.targetString = targetString;
	}
	
	@Override
	public String toString() {
		return targetString;
	}
}
