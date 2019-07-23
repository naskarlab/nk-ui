package nk.bk.http;

import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class PackageTranslateStubResolver implements ServerStubResolver {
	
	private Logger logger = Logger.getLogger(PackageTranslateStubResolver.class.getName());
	
	public class Instance<T> {
		public Class<?> clazzLookup;
		public T instance;
	}
	
	@FunctionalInterface
	public interface Factory {
		<T> Instance<T> create(Class<T> clazz);
	};
	
	private class ClassData implements ResolverData {
		Method method;
		Object instance;
	};
	
	private String packages;
	
	private Factory factory;
	
	private Gson gson;
	private JsonParser parser;
	
	public PackageTranslateStubResolver(String packages) {
		this.packages = packages;
		
		this.gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mmZ").create();
		this.parser = new JsonParser();
	}
	
	public void setFactory(Factory factory) {
		this.factory = factory;
	}

	@Override
	public boolean validateRequest(HttpServletRequest req) {
		return(!req.getPathInfo().startsWith(this.packages));
	}
	
	@Override
	public ResolverData getData(HttpServletRequest req) {
		
		String methodName = null;
		String className = null;
		
		Instance<?> i = null;
		try {
			String pathInfo = req.getPathInfo();
			
			pathInfo = pathInfo.substring(1).replace("/", ".");
			int pos = pathInfo.lastIndexOf(".");
			className = pathInfo.substring(0, pos);
			methodName = pathInfo.substring(pos+1, pathInfo.length());
						
			i = create(this.getClass().getClassLoader().loadClass(className));
		} catch(Exception e) {
			e.printStackTrace();
			i = null;
		}
		
		if(i == null) {
			return null;
		}
		
		Method method = null;
		for(Method m : i.clazzLookup.getMethods()) {
			if(m.getName().equals(methodName)) {
				method = m;
				break;
			}
		}
		
		if(method == null) {
			return null;
		}
		
		ClassData data = new ClassData();
		data.instance = i.instance;
		data.method = method;
		
		return data;
	}
	
	protected <T> Instance<T> create(Class<T> clazz) {
		try {
			if(factory != null) {
				return factory.create(clazz);
			} else {
				Instance<T> i = new Instance<T>();
				i.instance = clazz.newInstance();
				i.clazzLookup = clazz;
				return i;
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res, ResolverData resolverData) throws Exception {
		ClassData data = (ClassData)resolverData;
		
		JsonObject array = parser.parse(new InputStreamReader(req.getInputStream())).getAsJsonObject();
	    Class<?>[] clazzes = data.method.getParameterTypes();
	    
	    if(array.size() != clazzes.length) {
	    	res.sendError(HttpServletResponse.SC_NOT_FOUND);
	    	return;
	    }
	    
	    List<Object> params = new ArrayList<Object>();
	    for(int i = 0; i < clazzes.length; i++) {
	    	Class<?> c = clazzes[i];
	    	params.add(gson.fromJson(array.get(String.valueOf(i)), c));
	    }
        
	    String json = null;
	    try {
	    	Map<String, Object> m = new HashMap<String, Object>();
	    	
	    	Class<?> returnType = data.method.getReturnType();
	    	
	    	m.put("t", returnType.getCanonicalName());
	    	
	    	if(Collection.class.isAssignableFrom(data.method.getReturnType())) {
	    		m.put("t", "array");
	    		m.put("s", getListGenericReturnType(data.method).getCanonicalName());
		    }
	    	
	    	m.put("d", data.method.invoke(data.instance, params.toArray()));
	    	
			json = gson.toJson(m);
			
		} catch (Exception e) {
			logger.log(Level.SEVERE, "Error:" + req.getPathInfo(), e);
			res.sendError(HttpServletResponse.SC_NOT_FOUND);
	    	return;
		}
	    
	    res.setContentType("application/json");
	    res.getWriter().write(json);
	}
	
	public static Class<?> getListGenericReturnType(Method method) {
		Object c = method.getGenericReturnType();
		if(c instanceof ParameterizedType) {
		    ParameterizedType type = (ParameterizedType) c;
		    return (Class<?>) type.getActualTypeArguments()[0];
		} else {
			return null;
		}
	}	

}
