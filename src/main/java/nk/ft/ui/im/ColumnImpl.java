package nk.ft.ui.im;

import java.util.List;
import java.util.function.Function;

import nk.ft.ui.Column;

public class ColumnImpl<T> implements Column<T> {
	
	private Function<List<T>, ?> head;
	private Function<List<T>, ?> foot;
	private Function<T, ?> value;
	
	@Override
	public Column<T> head(String value) {
		return head((l) -> value);
	}
	
	@Override
	public Column<T> foot(String value) {
		return foot((l) -> value);
	}
	
	@Override
	public <R> Column<T> head(Function<List<T>, R> value) {
		this.head = value;
		return this;
	}
	
	@Override
	public <R> Column<T> foot(Function<List<T>, R> value) {
		this.foot = value;
		return this;
	}
	
	@Override
	public <R> Column<T> value(Function<T, R> value) {
		this.value = value;
		return this;
	}
	
	@SuppressWarnings("unchecked")
	public <R> Function<List<T>, R> head() {
		return (Function<List<T>, R>)head;
	}
	
	@SuppressWarnings("unchecked")
	public <R> Function<List<T>, R> foot() {
		return (Function<List<T>, R>)foot;
	}
	
	@SuppressWarnings("unchecked")
	public <R> Function<T, R> value() {
		return (Function<T, R>)value;
	}

}
