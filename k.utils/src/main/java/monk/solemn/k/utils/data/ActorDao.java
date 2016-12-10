package monk.solemn.k.utils.data;

import java.sql.SQLException;
import java.util.List;

import monk.solemn.k.utils.actor.Actor;

public interface ActorDao {
	public List<Actor> loadAllActors() throws SQLException;
	
	public List<Actor> loadActorsById(String id);
	
	public List<Actor> loadActorsByName(String name);
	
	public void saveActor(Actor actor) throws SQLException;
}
