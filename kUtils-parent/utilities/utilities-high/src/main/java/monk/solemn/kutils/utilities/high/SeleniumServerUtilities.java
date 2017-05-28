package monk.solemn.kutils.utilities.high;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class SeleniumServerUtilities {
	public static String sendSeleniumCommand(String command) {
		StringBuilder resultJson = new StringBuilder();
		
		try (Socket socket = new Socket("127.0.0.1", 39948);
				OutputStreamWriter writer = new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8);
				BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8))) {
			writer.write(command);
			writer.flush();
			
			while (!reader.ready()) {
				continue;
			}
			
			char[] buffer = new char[128];
			int bufferSize = 0;
			while (reader.ready()) {
				bufferSize = reader.read(buffer);
				resultJson.append(buffer, 0, bufferSize);
				Arrays.fill(buffer, '\0');
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println(resultJson.toString());
		return resultJson.toString();
	}
}
