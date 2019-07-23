package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLElement;
import nk.ft.ui.Getter;
import nk.ft.ui.Text;

public class TextImpl extends ComponentImpl<Text> implements Text {

	private Getter<String> getter; 
	
	private HTMLElement element;
	
	public TextImpl(Document document, Updater up) {
		super(up);
		up.addChange(() -> {
			this.element = document.createElement("span");
			this.element.$set("__c", this);
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}
	
	@Override
	public Text content(String value) {
		addChange(e -> {
			e.textContent = value;
		});
		return this;
	}
	
	@Override
	public Text bind(Getter<String> getter) {
		this.getter = getter;
		update();
		return this;
	}
	
	@Override
	public void update() {
		if(this.getter != null) {
			this.content(this.getter.get());
		}
	}
	
}
