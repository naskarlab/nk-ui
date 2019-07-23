package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLElement;
import nk.ft.ui.Heading;

public class HeadingImpl extends ComponentImpl<Heading> implements Heading {
	
	private HTMLElement element;
	
	public HeadingImpl(Document document, Updater up) {
		super(up);
		up.addChange(() -> {
			this.element = document.createElement("h2");	
			this.element.$set("__c", this);
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}
	
	public Heading content(String value) {
		addChange(e -> {
			e.textContent = value;	
		});
		return this;
	}
	
	public Heading title(String value) {
		addChange(e -> {
			e.classList.add("nk-heading-title");
		});
		return content(value);
	}
	
	public Heading subtitle(String value) {
		addChange(e -> {
			e.classList.add("nk-heading-subtitle");
		});
		return content(value);
	}
	
	public Heading section(String value) {
		addChange(e -> {
			e.classList.add("nk-heading-section");
		});
		return content(value);
	}

}
