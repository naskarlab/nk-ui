package nk.bk.http;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RedirectJS implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}
	
	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		
		String uri = req.getRequestURI();
		
		String file = uri;
		int pos = uri.lastIndexOf("/");
		if(pos > -1) {
			file = uri.substring(pos+1);
		}
			
		CachingHttpHeadersFilter.setCache(resp);
		
		if(!file.contains(".")) {
			uri += ".js";
			
			request.getServletContext()
				.getRequestDispatcher(uri)
				.forward(req, resp);
			
		} else {
			chain.doFilter(request, response);
		}
	}
	
}
