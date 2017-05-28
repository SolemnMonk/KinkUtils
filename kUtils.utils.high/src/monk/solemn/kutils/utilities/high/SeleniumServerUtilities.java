package monk.solemn.kutils.utilities.high;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import com.google.gson.Gson;

import hall.caleb.selenium.objects.command.ChainCommand;
import hall.caleb.selenium.objects.command.Command;
import hall.caleb.selenium.objects.command.FillFieldCommand;
import hall.caleb.selenium.objects.command.GoToCommand;
import hall.caleb.selenium.objects.command.MultiResultSelectorCommand;
import hall.caleb.selenium.objects.command.ReadAttributeCommand;
import hall.caleb.selenium.objects.command.SelectorCommand;
import hall.caleb.selenium.objects.response.ChainResponse;
import hall.caleb.selenium.objects.response.MultiResultResponse;
import hall.caleb.selenium.objects.response.Response;
import hall.caleb.selenium.objects.response.SingleResultResponse;

public class SeleniumServerUtilities {
	public static Response sendSeleniumCommand(Command command) {
		String jsonOut = new Gson().toJson(command, Command.class);
		String jsonIn = sendAndReceive(jsonOut);
		return parseResponse(jsonIn);
	}
	
	public static Response sendSeleniumCommand(ChainCommand command) {
		command.serialize();
		String jsonOut = new Gson().toJson(command, ChainCommand.class);
		String jsonIn = sendAndReceive(jsonOut);
		return parseResponse(jsonIn);
	}
	
	public static Response sendSeleniumCommand(GoToCommand command) {
		String jsonOut = new Gson().toJson(command, GoToCommand.class);
		String jsonIn = sendAndReceive(jsonOut);
		return parseResponse(jsonIn);
	}
	
	public static Response sendSeleniumCommand(SelectorCommand command) {
		String jsonOut = new Gson().toJson(command, SelectorCommand.class);
		String jsonIn = sendAndReceive(jsonOut);
		return parseResponse(jsonIn);
	}
	
	public static Response sendSeleniumCommand(FillFieldCommand command) {
		String jsonOut = new Gson().toJson(command, FillFieldCommand.class);
		String jsonIn = sendAndReceive(jsonOut);
		return parseResponse(jsonIn);
	}
	
	public static Response sendSeleniumCommand(MultiResultSelectorCommand command) {
		String jsonOut = new Gson().toJson(command, MultiResultSelectorCommand.class);
		String jsonIn = sendAndReceive(jsonOut);
		return parseResponse(jsonIn);
	}
	
	public static Response sendSeleniumCommand(ReadAttributeCommand command) {
		String jsonOut = new Gson().toJson(command, ReadAttributeCommand.class);
		String jsonIn = sendAndReceive(jsonOut);
		return parseResponse(jsonIn);
	}

	private static String sendAndReceive(String json) {
		StringBuilder resultJson = new StringBuilder();

		try (Socket socket = new Socket("127.0.0.1", 39948);
				OutputStreamWriter writer = new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8);
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8))) {
			writer.write(json);
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

		return resultJson.toString();
	}

	private static Response parseResponse(String json) {
		Gson gson = new Gson();
		Response tmp = gson.fromJson(json, Response.class);

		Response response;
		
		switch (tmp.getType()) {
		case SingleResult:
			response = gson.fromJson(json, SingleResultResponse.class);
			break;
		case MultiResult:
			response = gson.fromJson(json, MultiResultResponse.class);
			break;
		case Chain:
			response = gson.fromJson(json, ChainResponse.class);
			((ChainResponse) response).deserialize();
			break;
		default:
			response = tmp;
			break;
		}
		
		return response;
	}
}