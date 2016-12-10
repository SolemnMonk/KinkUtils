package monk.solemn.k.utils.data;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import monk.solemn.k.utils.WicketApplication;
import monk.solemn.k.utils.shoot.Shoot;

public class ShootDaoImpl extends BaseDao implements ShootDao {

	@Override
	public List<Shoot> loadAllShoots() throws SQLException {
		List<Shoot> shoots = new LinkedList<>();
		
		final String basePath = WicketApplication.getConfigDao().loadConfig("basePath");
		
		PreparedStatement dataStatement;
		PreparedStatement attributeStatement;
		PreparedStatement imageStatement;
		ResultSet dataResults;
		ResultSet attributeResults;
		ResultSet imageResults;
		final String dataQuery;
		final String attributesQuery;
		final String imagesQuery;
		StringBuilder queryBuilder = new StringBuilder();
		
		return shoots;
	}

	@Override
	public void saveShoot(Shoot shoot) {

	}
}
