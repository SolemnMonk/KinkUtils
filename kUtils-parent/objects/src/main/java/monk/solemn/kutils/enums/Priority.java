package monk.solemn.kutils.enums;

public enum Priority {
	Lowest("Lowest"),
	Low("Low"),
	Neutral("Neutral"),
	High("High"),
	Highest("Highest");
	
	private final String priorityString;
	
	Priority(String priorityString) {
		this.priorityString = priorityString;
	}
	
	@Override
	public String toString() {
		return priorityString;
	}
}
