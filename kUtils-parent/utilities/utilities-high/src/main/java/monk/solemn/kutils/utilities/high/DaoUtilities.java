package monk.solemn.kutils.utilities.high;

import monk.solemn.kutils.dao.ActorDao;
import monk.solemn.kutils.dao.ConfigDao;
import monk.solemn.kutils.dao.CredentialDao;
import monk.solemn.kutils.dao.ShootDao;
import monk.solemn.kutils.spring.component.ActorDaoService;
import monk.solemn.kutils.spring.component.ConfigDaoService;
import monk.solemn.kutils.spring.component.CredentialDaoService;
import monk.solemn.kutils.spring.component.ShootDaoService;

public class DaoUtilities {
	public static ActorDao getActorDao() {
		return SpringUtilities.getSpringContext().getBean(ActorDaoService.class).getActorDao();
	}
	
	public static ConfigDao getConfigDao() {
		return SpringUtilities.getSpringContext().getBean(ConfigDaoService.class).getConfigDao();
	}
	
	public static CredentialDao getCredentialDao() {
		return SpringUtilities.getSpringContext().getBean(CredentialDaoService.class).getCredentialDao();
	}
	
	public static ShootDao getShootDao() {
		return SpringUtilities.getSpringContext().getBean(ShootDaoService.class).getShootDao();
	}
}
