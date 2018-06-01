package monk.solemn.kutils.plugin.core.danbooru;

import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;

import monk.solemn.kutils.objects.Actor;
import monk.solemn.kutils.plugin.api.SourceSiteDataGathererPlugin;

@Component(service=SourceSiteDataGathererPlugin.class,
		   immediate=true)
public class SourceSiteDataGathererImpl extends SourceSiteCommonImpl implements SourceSiteDataGathererPlugin {

	@Override
	public String getTitle() {
		return getTitle(getPostDetails());
	}

	public String getTitle(Map<String, String> postDetails) {
		return "";
	}

	@Override
	public String getDataByKey(String key) {
		return getDataByKey(key.toLowerCase(), getPostDetails());
	}
	
	public String getDataByKey(String key, Map<String, String> postDetails) {
		if (postDetails.containsKey(key)) {
			return postDetails.get(key);
		}
		
		return "";
	}
	
	@Override
	public Map<String, String> getAllData() {
		return getAllData(getPostDetails());
	}
	
	public Map<String, String> getAllData(Map<String, String> postDetails) {
		return postDetails;
	}
	
	public Long getRatingCount(Map<String, String> postDetails) {
		int ups = Integer.valueOf(postDetails.get("up_score"));
		int downs = Integer.valueOf(postDetails.get("down_score"));
		return Long.valueOf(ups + downs);
	}
	
	public Double getRating(Map<String, String> postDetails) {
		double ups = Integer.valueOf(postDetails.get("up_score"));
		double downs = Integer.valueOf(postDetails.get("down_score"));
		
		if (ups > 0) {
			return ups / (ups + downs);
		} else {
			return 0d;
		}
	}
	
	public Collection<String> getTags(Map<String, String> postDetails) {
		String tagString = postDetails.get("tag_string");
		return Arrays.asList(tagString.split(" "));
	}
	
	public TemporalAccessor getDate(Map<String, String> postDetails) {
		String dateString = postDetails.get("created_at");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_kk:mm:ss.SSSXXXXXX");
		return formatter.parse(dateString.replace('T', '_'));
	}
	
	public Collection<Actor> getActors(Map<String, String> postDetails) {
		List<Actor> actors = new ArrayList<>();
		String characterString = postDetails.get("tag_string_character");
		List<String> characters = Arrays.asList(characterString.split(" "));
		Actor tmpActor;
		for (String character : characters) {
			character = character.replaceAll("\\(.*?\\)", "").replace('_', ' ').trim();
			character = StringUtils.capitalize(character);
			tmpActor = new Actor(character);
			actors.add(tmpActor);
		}
		return actors;
	}
}
