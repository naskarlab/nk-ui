package nk.ft.http.im;

import java.util.function.Consumer;

public interface Promise<T> {

	void then(Consumer<T> response, Consumer<String> onError);

}
