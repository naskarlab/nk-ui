package nk.ft.ui;

public interface Input extends Component, Styleable<Input> {
	
	Input label(String value);

	Input value(String value);

	String value();

	Input typeNumber();
	
	Input typePassword();
	
	Input hint(String value);

	Input msg(String v);

}
