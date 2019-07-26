package nk.ft.ui.im;

import static def.dom.Globals.window;

import def.dom.Document;
import def.js.Array;
import nk.ft.ui.Action;
import nk.ft.ui.Box;
import nk.ft.ui.Button;
import nk.ft.ui.Heading;
import nk.ft.ui.Horizontal;
import nk.ft.ui.Input;
import nk.ft.ui.Segment;
import nk.ft.ui.Table;
import nk.ft.ui.Text;
import nk.ft.ui.UI;
import nk.ft.ui.Vertical;

public class UIImpl implements UI, Updater {

	private Document document;
	private Array<Action> changes;
	private Array<Action> afterChanges;
	private boolean debug = false;
	
	public UIImpl(Document document) {
		this.document = document;
		this.changes = new Array<Action>();
		this.afterChanges = new Array<Action>();
		this.applyChanges();
	}
	
	private void applyChanges() {
		while(this.changes.length > 0) {
			this.changes.shift().call();
		}
		while(this.afterChanges.length > 0) {
			this.afterChanges.shift().call();
		}
	}

	private void scheduleApply() {
		window.requestAnimationFrame((time) -> {
			applyChanges();
		});
	}
	
	@Override
	public void addChange(Action a) {
		if(!debug) {
			this.changes.push(a);	
		} else {
			a.call();
		}
		scheduleApply();
	}
	
	@Override
	public void addAfterChange(Action a) {
		if(!debug) {
			this.afterChanges.push(a);
		} else {
			a.call();
		}
		scheduleApply();
	}
	
	@Override
	public Box box() {
		return new BoxImpl(document, this);
	}

	@Override
	public Vertical vertical() {
		return new VerticalImpl(document, this);
	}
	
	@Override
	public Horizontal horizontal() {
		return new HorizontalImpl(document, this);
	}
	
	@Override
	public Segment segment() {
		return new SegmentImpl(document, this);
	}
	
	@Override
	public Text text() {
		return new TextImpl(document, this);
	}
	
	@Override
	public Heading heading() {
		return new HeadingImpl(document, this);
	}
	
	@Override
	public Button button() {
		return new ButtonImpl(document, this);
	}
	
	@Override
	public Input input() {
		return new InputImpl(document, this);
	}
	
	@Override
	public <T> Table<T> table(Class<T> clazz) {
		return new TableImpl<T>(clazz, document, this);
	}
	
}
