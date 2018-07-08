package monk.solemn.kutils.enums;

public enum EntityClass {
	SITE("Site", true),
	SEARCH("Search", true),
	CHANNEL("Channel", true),
	BUNDLE("Bundle", false),
	ITEM("Item", false),
	CUSTOM("Custom", true);
	
	private String targetString;
	private boolean isAbstract;
	
	EntityClass(String targetString, boolean isAbstract) {
		this.targetString = targetString;
		this.isAbstract = isAbstract;
	}
	
	@Override
	public String toString() {
		return targetString;
	}

	public boolean isAbstract() {
		return isAbstract;
	}
}
