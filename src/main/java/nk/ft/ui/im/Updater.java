package nk.ft.ui.im;

import nk.ft.ui.Action;

public interface Updater {
	
	void addChange(Action a);
	
	void addAfterChange(Action a);

}
