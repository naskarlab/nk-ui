package nk.bk.http;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface ServerStubResolver {

	boolean validateRequest(HttpServletRequest req);

	ResolverData getData(HttpServletRequest req);

	void execute(HttpServletRequest req, HttpServletResponse res, ResolverData resolverData) throws Exception;

}
