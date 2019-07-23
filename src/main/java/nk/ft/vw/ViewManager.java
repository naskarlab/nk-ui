package nk.ft.vw;

import java.util.function.Function;

import nk.ft.ui.Action;
import nk.ft.ui.Component;

public interface ViewManager {

	void open(Function<Action, Component> action);
	
}
