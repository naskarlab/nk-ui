package nk.ft.vw.im;

import nk.ft.ui.Action;

public class CloseableImpl {
	
	private Action delegate;
	
	public void setDelegate(Action delegate) {
		this.delegate = delegate;
	}

	public void call() {
		if(delegate != null) {
			delegate.call();
		}
	}

}
