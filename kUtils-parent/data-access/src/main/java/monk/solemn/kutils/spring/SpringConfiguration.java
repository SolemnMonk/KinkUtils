package monk.solemn.kutils.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import monk.solemn.kutils.dao.ActorDao;
import monk.solemn.kutils.dao.ConfigDao;
import monk.solemn.kutils.dao.CredentialDao;
import monk.solemn.kutils.dao.ShootDao;
import monk.solemn.kutils.dao.impl.database.ActorDaoImpl;
import monk.solemn.kutils.dao.impl.database.ConfigDaoImpl;
import monk.solemn.kutils.dao.impl.database.CredentialDaoImpl;
import monk.solemn.kutils.dao.impl.database.ShootDaoImpl;

@Configuration
@ComponentScan(basePackages = "monk.solemn.kutils.spring.component")
public class SpringConfiguration {
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
}
