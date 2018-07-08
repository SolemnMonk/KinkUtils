package monk.solemn.kutils.data.provider;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.sqlite.JDBC;
import org.sqlite.SQLiteJDBCLoader;

import monk.solemn.kutils.data.api.ConfigDao;
import monk.solemn.kutils.data.api.EntityDownloadService;

public class Activator implements BundleActivator {
	private static BundleContext context;
	
	public static final String JDBC_STRING = "jdbc:sqlite:./kUtils.sqlite";
	
	private static Connection connectionWithoutTransaction;
	
	private static int connectionWithoutTransactionReferenceCount;
	
	@Override
	public void start(BundleContext context) throws Exception {
		Activator.context = context;
		
		initializeSqlite();

		copyScripts();
		
		checkForRequiredConfigValues();
		
		context.registerService(ConfigDao.class, new ConfigDaoImpl(), null);
		context.registerService(EntityDownloadService.class, new EntityDownloadServiceImpl(), null);
	}

	private void initializeSqlite() throws Exception, SQLException {
		SQLiteJDBCLoader.initialize();
		DriverManager.registerDriver(new JDBC());
	}

	@Override
	public void stop(BundleContext context) throws Exception {
	}
	
	public static BundleContext getContext() {
		return context;
	}

	private void copyScripts() throws FileNotFoundException, IOException, SQLException {
		File db = new File("kUtils.sqlite");
		File build = new File("build.sql");

		if (!build.exists()) {
			BufferedInputStream buildScriptIn = new BufferedInputStream(this.getClass().getResourceAsStream("/build.sql"));
			BufferedOutputStream buildScriptOut = new BufferedOutputStream(new FileOutputStream(build));
			IOUtils.copy(buildScriptIn, buildScriptOut);
	
			buildScriptIn.close();
			buildScriptOut.close();
		}

		if (!db.exists()) {
			Connection conn = DriverManager.getConnection(Activator.JDBC_STRING);
			BufferedInputStream buildScriptIn = new BufferedInputStream(this.getClass().getResourceAsStream("/build.sql"));
			List<String> buildScript = IOUtils.readLines(buildScriptIn);
			buildScriptIn.close();
			
			for (String line : buildScript) {
				if (StringUtils.isNotBlank(line)) {
					conn.createStatement().executeUpdate(line);
				}
			}
		}
	}

	private void checkForRequiredConfigValues() throws IOException {
		ConfigDao dao = new ConfigDaoImpl();
		List<String> requiredValues = new ArrayList<>();
		getStoragePoolValues(dao, requiredValues);
		
		for (String value : requiredValues) {
			if (StringUtils.isBlank(dao.loadGlobalConfig(value))) {
				System.out.println("Missing required global config value '" + value + "'");
				System.out.println("Set it with this command: sgcv " + value + " <value>");
			}
		}
	}

	private void getStoragePoolValues(ConfigDao dao, List<String> requiredValues) throws NumberFormatException, IOException {
		Integer locationCount = Integer.valueOf(dao.loadGlobalConfig("storagePoolLocationCount"));
		for (Integer i = 0; i < locationCount; i++) {
			requiredValues.add("storagePoolLocation_" + i.toString());
		}
		requiredValues.add("aria2Location");
	}
	
	public static Connection openDb() throws SQLException {
		return openDb(false);
	}
	
	public static Connection openDb(boolean startTransaction) throws SQLException {
		if (startTransaction) {
			Connection conn = DriverManager.getConnection(Activator.JDBC_STRING);
			conn.setAutoCommit(false);
			return conn;
		} else {
			if (connectionWithoutTransaction == null) {
				connectionWithoutTransaction = DriverManager.getConnection(Activator.JDBC_STRING);
				connectionWithoutTransaction.setAutoCommit(true);
			}
			connectionWithoutTransactionReferenceCount++;
			return connectionWithoutTransaction;
		}
	}
	
	public static void closeDb(Connection conn) throws SQLException {
		closeDb(conn, false);
	}
	
	public static void closeDb(Connection conn, boolean shouldCommitTransaction) throws SQLException {
		if (shouldCommitTransaction) {
			conn.commit();
			conn.close();
		} else {
			if (conn.equals(connectionWithoutTransaction)) {
				connectionWithoutTransactionReferenceCount--;
				if (connectionWithoutTransactionReferenceCount <= 0) {
					connectionWithoutTransaction.close();
				}
			}
		}
	}
}

