package monk.solemn.kutils.utilities.high;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.collections4.ListUtils;

import monk.solemn.kutils.objects.Shoot;

public class ShootUtilities {
	private static List<Shoot> shoots = null;
	
	public static List<Shoot> getAllShoots() throws SQLException {
		return getAllShoots(false);
	}
	
	public static List<Shoot> getAllShoots(boolean refresh) throws SQLException {
		if (shoots == null || refresh) {
			shoots = DaoUtilities.getShootDao().loadAllShoots();
		}
		
		return ListUtils.unmodifiableList(shoots);
	}
	
	public static void refreshShoots() throws SQLException {
		shoots = DaoUtilities.getShootDao().loadAllShoots();
	}
	
	public static Shoot getShootByTitle(String title) throws SQLException {
		Shoot foundShoot = null;
		
		for (Shoot shoot : shoots) {
			if (shoot.getTitle().equals(title)) {
				foundShoot = shoot;
			}
		}
		
		if (foundShoot == null) {
			foundShoot = DaoUtilities.getShootDao().loadShoot(title);
			if (foundShoot == null) {
				foundShoot = new Shoot(title);
			}
			
			refreshShoots();
		}
		
		return foundShoot;
	}
}
