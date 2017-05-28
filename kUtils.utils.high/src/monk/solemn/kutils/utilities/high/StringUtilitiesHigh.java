package monk.solemn.kutils.utilities.high;

import monk.solemn.kutils.enums.Gender;

public class StringUtilitiesHigh {
	public static Gender parseGender(String genderString) {
		Gender gender;
		genderString = genderString.toLowerCase();
		
		if (genderString.equals("female") || genderString.equals("woman") || genderString.equals("girl")) {
			gender = Gender.Female;
		} else if (genderString.equals("male") || genderString.equals("man") || genderString.equals("boy")) {
			gender = Gender.Male;
		} else if (genderString.equals("transsexual") || genderString.equals("trans-sexual") || genderString.equals("trans sexual") || genderString.equals("trans")) {
			gender = Gender.Transsexual;
		} else {
			gender = Gender.Unknown;
		}
		
		return gender;
	}
}
