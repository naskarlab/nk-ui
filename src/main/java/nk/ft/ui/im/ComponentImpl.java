package nk.ft.ui.im;

import def.dom.HTMLElement;
import nk.ft.ui.Action;
import nk.ft.ui.Clickable;
import nk.ft.ui.Component;
import nk.ft.ui.Styleable;

@SuppressWarnings("unchecked")
public abstract class ComponentImpl<Self> implements Component, Styleable<Self>, Clickable<Self> {
	
	private Updater up;
	
	public ComponentImpl(Updater up) {
		this.up = up;
	}
	
	abstract public HTMLElement element();
	
	public void addChange(ElementChange action) {
		up.addChange(() -> {
			action.change(element());
		});
	}
	
	@Override
	public void addAfterChange(Action action) {
		up.addAfterChange(action);
	}
	
	@Override
	public Self addClassName(String value) {
		addChange(e -> {
			String[] l = value.split(" ");
			for(String name : l) {
				e.classList.add(name);	
			}
		});
		return (Self) this;
	}

	@Override
	public Self removeClassName(String value) {
		addChange(e -> {
			String[] l = value.split(" ");
			for(String name : l) {
				e.classList.remove(name);	
			}
		});
		return (Self) this;
	}
	
	@Override
	public Self toogleClass(String state1, String state2) {
		addChange(e -> {
			if(e.classList.contains(state1)) {
				e.classList.remove(state1);
				e.classList.add(state2);
			} else if(e.classList.contains(state2)) {
				e.classList.remove(state2);
				e.classList.add(state1);
			}	
		});
		return (Self) this;
	}
	
	public Self click(Action value) {
		addClassName("nk-event");
		addChange(e -> {
			e.addEventListener("click", (evt) -> {
				value.call();
			});	
		});
		return (Self) this;
	}

}
