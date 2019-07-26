package nk.ft.http.im;

import static def.js.Globals.arguments;
import static jsweet.util.Lang.$map;
import static jsweet.util.Lang.$noarrow;
import static jsweet.util.Lang.function;

import java.util.function.Function;
import java.util.function.Supplier;

import def.dom.Globals;
import def.js.Array;
import def.js.JSON;
import nk.ft.http.Client;

public class BusClient<T> implements Factory {
	
	private Client client;
	private def.js.Object proxy;
	private def.js.Object factories;
	
	public BusClient(T service) {
		
		this.factories = $map();
		
		this.client = new Client()
			.header("Content-type", "application/json");
		
		this.proxy = new def.js.Object();
		
		Array<def.js.String> keys = def.js.Object.getOwnPropertyNames(def.js.Object.getPrototypeOf(service));
		
		Client c = this.client;
		
		Factory f = this;
		
		for(def.js.String method : keys) {
			
			proxy.$set(method, $noarrow(function(() -> {
				
				String className = service.getClass().getName().replace(".", "/");
				String json = JSON.stringify(arguments);
				Globals.console.log(className + "." + method + "(" + json + ")");
				
				return new ClientPromiseImpl<T>(
						c, 
						f,
						className, 
						(String)(Object)method, 
						json);
				
			})));
		}		
	}
	
	public Client getClient() {
		return client;
	}

	@SuppressWarnings("unchecked")
	public <R> Promise<R> on(Function<T, R> call) {
		return (Promise<R>)call.apply((T)(Object)proxy);
	}
	
	@Override
	public Object create(String clazzName) throws Exception {
		Supplier<?> getter = this.factories.$get(clazzName);
		if(getter == null) {
			Class<?> clazz = Class.forName(clazzName);
			return clazz.newInstance();
		} else {
			return getter.get();
		}
	}
	
	public <M> void addFactory(Class<M> clazz, Supplier<M> getter) {
		factories.$set(clazz.getName(), getter);
	}
	
}
