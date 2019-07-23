package nk.ft.ui;

public interface Styleable<Self> {
	
	Self addClassName(String value);
	
	Self removeClassName(String value);
	
	Self toogleClass(String state1, String state2);

}
