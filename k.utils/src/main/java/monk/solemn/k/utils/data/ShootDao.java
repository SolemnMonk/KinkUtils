package monk.solemn.k.utils.data;

import java.sql.SQLException;
import java.util.List;

import monk.solemn.k.utils.shoot.Shoot;

public interface ShootDao {
	public List<Shoot> loadAllShoots() throws SQLException;
	
	public void saveShoot(Shoot shoot) throws SQLException;
}
