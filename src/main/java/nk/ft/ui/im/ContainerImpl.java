package nk.ft.ui.im;

import def.dom.Node;
import def.dom.NodeList;
import nk.ft.ui.Bindable;
import nk.ft.ui.Component;

@SuppressWarnings({ "rawtypes", "unchecked" })
public abstract class ContainerImpl<S> extends ComponentImpl<S> implements Bindable<S> {
	
	public ContainerImpl(Updater up) {
		super(up);
	}
	
	public S add(Component c) {
		addChange(e -> {
			((ComponentImpl)c).addChange(other -> {
				e.appendChild(other);
			});
		});
		return (S) this;
	}
	
	public S insert(Component c) {
		addChange(e -> {
			((ComponentImpl)c).addChange(other -> {
				if(e.firstChild != null) {
					e.insertBefore(other, e.firstChild);
				} else {
					e.appendChild(other);
				}
				
			});
		});
		return (S) this;
	}
	
	public S remove(Component c) {
		addChange(e -> {
			((ComponentImpl)c).addChange(other -> {
				e.removeChild(other);
			});
		});
		return (S) this;
	}
	
	public S removeAll() {
		addChange(e -> {
			while(e.childNodes.length > 0) {
				e.removeChild(e.firstChild);
			}	
		});
		return (S) this;
	}
	
	@Override
	public void update() {
		addChange(e -> {
			NodeList list = e.childNodes;
			for(int i = 0; i < list.length; i++) {
				Node node = list.item(i);
				Object c = node.$get("__c");
				if(c != null && c instanceof Bindable<?>) {
					((Bindable<?>)c).update();
				}
			}
		});
	}

}
