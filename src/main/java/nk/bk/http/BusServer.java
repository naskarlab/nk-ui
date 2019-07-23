package nk.bk.http;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BusServer extends HttpServlet {

	private static final long serialVersionUID = 1L;
	 
	private ServerStubHandler handler;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		
		String resolverClassName = config.getInitParameter("resolver");
		if(resolverClassName == null) {
			throw new IllegalArgumentException("Init parameter 'resolver' is required.");
		}
		
		try {
			ServerStubResolver resolver = (ServerStubResolver)
					this.getClass().getClassLoader()
						.loadClass(resolverClassName).newInstance();
			handler = new ServerStubHandler(resolver);
			
		} catch(Exception e) {
			throw new IllegalArgumentException("Init parameter 'resolver' is invalid.", e);
		}
		
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		handler.handle(req, resp);
	}
	
}
