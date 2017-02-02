package monk.solemn.kutils.kink_plugin;

import java.sql.SQLException;
import java.util.ResourceBundle;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import monk.solemn.kutils.api.authentication.SeleniumAuthentication;
import monk.solemn.kutils.data_access.CredentialDaoImpl;
import monk.solemn.kutils.objects.Credentials;
import ro.fortsoft.pf4j.Extension;

@Extension
public class KinkAuthentication implements SeleniumAuthentication {
	@Override
	public boolean login(WebDriver driver) {
		Credentials credentials = null;
		try {
			credentials = (new CredentialDaoImpl()).loadNetworkCredentials("Kink.com", null);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		if (credentials != null) {
			driver.get(KinkPlugin.getUrl("Login"));
			System.out.println(KinkPlugin.getXpath("LoginUsername"));
			driver.findElement(By.xpath(KinkPlugin.getXpath("LoginUsername"))).sendKeys(credentials.getUsername());
			driver.findElement(By.xpath(KinkPlugin.getXpath("LoginPassword"))).sendKeys(credentials.getPassword());
			
			driver.findElement(By.xpath(KinkPlugin.getXpath("LoginForm"))).submit();
			
//			new WebDriverWait(driver, 10).until(ExpectedConditions.titleIs(KinkPlugin.titles.getString("SuccessfulLogin")));
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
