package monk.solemn.kutils.api.authentication;

import java.util.UUID;

public interface SeleniumAuthentication {
	boolean login(UUID seleniumId);
	
	void logout(UUID seleniumId);
}
