package monk.solemn.kutils.data.spring.component.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import monk.solemn.kutils.data.dao.ActorDao;
import monk.solemn.kutils.data.spring.component.ActorDaoService;

@Component
public class ActorDaoServiceImpl implements ActorDaoService {
	private ActorDao actorDao;
	
	@Autowired
	public ActorDaoServiceImpl(ActorDao actorDao) {
		this.actorDao = actorDao;
	}

	public ActorDao getActorDao() {
		return actorDao;
	}
}
