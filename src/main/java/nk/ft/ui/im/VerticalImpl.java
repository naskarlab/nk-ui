package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLElement;
import def.dom.HTMLDivElement;
import nk.ft.ui.Vertical;

public class VerticalImpl extends ContainerImpl<Vertical> implements Vertical {
	
	private HTMLDivElement element;
	
	public VerticalImpl(Document document, Updater up) {
		super(up);
		up.addChange(() -> {
			this.element = (HTMLDivElement) document.createElement("div");
			this.element.$set("__c", this);
			this.element.className = "nk-v";
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}

}
