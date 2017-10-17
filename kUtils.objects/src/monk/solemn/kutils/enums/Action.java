package monk.solemn.kutils.enums;

public enum Action {
	RIP("Rip"),
	DOWNLOAD("Download"),
	GATHER_DATA("Gather Metadata"),
	MONITOR("Monitor");

	String actionString;
	
	Action(String actionString) {
		this.actionString = actionString;
	}
	
	@Override
	public String toString() {
		return actionString;
	}
}
