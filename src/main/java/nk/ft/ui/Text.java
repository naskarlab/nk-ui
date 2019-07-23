package nk.ft.ui;

public interface Text extends Component, Styleable<Text>, ClickListener<Text>, Bindable<Text> {
	
	Text content(String value);

	Text bind(Getter<String> getter);

}
