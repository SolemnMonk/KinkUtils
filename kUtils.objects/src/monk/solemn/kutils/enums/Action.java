package monk.solemn.kutils.enums;

public enum Action {
	Rip("Rip"),
	Download("Download"),
	GatherData("Gather Metadata"),
	Monitor("Monitor");

	String actionString;
	
	Action(String actionString) {
		this.actionString = actionString;
	}
	
	@Override
	public String toString() {
		return actionString;
	}
}
