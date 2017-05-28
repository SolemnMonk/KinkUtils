package monk.solemn.kutils.data.api;

import java.sql.SQLException;
import java.util.List;

import monk.solemn.kutils.objects.Actor;

public interface ActorDao {
	public List<Actor> loadAllActors() throws SQLException;
	
	public List<Actor> loadActors(String name) throws SQLException;

	public Actor loadActor(Long id) throws SQLException;
	
	public void saveActor(Actor actor) throws SQLException;
}
