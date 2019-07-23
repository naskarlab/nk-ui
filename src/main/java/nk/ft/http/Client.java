package nk.ft.http;

import def.js.Array;
import nk.ft.http.im.XHRRequestImpl;

public class Client {
	
	private def.js.Object headers;
	
	public Client() {
		this.headers = new def.js.Object();
	}

	public Client header(String key, String value) {
		headers.$set(key, value);
		return this;
	}

	public Request get(String url) {
		Request r = new XHRRequestImpl("GET", url);
		
		appendHeaders(r);
		
		return r;
	}
	
	public Request post(String url) {
		Request r = new XHRRequestImpl("POST", url);
		
		appendHeaders(r);
		
		return r;
	}

	private void appendHeaders(Request r) {
		Array<def.js.String> keys = def.js.Object.keys(headers);
		for(int i = 0; i < keys.length; i++) {
			def.js.String k = keys.$get(i);
			r.header((String)(Object)k, (String)headers.$get(k));
		}
	}

}
