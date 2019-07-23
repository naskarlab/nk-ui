package nk.ft.ui;

public interface UI {
	
	Box box();
	
	Segment segment();
	
	Vertical vertical();
	
	Horizontal horizontal();

	Text text();
	
	Heading heading();

	Button button();

	Input input();

	<T> Table<T> table(Class<T> clazz);
}
