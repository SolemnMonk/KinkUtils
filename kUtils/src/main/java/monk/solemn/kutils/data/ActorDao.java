package monk.solemn.kutils.data;

import java.sql.SQLException;
import java.util.List;

import monk.solemn.kutils.objects.Actor;

public interface ActorDao {
	public List<Actor> loadAllActors() throws SQLException;
	
	public List<Actor> loadActorById(String id);
	
	public List<Actor> loadActorsByName(String name);
	
	public void saveActor(Actor actor) throws SQLException;
}
