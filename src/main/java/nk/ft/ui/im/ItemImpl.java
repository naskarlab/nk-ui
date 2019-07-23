package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLDivElement;
import def.dom.HTMLElement;
import nk.ft.ui.Item;

public class ItemImpl extends ContainerImpl<Item> implements Item {
	
	private HTMLDivElement element;
	
	public ItemImpl(Document document, Updater up) {
		super(up);
		up.addChange(() -> {
			this.element = (HTMLDivElement) document.createElement("div");
			this.element.$set("__c", this);
			this.element.className = "nk-it";
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}

}
