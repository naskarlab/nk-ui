package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLDivElement;
import def.dom.HTMLElement;
import def.dom.HTMLInputElement;
import def.dom.HTMLLabelElement;
import def.dom.HTMLSpanElement;
import nk.ft.ui.Input;

public class InputImpl extends ComponentImpl<Input> implements Input {
	
	private HTMLDivElement element;
	private HTMLLabelElement label;
	private HTMLInputElement input;
	private HTMLSpanElement span;
	
	public InputImpl(Document document, Updater up) {
		super(up);
		
		up.addChange(() -> {
			this.element = (HTMLDivElement) document.createElement("div");
			this.element.$set("__c", this);
			
			this.label = (HTMLLabelElement) document.createElement("label");
			this.input = (HTMLInputElement)document.createElement("input");
			this.span = (HTMLSpanElement) document.createElement("span");
			
			this.element.appendChild(label);
			this.element.appendChild(input);
			this.element.appendChild(span);
			
			this.element.className = "nk-input";
			this.input.value = "";
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}
	
	@Override
	public Input label(String value) {
		addChange(e -> {
			label.textContent = value;	
		});
		return this;
	}
	
	@Override
	public Input typeNumber() {
		addChange(e -> {
			input.type = "number";
		});
		return this;
	}
	
	@Override
	public Input typePassword() {
		addChange(e -> {
			input.type = "password";
		});
		return this;
	}
	
	@Override
	public Input msg(String v) {
		addChange(e -> {
			span.textContent = v;
		});
		return this;
	}
	
	@Override
	public Input value(String value) {
		addChange(e -> {
			input.value = value;	
		});
		return this;
	}
	
	@Override
	public String value() {
		return input.value;
	}
	
	@Override
	public Input hint(String value) {
		addChange(e -> {
			input.placeholder = value;	
		});
		return this;
	}

}
