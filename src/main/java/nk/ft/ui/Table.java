package nk.ft.ui;

import java.util.List;
import java.util.function.Consumer;

public interface Table<T> extends Component {
	
	Table<T> column(Consumer<Column<T>> call);
	
	Table<T> removeAllColumns();

	Table<T> data(List<T> list);
	
}
