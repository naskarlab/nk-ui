package nk.ft.ui;

public interface Button extends Component, Styleable<Button>, Clickable<Button> {

	Button value(String value);
	
	Button click(Action value);

	Button primary();

	Button asLink();

}
