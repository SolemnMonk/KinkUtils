package monk.solemn.kutils.enums;

public enum Target {
	Network("Network"),
	Site("Site"),
	Series("Series"),
	Shoot("Shoot"),
	Actor("Actor"),
	Movie("Movie"),
	Scene("Scene");
	
	String targetString;
	
	Target(String targetString) {
		this.targetString = targetString;
	}
	
	@Override
	public String toString() {
		return targetString;
	}
}
