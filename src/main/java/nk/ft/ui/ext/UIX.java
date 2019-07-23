package nk.ft.ui.ext;

import nk.ft.ui.Box;
import nk.ft.ui.Button;
import nk.ft.ui.Component;
import nk.ft.ui.Heading;
import nk.ft.ui.Horizontal;
import nk.ft.ui.Input;
import nk.ft.ui.Segment;
import nk.ft.ui.Table;
import nk.ft.ui.Text;
import nk.ft.ui.UI;
import nk.ft.ui.Vertical;

public class UIX implements UI {
	
	private UI ui;
	
	public UIX(UI ui) {
		this.ui = ui;
	}
	
	//
	
	public Text text(String value) {
		return ui.text().content(value);
	}
		
	public Box container() {
		return ui.box().addClassName(Layout.CONTAINER);
	}
	
	public Box left(Component c) {
		return ui.box().addClassName(Layout.LEFT).add(c);
	}
	
	public Box right(Component c) {
		return ui.box().addClassName(Layout.RIGHT).add(c);
	}
	
	public Button button(String value) {
		return ui.button().value(value);
	}

	// delegate 
	
	public Box box() {
		return ui.box();
	}

	public Segment segment() {
		return ui.segment();
	}

	public Vertical vertical() {
		return ui.vertical();
	}

	public Horizontal horizontal() {
		return ui.horizontal();
	}
	
	public Box wrapper() {
		return ui.box().addClassName(Layout.WRAPPER);
	}

	public Text text() {
		return ui.text();
	}

	public Heading heading() {
		return ui.heading();
	}

	public Button button() {
		return ui.button();
	}

	public Input input() {
		return ui.input();
	}

	public <T> Table<T> table(Class<T> clazz) {
		return ui.table(clazz);
	}

}
