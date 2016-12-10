package monk.solemn.k.utils.enums;

public enum Gender {
	Male("Male"),
	Female("Female"),
	Transsexual("Transsexual"),
	MtF("Male-to-Female Transsexual"),
	FtM("Female-to-Male Transsexual"),
	Unknown("Unknown Gender");
	
	private String genderString;
	
	Gender(String genderString) {
		this.genderString = genderString;
	}
	
	@Override
	public String toString() {
		return genderString;
	}
}