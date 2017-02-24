package monk.solemn.kutils.utilities.high;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import monk.solemn.kutils.spring.SpringConfiguration;

public class SpringUtilities {
	private static AnnotationConfigApplicationContext springContext = null;
	
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
