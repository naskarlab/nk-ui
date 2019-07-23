package nk.ft.http;

import java.util.function.Consumer;

public interface Request {

	Request header(String key, String value);
	
	Request path(String value);
	
	Request body(String body);
	
	void json(Consumer<def.js.Object> json, Consumer<String> onError);

}
