package nk.bk.http;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class CachingHttpHeadersFilter implements Filter {
	
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Nothing to initialize
    }

    @Override
    public void destroy() {
        // Nothing to destroy
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        setCache(httpResponse);

        chain.doFilter(request, response);
    }
    
    public static void setCache(HttpServletResponse httpResponse) {
    	httpResponse.setHeader("Cache-Control", "max-age=31536000");
        httpResponse.setHeader("Pragma", "cache");
    }
}