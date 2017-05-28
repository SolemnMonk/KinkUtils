package monk.solemn.kutils.utilities.high;

import monk.solemn.kutils.data.dao.ActorDao;
import monk.solemn.kutils.data.dao.ConfigDao;
import monk.solemn.kutils.data.dao.CredentialDao;
import monk.solemn.kutils.data.dao.FileStorageDao;
import monk.solemn.kutils.data.dao.ShootDao;
import monk.solemn.kutils.data.spring.component.ActorDaoService;
import monk.solemn.kutils.data.spring.component.ConfigDaoService;
import monk.solemn.kutils.data.spring.component.CredentialDaoService;
import monk.solemn.kutils.data.spring.component.FileStorageDaoService;
import monk.solemn.kutils.data.spring.component.ShootDaoService;

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
	
	public static FileStorageDao getFileStorageDao() {
		return SpringUtilities.getSpringContext().getBean(FileStorageDaoService.class).getFileStorageDao();
	}
}
