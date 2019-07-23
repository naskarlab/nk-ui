package nk.ft.ui.im;

import def.dom.Document;
import def.dom.HTMLDivElement;
import def.dom.HTMLElement;
import nk.ft.ui.Segment;

public class SegmentImpl extends ContainerImpl<Segment> implements Segment {
	
	private HTMLDivElement element;
	
	public SegmentImpl(Document document, Updater up) {
		super(up);
		up.addChange(() -> {
			this.element = (HTMLDivElement) document.createElement("div");
			this.element.$set("__c", this);
			this.element.className = "nk-s";
		});
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}

}
