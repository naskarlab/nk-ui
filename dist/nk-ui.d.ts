declare namespace nk.ft.http {
    class Client {
        headers: Object;
        constructor();
        header(key: string, value: string): Client;
        get(url: string): nk.ft.http.Request;
        post(url: string): nk.ft.http.Request;
        appendHeaders(r: nk.ft.http.Request): void;
    }
}
declare namespace nk.ft.http.im {
    class BusClient<T> implements nk.ft.http.im.Factory {
        client: nk.ft.http.Client;
        proxy: Object;
        factories: Object;
        constructor(service: T);
        getClient(): nk.ft.http.Client;
        on<R>(call: (p1: T) => R): nk.ft.http.im.Promise<R>;
        /**
         *
         * @param {string} clazzName
         * @return {*}
         */
        create(clazzName: string): any;
        addFactory<M>(clazz: any, getter: () => M): void;
    }
    namespace BusClient {
        class Holder {
            __parent: any;
            value: any;
            constructor(__parent: any);
        }
    }
}
declare namespace nk.ft.http.im {
    class ClientPromiseImpl<T> implements nk.ft.http.im.Promise<T> {
        client: nk.ft.http.Client;
        factory: nk.ft.http.im.Factory;
        className: string;
        method: string;
        params: string;
        constructor(client: nk.ft.http.Client, factory: nk.ft.http.im.Factory, className: string, method: string, params: string);
        /**
         *
         * @param {*} response
         * @param {*} onError
         */
        then(response: (p1: T) => void, onError: (p1: string) => void): void;
        createObject(o: Object): Object;
        createObjectModel(clazzName: string, source: Object): Object;
    }
}
declare namespace nk.ft.http.im {
    interface Factory {
        create(clazzName: string): any;
    }
}
declare namespace nk.ft.http.im {
    interface Promise<T> {
        then(response: (p1: T) => void, onError: (p1: string) => void): any;
    }
}
declare namespace nk.ft.http.im {
    class XHRRequestImpl implements nk.ft.http.Request {
        url: string;
        method: string;
        __body: string;
        headers: Object;
        constructor(method: string, url: string);
        /**
         *
         * @param {string} key
         * @param {string} value
         * @return {*}
         */
        header(key: string, value: string): nk.ft.http.Request;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        path(value: string): nk.ft.http.Request;
        /**
         *
         * @param {string} body
         * @return {*}
         */
        body(body: string): nk.ft.http.Request;
        /**
         *
         * @param {*} call
         * @param {*} onError
         */
        json(call: (p1: Object) => void, onError: (p1: string) => void): void;
        send(call: (p1: XMLHttpRequest) => void, onError: (p1: string) => void): void;
    }
}
declare namespace nk.ft.http {
    interface Request {
        header(key: string, value: string): Request;
        path(value: string): Request;
        body(body: string): Request;
        json(json: (p1: Object) => void, onError: (p1: string) => void): any;
    }
}
declare namespace nk.ft.ui {
    interface Action {
        call(): any;
    }
}
declare namespace nk.ft.ui {
    interface Bindable<Self> {
        update(): any;
    }
}
declare namespace nk.ft.ui {
    interface Box extends nk.ft.ui.Container<Box> {
    }
}
declare namespace nk.ft.ui {
    interface Button extends nk.ft.ui.Component, nk.ft.ui.Styleable<Button>, nk.ft.ui.Clickable<Button> {
        value(value: string): Button;
        click(value: nk.ft.ui.Action): Button;
        primary(): Button;
        asLink(): Button;
    }
}
declare namespace nk.ft.ui {
    interface Changer<R, S> {
        fire(oldValue: R, newValue: S): any;
    }
}
declare namespace nk.ft.ui {
    interface Clickable<Self> {
        click(value: nk.ft.ui.Action): Self;
    }
}
declare namespace nk.ft.ui {
    interface ClickListener<Self> {
        click(value: nk.ft.ui.Action): Self;
    }
}
declare namespace nk.ft.ui {
    interface Column<T> {
        head(value?: any): any;
        foot(value?: any): any;
        value<R>(value: (p1: T) => R): Column<T>;
    }
}
declare namespace nk.ft.ui {
    interface Component {
        addAfterChange(action: nk.ft.ui.Action): any;
    }
}
declare namespace nk.ft.ui {
    interface Container<Self> extends nk.ft.ui.Component, nk.ft.ui.Clickable<Self>, nk.ft.ui.Styleable<Self>, nk.ft.ui.Bindable<Self> {
        insert(c: nk.ft.ui.Component): Self;
        add(c: nk.ft.ui.Component): Self;
        remove(c: nk.ft.ui.Component): Self;
        removeAll(): Self;
    }
}
declare namespace nk.ft.ui.ext {
    interface Layout {
    }
    namespace Layout {
        let CENTER: string;
        let CONTAINER: string;
        let LEFT: string;
        let RIGHT: string;
        let STICKY: string;
        let WRAPPER: string;
    }
}
declare namespace nk.ft.ui.ext {
    class UIX implements nk.ft.ui.UI {
        ui: nk.ft.ui.UI;
        constructor(ui: nk.ft.ui.UI);
        text$java_lang_String(value: string): nk.ft.ui.Text;
        text(value?: any): any;
        container(): nk.ft.ui.Box;
        left(c: nk.ft.ui.Component): nk.ft.ui.Box;
        right(c: nk.ft.ui.Component): nk.ft.ui.Box;
        button$java_lang_String(value: string): nk.ft.ui.Button;
        button(value?: any): any;
        box(): nk.ft.ui.Box;
        segment(): nk.ft.ui.Segment;
        vertical(): nk.ft.ui.Vertical;
        horizontal(): nk.ft.ui.Horizontal;
        wrapper(): nk.ft.ui.Box;
        text$(): nk.ft.ui.Text;
        heading(): nk.ft.ui.Heading;
        button$(): nk.ft.ui.Button;
        input(): nk.ft.ui.Input;
        table<T>(clazz: any): nk.ft.ui.Table<T>;
    }
}
declare namespace nk.ft.ui {
    interface FunctionalAction {
        (): any;
    }
}
declare namespace nk.ft.ui {
    interface Getter<T> {
        get(): T;
    }
}
declare namespace nk.ft.ui {
    interface Heading extends nk.ft.ui.Component {
        title(value: string): Heading;
        subtitle(value: string): Heading;
        section(value: string): Heading;
        content(value: string): Heading;
    }
}
declare namespace nk.ft.ui {
    interface Horizontal extends nk.ft.ui.Container<Horizontal> {
    }
}
declare namespace nk.ft.ui.im {
    class ColumnImpl<T> implements nk.ft.ui.Column<T> {
        __head: (p1: Array<T>) => any;
        __foot: (p1: Array<T>) => any;
        __value: (p1: T) => any;
        head$java_lang_String(value: string): nk.ft.ui.Column<T>;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        head(value?: any): any;
        foot$java_lang_String(value: string): nk.ft.ui.Column<T>;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        foot(value?: any): any;
        head$java_util_function_Function<R>(value: (p1: Array<T>) => R): nk.ft.ui.Column<T>;
        foot$java_util_function_Function<R>(value: (p1: Array<T>) => R): nk.ft.ui.Column<T>;
        value$java_util_function_Function<R>(value: (p1: T) => R): nk.ft.ui.Column<T>;
        /**
         *
         * @param {*} value
         * @return {*}
         */
        value<R>(value?: any): any;
        head$<R>(): (p1: Array<T>) => R;
        foot$<R>(): (p1: Array<T>) => R;
        value$<R>(): (p1: T) => R;
        constructor();
    }
}
declare namespace nk.ft.ui.im {
    abstract class ComponentImpl<Self> implements nk.ft.ui.Component, nk.ft.ui.Styleable<Self>, nk.ft.ui.Clickable<Self> {
        up: nk.ft.ui.im.Updater;
        constructor(up: nk.ft.ui.im.Updater);
        abstract element(): HTMLElement;
        addChange(action: nk.ft.ui.im.ElementChange): void;
        /**
         *
         * @param {*} action
         */
        addAfterChange(action: nk.ft.ui.Action): void;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        addClassName(value: string): Self;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        removeClassName(value: string): Self;
        /**
         *
         * @param {string} state1
         * @param {string} state2
         * @return {*}
         */
        toogleClass(state1: string, state2: string): Self;
        click(value: nk.ft.ui.Action): Self;
    }
}
declare namespace nk.ft.ui.im {
    interface ElementChange {
        change(e: HTMLElement): any;
    }
}
declare namespace nk.ft.ui.im {
    class UIImpl implements nk.ft.ui.UI, nk.ft.ui.im.Updater {
        document: Document;
        changes: Array<nk.ft.ui.Action>;
        afterChanges: Array<nk.ft.ui.Action>;
        debug: boolean;
        constructor(document: Document);
        applyChanges(): void;
        /**
         *
         * @param {*} a
         */
        addChange(a: nk.ft.ui.Action): void;
        /**
         *
         * @param {*} a
         */
        addAfterChange(a: nk.ft.ui.Action): void;
        /**
         *
         * @return {*}
         */
        box(): nk.ft.ui.Box;
        /**
         *
         * @return {*}
         */
        vertical(): nk.ft.ui.Vertical;
        /**
         *
         * @return {*}
         */
        horizontal(): nk.ft.ui.Horizontal;
        /**
         *
         * @return {*}
         */
        segment(): nk.ft.ui.Segment;
        /**
         *
         * @return {*}
         */
        text(): nk.ft.ui.Text;
        /**
         *
         * @return {*}
         */
        heading(): nk.ft.ui.Heading;
        /**
         *
         * @return {*}
         */
        button(): nk.ft.ui.Button;
        /**
         *
         * @return {*}
         */
        input(): nk.ft.ui.Input;
        /**
         *
         * @param {*} clazz
         * @return {*}
         */
        table<T>(clazz: any): nk.ft.ui.Table<T>;
    }
}
declare namespace nk.ft.ui.im {
    interface Updater {
        addChange(a: nk.ft.ui.Action): any;
        addAfterChange(a: nk.ft.ui.Action): any;
    }
}
declare namespace nk.ft.ui {
    interface Input extends nk.ft.ui.Component, nk.ft.ui.Styleable<Input> {
        label(value: string): Input;
        value(value?: any): any;
        typeNumber(): Input;
        typePassword(): Input;
        hint(value: string): Input;
        msg(v: string): Input;
    }
}
declare namespace nk.ft.ui {
    interface Item extends nk.ft.ui.Container<Item>, nk.ft.ui.Clickable<Item> {
    }
}
declare namespace nk.ft.ui {
    interface Segment extends nk.ft.ui.Container<Segment>, nk.ft.ui.Clickable<Segment> {
    }
}
declare namespace nk.ft.ui {
    interface Styleable<Self> {
        addClassName(value: string): Self;
        removeClassName(value: string): Self;
        toogleClass(state1: string, state2: string): Self;
    }
}
declare namespace nk.ft.ui {
    interface Table<T> extends nk.ft.ui.Component {
        column(call: (p1: nk.ft.ui.Column<T>) => void): Table<T>;
        removeAllColumns(): Table<T>;
        data(list: Array<T>): Table<T>;
    }
}
declare namespace nk.ft.ui {
    interface Text extends nk.ft.ui.Component, nk.ft.ui.Styleable<Text>, nk.ft.ui.ClickListener<Text>, nk.ft.ui.Bindable<Text> {
        content(value: string): Text;
        bind(getter: nk.ft.ui.Getter<string>): Text;
    }
}
declare namespace nk.ft.ui {
    interface UI {
        box(): nk.ft.ui.Box;
        segment(): nk.ft.ui.Segment;
        vertical(): nk.ft.ui.Vertical;
        horizontal(): nk.ft.ui.Horizontal;
        text(): nk.ft.ui.Text;
        heading(): nk.ft.ui.Heading;
        button(): nk.ft.ui.Button;
        input(): nk.ft.ui.Input;
        table<T>(clazz: any): nk.ft.ui.Table<T>;
    }
}
declare namespace nk.ft.ui {
    interface Vertical extends nk.ft.ui.Container<Vertical> {
    }
}
declare namespace nk.ft.vw.im {
    class CloseableImpl {
        delegate: nk.ft.ui.Action;
        setDelegate(delegate: nk.ft.ui.Action): void;
        call(): void;
        constructor();
    }
}
declare namespace nk.ft.vw.im {
    class ViewManagerImpl implements nk.ft.vw.ViewManager {
        document: Document;
        root: Element;
        stack: Array<HTMLDivElement>;
        constructor(window: Window, document: Document, selector: string);
        /**
         *
         * @param {*} action
         */
        open(action: (p1: nk.ft.ui.Action) => nk.ft.ui.Component): void;
        pop$def_dom_HTMLDivElement(element: HTMLDivElement): void;
        pop(element?: any): any;
        pop$(): void;
        static setVisible(e: HTMLDivElement, value: boolean): void;
    }
}
declare namespace nk.ft.vw {
    interface ViewManager {
        open(action: (p1: nk.ft.ui.Action) => nk.ft.ui.Component): any;
    }
}
declare namespace nk.ft.ui.im {
    class ButtonImpl extends nk.ft.ui.im.ComponentImpl<nk.ft.ui.Button> implements nk.ft.ui.Button {
        document: Document;
        __element: HTMLButtonElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        value(value: string): nk.ft.ui.Button;
        /**
         *
         * @return {*}
         */
        primary(): nk.ft.ui.Button;
        /**
         *
         * @return {*}
         */
        asLink(): nk.ft.ui.Button;
    }
}
declare namespace nk.ft.ui.im {
    abstract class ContainerImpl<S> extends nk.ft.ui.im.ComponentImpl<S> implements nk.ft.ui.Bindable<S> {
        constructor(up: nk.ft.ui.im.Updater);
        add(c: nk.ft.ui.Component): S;
        insert(c: nk.ft.ui.Component): S;
        remove(c: nk.ft.ui.Component): S;
        removeAll(): S;
        /**
         *
         */
        update(): void;
    }
}
declare namespace nk.ft.ui.im {
    class HeadingImpl extends nk.ft.ui.im.ComponentImpl<nk.ft.ui.Heading> implements nk.ft.ui.Heading {
        __element: HTMLElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
        content(value: string): nk.ft.ui.Heading;
        title(value: string): nk.ft.ui.Heading;
        subtitle(value: string): nk.ft.ui.Heading;
        section(value: string): nk.ft.ui.Heading;
    }
}
declare namespace nk.ft.ui.im {
    class InputImpl extends nk.ft.ui.im.ComponentImpl<nk.ft.ui.Input> implements nk.ft.ui.Input {
        __element: HTMLDivElement;
        __label: HTMLLabelElement;
        input: HTMLInputElement;
        span: HTMLSpanElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        label(value: string): nk.ft.ui.Input;
        /**
         *
         * @return {*}
         */
        typeNumber(): nk.ft.ui.Input;
        /**
         *
         * @return {*}
         */
        typePassword(): nk.ft.ui.Input;
        /**
         *
         * @param {string} v
         * @return {*}
         */
        msg(v: string): nk.ft.ui.Input;
        value$java_lang_String(value: string): nk.ft.ui.Input;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        value(value?: any): any;
        value$(): string;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        hint(value: string): nk.ft.ui.Input;
    }
}
declare namespace nk.ft.ui.im {
    class TableImpl<T> extends nk.ft.ui.im.ComponentImpl<nk.ft.ui.Table<T>> implements nk.ft.ui.Table<T> {
        document: Document;
        __element: HTMLTableElement;
        columns: Array<(p1: nk.ft.ui.Column<T>) => void>;
        constructor(clazz: any, document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
        /**
         *
         * @param {*} call
         * @return {*}
         */
        column(call: (p1: nk.ft.ui.Column<T>) => void): nk.ft.ui.Table<T>;
        /**
         *
         * @param {*[]} list
         * @return {*}
         */
        data(list: Array<T>): nk.ft.ui.Table<T>;
        convertNode(tmp: any): Node;
        render(headValues: Array<TableImpl.FactoryNode>, bodyValues: Array<Array<TableImpl.FactoryNode>>, footValues: Array<TableImpl.FactoryNode>): void;
        /**
         *
         * @return {*}
         */
        removeAllColumns(): nk.ft.ui.Table<T>;
    }
    namespace TableImpl {
        interface FactoryNode {
            (): Node;
        }
    }
}
declare namespace nk.ft.ui.im {
    class TextImpl extends nk.ft.ui.im.ComponentImpl<nk.ft.ui.Text> implements nk.ft.ui.Text {
        getter: nk.ft.ui.Getter<string>;
        __element: HTMLElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
        /**
         *
         * @param {string} value
         * @return {*}
         */
        content(value: string): nk.ft.ui.Text;
        /**
         *
         * @param {*} getter
         * @return {*}
         */
        bind(getter: nk.ft.ui.Getter<string>): nk.ft.ui.Text;
        /**
         *
         */
        update(): void;
    }
}
declare namespace nk.ft.ui.im {
    class BoxImpl extends nk.ft.ui.im.ContainerImpl<nk.ft.ui.Box> implements nk.ft.ui.Box {
        __element: HTMLDivElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
    }
}
declare namespace nk.ft.ui.im {
    class HorizontalImpl extends nk.ft.ui.im.ContainerImpl<nk.ft.ui.Horizontal> implements nk.ft.ui.Horizontal {
        __element: HTMLDivElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
    }
}
declare namespace nk.ft.ui.im {
    class ItemImpl extends nk.ft.ui.im.ContainerImpl<nk.ft.ui.Item> implements nk.ft.ui.Item {
        __element: HTMLDivElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
    }
}
declare namespace nk.ft.ui.im {
    class SegmentImpl extends nk.ft.ui.im.ContainerImpl<nk.ft.ui.Segment> implements nk.ft.ui.Segment {
        __element: HTMLDivElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
    }
}
declare namespace nk.ft.ui.im {
    class VerticalImpl extends nk.ft.ui.im.ContainerImpl<nk.ft.ui.Vertical> implements nk.ft.ui.Vertical {
        __element: HTMLDivElement;
        constructor(document: Document, up: nk.ft.ui.im.Updater);
        /**
         *
         * @return {HTMLElement}
         */
        element(): HTMLElement;
    }
}
