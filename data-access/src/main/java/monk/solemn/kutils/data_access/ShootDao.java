package monk.solemn.kutils.data_access;

import java.sql.SQLException;
import java.util.List;

import monk.solemn.kutils.objects.Shoot;

public interface ShootDao {
	public List<Shoot> loadAllShoots() throws SQLException;
	
	public Shoot loadShoot(Long id) throws SQLException;
	
	public Shoot loadShootData(Long id) throws SQLException;
	
	public Shoot loadShootPreviewImages(Long id) throws SQLException;
	
	public void saveShoot(Shoot shoot) throws SQLException;
}
