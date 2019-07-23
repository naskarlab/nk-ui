package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLButtonElement;
import def.dom.HTMLElement;
import nk.ft.ui.Button;

public class ButtonImpl extends ComponentImpl<Button> implements Button {
	
	private Document document;
	private HTMLButtonElement element;
	
	public ButtonImpl(Document document, Updater up) {
		super(up);
		this.document = document;
		up.addChange(() -> {
			this.element = (HTMLButtonElement) document.createElement("button");
			this.element.$set("__c", this);
			this.element.className = "nk-btn";
			this.element.setAttribute("data-nk-btn", "normal");	
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}
	
	@Override
	public Button value(String value) {
		addChange(e -> {
			if(e.childNodes.length > 0) {
				e.removeChild(e.childNodes.$get(0));
			}
			e.appendChild(document.createTextNode(value));	
		});
		return this;
	}

	@Override
	public Button primary() {
		addChange(e -> {
			e.setAttribute("data-nk-btn", "primary");
		});
		return this;
	}
	
	@Override
	public Button asLink() {
		addChange(e -> {
			e.setAttribute("data-nk-btn", "link");	
		});
		return this;
	}

}
