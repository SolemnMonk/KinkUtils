package monk.solemn.kutils.core;

import java.sql.SQLException;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebApplication;

import monk.solemn.kutils.objects.KUtilsImage;
import monk.solemn.kutils.utilities.high.DaoUtilities;

public class KUtilsApplication extends WebApplication
{
	@Override
	public Class<? extends WebPage> getHomePage()
	{
		return LaunchSelenium.class;
	}

	@Override
	public void init()
	{
		super.init();

//		getComponentInstantiationListeners().add(new OsgiComponentInjector());
		
		System.out.println("init!");
		
		try {
			KUtilsImage.setBasePath(DaoUtilities.getConfigDao().loadConfig("basePath"));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		startInterfaces();
	}
	
	@Override
	protected void onDestroy() {
	}

	public void reloadPlugins() {
	}
	
	private void startInterfaces() {
	}
}
