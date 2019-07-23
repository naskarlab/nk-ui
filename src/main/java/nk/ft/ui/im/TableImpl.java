package nk.ft.ui.im;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import def.dom.Document;
import def.dom.HTMLElement;
import def.dom.HTMLTableCellElement;
import def.dom.HTMLTableElement;
import def.dom.HTMLTableRowElement;
import def.dom.HTMLTableSectionElement;
import def.dom.Node;
import nk.ft.ui.Column;
import nk.ft.ui.Component;
import nk.ft.ui.Table;

public class TableImpl<T> extends ComponentImpl<Table<T>> implements Table<T> {
	
	@FunctionalInterface
	private interface FactoryNode {
		Node create();
	}
	
	private Document document;
	private HTMLTableElement element;
	
	private List<Consumer<Column<T>>> columns;
	
	public TableImpl(Class<T> clazz, Document document, Updater up) {
		super(up);
		this.document = document;
		up.addChange(() -> {
			this.element = (HTMLTableElement) document.createElement("table");
			this.element.$set("__c", this);
			this.element.className = "nk-table";
		});
		
		this.columns = new ArrayList<Consumer<Column<T>>>();
	}
	
	@Override
	public HTMLElement element() {
		return element;
	}
	
	@Override
	public Table<T> column(Consumer<Column<T>> call) {
		this.columns.add(call);
		return this;
	}
	
	@Override
	public Table<T> data(List<T> list) {
		List<ColumnImpl<T>> cols = new ArrayList<ColumnImpl<T>>();
		
		List<FactoryNode> headValues = new ArrayList<FactoryNode>();
		List<List<FactoryNode>> bodyValues = new ArrayList<List<FactoryNode>>();
		List<FactoryNode> footValues = new ArrayList<FactoryNode>();
		
		columns.forEach((cc) -> {
			
			ColumnImpl<T> c = new ColumnImpl<T>();
			cc.accept(c);
			cols.add(c);
			
			if(c.head() != null) {
				Object tmp = c.head().apply(list);
				headValues.add(() -> convertNode(tmp));
			}
			
			if(c.foot() != null) {
				Object tmp = c.foot().apply(list);
				footValues.add(() -> convertNode(tmp));
			}
			
		});
		
		list.forEach(i -> {
			
			List<FactoryNode> row = new ArrayList<FactoryNode>(cols.size());
			cols.forEach(c -> {
			
				Object tmp = c.value().apply(i);
				row.add(() -> convertNode(tmp));
				
			});
			bodyValues.add(row);
			
		});
		
		removeAllColumns();
		
		addChange(e -> {
			render(headValues, bodyValues, footValues);	
		});
		
		return this;
	}
	
	@SuppressWarnings("rawtypes")
	private  Node convertNode(Object tmp) {
		Node node = null;
		
		if(tmp instanceof Component) {
			node = ((ComponentImpl)tmp).element();
			
		} else if(tmp instanceof Node) {
			node = (Node)tmp;
			
		} else {
			node = document.createTextNode((String)tmp);
			
		}
		
		return node;
	}
	
	private void render( 
			List<FactoryNode> headValues, 
			List<List<FactoryNode>> bodyValues,
			List<FactoryNode> footValues) {
		
		if(!headValues.isEmpty()) {
			
			HTMLTableSectionElement section = (HTMLTableSectionElement) element.createTHead();
			HTMLTableRowElement row = (HTMLTableRowElement) section.insertRow();
			for(FactoryNode n : headValues) {
				HTMLTableCellElement cell = (HTMLTableCellElement) row.insertCell();
				if(n != null) {
					cell.appendChild(n.create());
				}
			}
			
		}
		
		if(!bodyValues.isEmpty()) {
			
			HTMLTableSectionElement section = (HTMLTableSectionElement) element.createTBody();
			for(List<FactoryNode> values : bodyValues) {
				
				HTMLTableRowElement row = (HTMLTableRowElement) section.insertRow();
				for(FactoryNode n : values) {
					HTMLTableCellElement cell = (HTMLTableCellElement) row.insertCell();
					if(n != null) {
						cell.appendChild(n.create());
					}
				}
				
			}
			
		}
		
		if(!footValues.isEmpty()) {
			
			HTMLTableSectionElement section = (HTMLTableSectionElement) element.createTFoot();
			HTMLTableRowElement row = (HTMLTableRowElement) section.insertRow();
			for(FactoryNode n : footValues) {
				HTMLTableCellElement cell = (HTMLTableCellElement) row.insertCell();
				if(n != null) {
					cell.appendChild(n.create());
				}
			}
			
		}		
	}
	
	@Override
	public Table<T> removeAllColumns() {
		addChange(e -> {
			while(e.childNodes.length > 0) {
				e.removeChild(e.firstChild);
			}
		});
		return this;
	}
	
}
