package monk.solemn.kutils.plugin.kink;

import java.sql.SQLException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import monk.solemn.kutils.api.authentication.SeleniumAuthentication;
import monk.solemn.kutils.objects.Credentials;
import ro.fortsoft.pf4j.Extension;

@Extension
public class KinkAuthentication implements SeleniumAuthentication {
	@Override
	public boolean login(WebDriver driver) {
		Credentials credentials = null;
		try {
			credentials = KinkPlugin.getCredentialDao().loadNetworkCredentials("Kink.com", null);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		if (credentials != null) {
			driver.get(KinkPlugin.getUrl("Login"));
			
			driver.findElement(By.xpath(KinkPlugin.getXpath("ContentPreferencesDismiss"))).click();
			
			driver.findElement(By.xpath(KinkPlugin.getXpath("LoginUsername"))).sendKeys(credentials.getUsername());
			driver.findElement(By.xpath(KinkPlugin.getXpath("LoginPassword"))).sendKeys(credentials.getPassword());
			
			driver.findElement(By.xpath(KinkPlugin.getXpath("LoginForm"))).submit();
			return true;
		} else {
			return false;
		}
	}

	@Override
	public void logout(WebDriver driver) {
		driver.navigate().to(KinkPlugin.getUrl("Logout"));
	}
}
