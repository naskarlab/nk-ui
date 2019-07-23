package nk.bk.http;

import java.io.IOException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DeviceIdCookieFilter implements Filter {
	
	public static final String DEVICE_ID = "_deviceId";
	
	private Random random;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.random = new Random(new Date().getTime());
    }

    @Override
    public void destroy() {
        // Nothing to destroy
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    	HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        
        String deviceId = null;
        boolean found = false;
        
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
        	for (int i = 0; i < cookies.length; i++) {
        		if (cookies[i].getName().equals("__uicf")) {
        			deviceId = cookies[i].getValue();
        			found = true;
        			break;
        		}
        	}
        }
        
        if(deviceId == null) {
        	deviceId = UUID.randomUUID().toString() + "-" + random.nextInt(999999);
        }
        
        request.setAttribute(DEVICE_ID, deviceId);

        chain.doFilter(request, response);
        
        if(!found) {
        	Cookie c = new Cookie("__uicf", deviceId);
        	c.setHttpOnly(true);
        	c.setMaxAge(60 * 60 * 24 * 365 * 25);
        	c.setPath("/");
        	//c.setSecure(true);
            res.addCookie(c);     	
        }
    }
    
}