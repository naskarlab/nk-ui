package nk.bk.http;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServerStubHandler {
	
	private Logger logger = Logger.getLogger(ServerStubHandler.class.getName());
	
	private Map<String, ResolverData> cache;
	
	private ServerStubResolver resolver;
	
	public ServerStubHandler(ServerStubResolver resolver) {
		this.resolver = resolver;
		this.cache = new HashMap<>();
	}

	public void handle(HttpServletRequest req, HttpServletResponse res) {
		
		String pathInfo = req.getPathInfo();
		try {
		
			if(pathInfo == null) {
				res.sendError(HttpServletResponse.SC_NOT_FOUND);
				return;
			}
			
			ResolverData entry = cache.get(pathInfo); 
			if(entry == null) {
				
				if(!resolver.validateRequest(req)) {
					res.sendError(HttpServletResponse.SC_NOT_FOUND);
					return;
				}
				
				entry = resolver.getData(req);
				if(entry == null) {
					res.sendError(HttpServletResponse.SC_NOT_FOUND);
					return;
				}
				
				cache.put(pathInfo, entry);
			} 
			
			execute(entry, req, res);
			
		} catch(Exception e) {
			logger.log(Level.SEVERE, "Error:" + pathInfo, e);
			try {
				res.sendError(HttpServletResponse.SC_NOT_FOUND);
			} catch(Exception ec) {
			}
		}
	}
	
	private void execute(ResolverData entry, HttpServletRequest req, HttpServletResponse res) throws Exception {
		resolver.execute(req, res, entry);
	}

}
