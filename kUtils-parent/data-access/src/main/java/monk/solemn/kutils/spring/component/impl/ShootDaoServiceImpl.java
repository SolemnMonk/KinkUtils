package monk.solemn.kutils.spring.component.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import monk.solemn.kutils.dao.ShootDao;
import monk.solemn.kutils.spring.component.ShootDaoService;

@Component
public class ShootDaoServiceImpl implements ShootDaoService {
	private ShootDao shootDao;
	
	@Autowired
	public ShootDaoServiceImpl(ShootDao shootDao) {
		this.shootDao = shootDao;
	}

	public ShootDao getShootDao() {
		return shootDao;
	}
}
