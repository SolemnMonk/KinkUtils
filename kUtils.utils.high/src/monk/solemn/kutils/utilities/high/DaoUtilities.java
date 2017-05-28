package monk.solemn.kutils.utilities.high;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import monk.solemn.kutils.data.api.ActorDao;
import monk.solemn.kutils.data.api.ConfigDao;
import monk.solemn.kutils.data.api.CredentialDao;
import monk.solemn.kutils.data.api.FileStorageDao;
import monk.solemn.kutils.data.api.ShootDao;

@Component
public class DaoUtilities {
	private static ActorDao actorDao;
	private static ConfigDao configDao;
	private static CredentialDao credentialDao;
	private static ShootDao shootDao;
	private static FileStorageDao fileStorageDao;
	
	@Reference
	void bindActorDao(ActorDao dao) {
		actorDao = dao;
	}
	
	@Reference
	void bindConfigDao(ConfigDao dao) {
		configDao = dao;
	}
	
	@Reference
	void bindCredentialDao(CredentialDao dao) {
		credentialDao = dao;
	}
	
	@Reference
	void bindShootDao(ShootDao dao) {
		shootDao = dao;
	}
	
	@Reference
	void bindFileStorageDao(FileStorageDao dao) {
		fileStorageDao = dao;
	}
	
	public static ActorDao getActorDao() {
		return actorDao;
	}
	
	public static ConfigDao getConfigDao() {
		return configDao;
	}
	
	public static CredentialDao getCredentialDao() {
		return credentialDao;
	}
	
	public static ShootDao getShootDao() {
		return shootDao;
	}
	
	public static FileStorageDao getFileStorageDao() {
		return fileStorageDao;
	}
}
