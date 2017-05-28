package monk.solemn.kutils.data.spring;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import monk.solemn.kutils.data.dao.ActorDao;
import monk.solemn.kutils.data.dao.ConfigDao;
import monk.solemn.kutils.data.dao.CredentialDao;
import monk.solemn.kutils.data.dao.FileStorageDao;
import monk.solemn.kutils.data.dao.ShootDao;
import monk.solemn.kutils.data.dao.impl.database.ActorDaoImpl;
import monk.solemn.kutils.data.dao.impl.database.ConfigDaoImpl;
import monk.solemn.kutils.data.dao.impl.database.CredentialDaoImpl;
import monk.solemn.kutils.data.dao.impl.database.ShootDaoImpl;
import monk.solemn.kutils.data.dao.impl.filesystem.FileStorageDaoImpl;

@Configuration
@ComponentScan(basePackages = "monk.solemn.kutils.spring.component")
public class SpringConfiguration {
	private static AnnotationConfigApplicationContext springContext = null;
	
	@Bean
	@Scope("singleton")
	public ActorDao getActorDao() {
		return new ActorDaoImpl();
	}
	
	@Bean
	@Scope("singleton")
	public ConfigDao getConfigDao() {
		return new ConfigDaoImpl();
	}
	
	@Bean
	@Scope("singleton")
	public CredentialDao getCredentialDao() {
		return new CredentialDaoImpl();
	}

	@Bean
	@Scope("singleton")
	public ShootDao getShootDao() {
		return new ShootDaoImpl();
	}
	
	@Bean
	@Scope("singleton")
	public FileStorageDao getFileStorageDao() {
		return new FileStorageDaoImpl();
	}
	
	public static AnnotationConfigApplicationContext getSpringContext() {
		if (springContext == null) {
			springContext = new AnnotationConfigApplicationContext();
			springContext.register(SpringConfiguration.class);
			springContext.refresh();
			springContext.start();
		}
		
		return springContext;
	}
}
