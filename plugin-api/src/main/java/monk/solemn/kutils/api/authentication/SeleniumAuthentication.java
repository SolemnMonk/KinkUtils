package monk.solemn.kutils.api.authentication;

import org.openqa.selenium.WebDriver;

import ro.fortsoft.pf4j.ExtensionPoint;

public interface SeleniumAuthentication extends ExtensionPoint {
	boolean login(WebDriver driver);
	
	void logout(WebDriver driver);
}
