package monk.solemn.kutils.enums;

public enum Gender {
	MALE("Male"),
	FEMALE("Female"),
	TRANSSEXUAL("Transsexual"),
	MALE_TO_FEMALE("Male-to-Female Transsexual"),
	FEMALE_TO_MALE("Female-to-Male Transsexual"),
	UNKNOWN("Unknown");
	
	private String genderString;
	
	Gender(String genderString) {
		this.genderString = genderString;
	}
	
	@Override
	public String toString() {
		return genderString;
	}
}