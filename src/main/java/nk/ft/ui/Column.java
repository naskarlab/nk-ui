package nk.ft.ui;

import java.util.List;
import java.util.function.Function;

public interface Column<T> {
	
	Column<T> head(String value);
	
	Column<T> foot(String value);
	
	<R> Column<T> head(Function<List<T>, R> value);
	
	<R> Column<T> foot(Function<List<T>, R> value);
	
	<R> Column<T> value(Function<T, R> value);
	
}
