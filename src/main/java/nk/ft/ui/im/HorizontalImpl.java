package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLDivElement;
import def.dom.HTMLElement;
import nk.ft.ui.Horizontal;

public class HorizontalImpl extends ContainerImpl<Horizontal> implements Horizontal {
	
	private HTMLDivElement element;
	
	public HorizontalImpl(Document document, Updater up) {
		super(up);
		up.addChange(() -> {
			this.element = (HTMLDivElement) document.createElement("div");
			this.element.$set("__c", this);
			this.element.className = "nk-h";
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}

}
