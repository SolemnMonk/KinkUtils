package monk.solemn.kutils.plugin.core.danbooru;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import monk.solemn.kutils.enums.Action;
import monk.solemn.kutils.enums.ContentType;
import monk.solemn.kutils.enums.EntityClass;
import monk.solemn.kutils.enums.PluginType;
import monk.solemn.kutils.objects.PluginInfo;
import monk.solemn.kutils.objects.Task;
import monk.solemn.kutils.plugin.api.SourceSitePlugin;

public class SourceSiteCommonImpl implements SourceSitePlugin {
	public static final String BASE_URL = "https://danbooru.donmai.us/";
	public static final String POSTS_FRAGMENT = "posts/";
	public static final String TAGS_FRAGMENT = "tags/";
	public static final String FORMAT_FRAGMENT = ".json";
	
	private static SourceSiteCommonImpl instance;
	private static Task currentTask;
	private static PluginInfo pluginInfo;
	
	protected SourceSiteCommonImpl() {
		// Empty on purpose
	}
	
	public static SourceSitePlugin getInstance() {
		if (instance == null) {
			instance = new SourceSiteCommonImpl();
		}
		
		return instance;
	}
	
	@Override
	public boolean loadTask(Task task) {
		currentTask = task;
		return true;
	}

	@Override
	public Task getTask() {
		return currentTask;
	}

	@Override
	public boolean taskRequiresAuthentication() {
		return false;
	}

	@Override
	public void authenticate() {
		// No need
	}

	@Override
	public void deauthenticate() {
		// No need
	}

	@Override
	public PluginInfo getPluginInfo() {
		if (pluginInfo == null) {
			pluginInfo = new PluginInfo();
			
			pluginInfo.setName("Danbooru Plugin (kUtils Core)");
			pluginInfo.setVersion("0.0.0-preAlpha");
			pluginInfo.setType(PluginType.CONTENT_GATHERER);
			pluginInfo.setDescription("This is a content-gatherer plugin for Danbooru (danbooru.donmai.us) and is part of the core kUtils plugins.");
			
			List<ContentType> contentTypes = new ArrayList<>();
			contentTypes.add(ContentType.IMAGES);
			pluginInfo.setContentTypes(contentTypes);
			
			List<Task> tasks = new ArrayList<>();
			tasks.add(new Task(Action.DOWNLOAD, EntityClass.ITEM));
			tasks.add(new Task(Action.DOWNLOAD, EntityClass.BUNDLE));
			tasks.add(new Task(Action.RIP, EntityClass.SEARCH));
			tasks.add(new Task(Action.GATHER_DATA, EntityClass.BUNDLE));
			pluginInfo.setTasks(tasks);
		}
		
		return pluginInfo;
	}
	
	protected Map<String, String> getPostDetails() {
		Map<String, String> postDetails = new HashMap<>();
		try {
			String urlString = SourceSiteCommonImpl.getInstance().getTask().getData().get("url");
			urlString = urlString.substring(urlString.lastIndexOf('/') + 1);
			urlString = BASE_URL + POSTS_FRAGMENT + urlString + FORMAT_FRAGMENT;
			URL url = new URL(urlString);
			HttpURLConnection connection = buildConnection(url);
			
			int responseCode = connection.getResponseCode();
			if (responseCode != 200) {
				throw new IOException("Received response code of " + Integer.valueOf(responseCode).toString());
			}
			postDetails = new Gson().fromJson(IOUtils.toString(connection.getInputStream()), new TypeToken<Map<String, String>>(){}.getType());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return postDetails;
	}
	
	protected HttpURLConnection buildConnection(URL url) throws IOException, ProtocolException {
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("User-Agent", "kUtils");
		connection.connect();
		return connection;
	}
}
