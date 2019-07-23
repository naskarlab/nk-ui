package nk.ft.ui;

public interface Changer<R, S> {
	
	void fire(R oldValue, S newValue);

}
