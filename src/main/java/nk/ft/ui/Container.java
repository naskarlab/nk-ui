package nk.ft.ui;

public interface Container<Self> extends Component, Clickable<Self>, Styleable<Self>, Bindable<Self> {
	
	Self insert(Component c);
	
	Self add(Component c);
	
	Self remove(Component c);
	
	Self removeAll();
	
}
