package monk.solemn.kutils.utilities.high;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.collections4.ListUtils;

import monk.solemn.kutils.objects.Actor;

public class ActorUtilities {
	private static List<Actor> actors = null;
	
	public static List<Actor> getAllActors() throws SQLException {
		return getAllActors(false);
	}
	
	public static List<Actor> getAllActors(boolean refresh) throws SQLException {
		if (actors == null || refresh) {
			actors = DaoUtilities.getActorDao().loadAllActors();
		}

		return ListUtils.unmodifiableList(actors);
	}
	
	public static void refreshActors() throws SQLException {
		actors = DaoUtilities.getActorDao().loadAllActors();
	}
}
