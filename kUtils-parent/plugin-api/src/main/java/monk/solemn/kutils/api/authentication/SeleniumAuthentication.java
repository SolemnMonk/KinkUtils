package monk.solemn.kutils.api.authentication;

import org.openqa.selenium.WebDriver;

public interface SeleniumAuthentication {
	boolean login(WebDriver driver);
	
	void logout(WebDriver driver);
}
