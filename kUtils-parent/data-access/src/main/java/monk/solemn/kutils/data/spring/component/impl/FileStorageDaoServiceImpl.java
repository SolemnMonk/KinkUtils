package monk.solemn.kutils.data.spring.component.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import monk.solemn.kutils.data.dao.FileStorageDao;
import monk.solemn.kutils.data.spring.component.FileStorageDaoService;

@Component
public class FileStorageDaoServiceImpl implements FileStorageDaoService {
	private FileStorageDao fileStorageDao;
	
	@Autowired
	public FileStorageDaoServiceImpl(FileStorageDao fileStorageDao) {
		this.fileStorageDao = fileStorageDao;
	}

	public FileStorageDao getFileStorageDao() {
		return fileStorageDao;
	}
}
