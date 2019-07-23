package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLDivElement;
import def.dom.HTMLElement;
import nk.ft.ui.Box;

public class BoxImpl extends ContainerImpl<Box> implements Box {
	
	private HTMLDivElement element;
	
	public BoxImpl(Document document, Updater up) {
		super(up);
		up.addChange(() -> {
			this.element = (HTMLDivElement) document.createElement("div");
			this.element.$set("__c", this);
			this.element.className = "nk-b";
		});
	}
	
	@Override
	public HTMLElement element() {
		return this.element;
	}
	
}
