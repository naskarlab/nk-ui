package nk.ft.http.im;

import java.util.function.Consumer;

import def.dom.Globals;
import def.js.Array;
import def.js.Object;
import nk.ft.http.Client;

public class ClientPromiseImpl<T> implements Promise<T> {
	
	private Client client; 
	private Factory factory;
	private String className;
	private String method;
	private String params;

	public ClientPromiseImpl(Client client, Factory factory, String className, String method, String params) {
		this.client = client;
		this.factory = factory;
		this.className = className;
		this.method = method;
		this.params = params;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void then(Consumer<T> response, Consumer<String> onError) {
		
		client.post("bus/" + className + "/" + method)
			.body(params)
			.json((o) -> {
				
				try {
					def.js.Object m = createObject(o);
					response.accept((T)m);
					
				} catch (Exception e) {
					Globals.console.error(e);
					Globals.console.trace();
					onError.accept(e.getMessage());
				}
				
			}, onError);
	}

	private def.js.Object createObject(Object o) throws Exception {
		def.js.Object m = null;
		
		String t = o.$get("t");
		String s = o.$get("s");
		def.js.Object d = o.$get("d");
		if(d != null) {
			if("array".equals(t)) {
				
				Array<def.js.Object> list = new Array<def.js.Object>();
				
				for(def.js.String key : def.js.Object.keys(d)) {
					list.push(createObjectModel(s, d.$get(key)));
				}
				
				m = list;
				
			} else {
				m = createObjectModel(t, d);
				
			}
		}
		return m;
	}

	// TODO: Improvement: just one level depth model classes
	private def.js.Object createObjectModel(String clazzName, def.js.Object source)
			throws Exception {
		
		def.js.Object model = new def.js.Object(factory.create(clazzName));
		for(def.js.String prop : def.js.Object.keys(source)) {
			model.$set(prop, source.$get(prop));
		}
		
		return model;
	}

}
