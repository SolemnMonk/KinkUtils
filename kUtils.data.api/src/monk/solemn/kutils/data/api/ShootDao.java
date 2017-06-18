package monk.solemn.kutils.data.api;

import java.sql.SQLException;
import java.util.List;

import monk.solemn.kutils.objects.Shoot;

public interface ShootDao {
	List<Shoot> loadAllShoots() throws SQLException;
	
	Shoot loadShoot(Long id) throws SQLException;

	Shoot loadShoot(String title) throws SQLException;
	
	Shoot loadShootData(Long id) throws SQLException;
	
	void loadShootPreviewImages(Long id, Shoot shoot) throws SQLException;
	
	void saveShoot(Shoot shoot) throws SQLException;

}
