# Naskar UI

Create user interfaces handling the HTML on Client-Side. 

## Transpilers

The basic concept is create components using directly DOM API on client-side, but coding just with Java and to use the transpiler to convert the Java code into JavaScript code. In this project, we're using the JSweet Transpiler.

## Features

- Create easily complex UI components
- Fluent interfaces to create UI
- Easy publication the API services
- Uses the same model on client and server
- Compile checking between client and server

## Sample: [nk-ui-sample](https://github.com/naskarlab/nk-ui-sample)

	- UIX: Central factory to create components
	- ViewManager: manages the Views and browser history 
	- BusClient: create the call to server using JSON requests
	- BusServer: receives the request and execute the mapping services

File index.html:

```
	<body>
		<div id="app" class="nk-app"></div>
	</body>
```

LoginView.java

```
	UIX ui = new UIX(new UIImpl(Globals.window.document));
	ViewManager vm = new ViewManagerImpl(Globals.window, Globals.window.document, "#app");

	Input username = ui.input().hint("Username").label("Username");
	Input pw = ui.input().hint("Password").label("Password").typePassword();

	return ui.segment().add(ui.vertical()
		.add(username)
		.add(pw)
		.add(ui.button("Login").primary().click(() -> {
			userController.login(username.value(), pw.value(), (result) -> {
				if(result.isSuccess()) {
					
					userController.findByUsername(username.value(), (user) -> {
						onClose.call();
						onLogin.accept(user);	
					});
					
				} else {
					username.msg(result.getMessage());
				}
			});
		}))
	);
```

UserController.java

```
	BusClient<UserAPI> bus = new BusClient<UserAPI>(new UserServiceStub());
	
	bus.addFactory(ResultModel.class, () -> new ResultModel());
	bus.addFactory(UserModel.class, () -> new UserModel());
	
	public void login(String username, String pw, Consumer<ResultModel> call) {
		bus.on(i -> i.login(username, pw)).then((m) -> {
			call.accept(m);
		}, onError);
	}
```

# ServerSide

```
UserServiceImpl implements UserAPI {
	
	@Override
	public ResultModel login(String username, String pw) {
		if(username != null && pw != null && username.equals(pw)) {
			return new ResultModel();
		} else {
			return new ResultModel("Invalid user: " + username);
		}
	}
	
	@Override
	public UserModel findByUsername(String username) {
		UserModel user = new UserModel();
		
		user.setUsername(username);
		user.setName("Test User: " + username);
		
		return user;
	}
	
}
```

Jetty Embedded:

```
	Server server = new Server();

	WebAppContext ctx = new WebAppContext();
	ctx.setContextPath("/");

	ServletHolder busServlet = ctx.addServlet(BusServer.class, "/bus/*");
	busServlet.setInitOrder(0);
	busServlet.setInitParameter("resolver", App.class.getCanonicalName());
```

  

