package nk.ft.vw.im;

import java.util.function.Function;

import def.dom.Document;
import def.dom.Element;
import def.dom.Globals;
import def.dom.HTMLDivElement;
import def.dom.Window;
import def.js.Array;
import nk.ft.ui.Action;
import nk.ft.ui.Component;
import nk.ft.ui.FunctionalAction;
import nk.ft.ui.im.ComponentImpl;
import nk.ft.vw.ViewManager;

public class ViewManagerImpl implements ViewManager {
	
	private Document document;
	private Element root;
	private Array<HTMLDivElement> stack;

	public ViewManagerImpl(Window window, Document document, String selector) {
		this.document = document;
		this.root = document.querySelector(selector);
		this.stack = new Array<HTMLDivElement>();
		
		window.onpopstate = (e) -> {
			this.pop();
			return null;
		};
	}

	@SuppressWarnings("rawtypes")
	@Override
	public void open(Function<Action, Component> action) {
		final CloseableImpl onClose = new CloseableImpl();
		
		((ComponentImpl)action.apply((Action)onClose)).addChange((e) -> {
			
			final HTMLDivElement element = (HTMLDivElement) document.createElement("div");
			element.$set("__c", this);
			element.className = "nk-view";
			element.appendChild(e);
			
			if(this.stack.length > 0) {
				setVisible(this.stack.$get(this.stack.length-1), false);
			}
			
			setVisible(element, true);
			this.stack.push(element);
			onClose.setDelegate(() -> {
				pop(element);
			});
			
			Globals.window.setTimeout((FunctionalAction)() -> {
				Globals.history.pushState(new Object(), "", "/");	
			}, 1);
			
			root.appendChild(
				document.createDocumentFragment().appendChild(element)
			);
			
		});
	}

	private void pop(HTMLDivElement element) {
		if(this.stack.length > 0) {
			int pos = this.stack.lastIndexOf(element);
			if(pos > -1) {
				this.stack.splice(pos, 1);	
			}
			
			setVisible(element, false);
			try {
				root.removeChild(element);
			} catch(Exception e) {
				// @ignore
			}
			
			if(this.stack.length > 0) {
				setVisible(this.stack.$get(this.stack.length-1), true);
			}
		}
	}
	
	private void pop() {
		if(this.stack.length > 0) {
			HTMLDivElement element = this.stack.pop();
			
			setVisible(element, false);
			root.removeChild(element);
			
			if(this.stack.length > 0) {
				setVisible(this.stack.$get(this.stack.length-1), true);
			}
		}
	}
	
	private static void setVisible(HTMLDivElement e, boolean value) {
		if(value) {
			e.style.display = "unset";
			
		} else {
			e.style.display = "none";
		}
	}

}
