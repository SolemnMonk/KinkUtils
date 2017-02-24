package monk.solemn.kutils.api.shoots;

import org.openqa.selenium.WebDriver;

public interface SeleniumShootBrowser {
	void loadBrowsePage(WebDriver driver);

	void previousBrowsePage(WebDriver driver);
	
	void nextBrowsePage(WebDriver driver);
	
	void loadShoot(WebDriver driver);
}
