package nk.ft.http.im;

import java.util.function.Consumer;

import def.dom.Globals;
import def.dom.XMLHttpRequest;
import def.js.JSON;
import def.js.Object;
import nk.ft.http.Request;

public class XHRRequestImpl implements Request {

	private String url;
	private String method;
	private String body;
	private def.js.Object headers;

	public XHRRequestImpl(String method, String url) {
		this.method = method;
		this.url = url;
		this.headers = new def.js.Object();
	}

	@Override
	public Request header(String key, String value) {
		headers.$set(key, value);
		return this;
	}

	@Override
	public Request path(String value) {
		this.url += "/" + value;
		return this;
	}
	
	@Override
	public Request body(String body) {
		this.body = body;
		return this;
	}

	@Override
	public void json(Consumer<Object> call, Consumer<String> onError) {
		send((xhr) -> {
			Globals.console.log(">>: " + xhr.responseText);
			call.accept(new def.js.Object(JSON.parse(xhr.responseText)));
		},
		onError);
	}

	private void send(Consumer<XMLHttpRequest> call, Consumer<String> onError) {
		XMLHttpRequest xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onreadystatechange = (e) -> {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					call.accept(xhr);
				} else {
					onError.accept(xhr.statusText + " " + xhr.responseText);
				}
			}
			return new Object();

		};
		
		if(onError != null) {
            xhr.onerror = (e) -> {
                onError.accept(xhr.statusText + " " + xhr.responseText);
                return null;
            };
        }
		
		if(body != null) {
			xhr.send(body);
		} else {
			xhr.send();	
		}
	}

}
