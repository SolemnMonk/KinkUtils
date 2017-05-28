package monk.solemn.kutils.utilities.high;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import monk.solemn.kutils.data.spring.SpringConfiguration;

public class SpringUtilities {
	public static AnnotationConfigApplicationContext getSpringContext() {
		return SpringConfiguration.getSpringContext();
	}
}
