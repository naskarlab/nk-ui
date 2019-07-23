var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* Generated from Java with JSweet 2.3.1-SNAPSHOT - http://www.jsweet.org */
var nk;
(function (nk) {
    var ft;
    (function (ft) {
        var http;
        (function (http) {
            var Client = /** @class */ (function () {
                function Client() {
                    if (this.headers === undefined)
                        this.headers = null;
                    this.headers = new Object();
                }
                Client.prototype.header = function (key, value) {
                    this.headers[key] = value;
                    return this;
                };
                Client.prototype.get = function (url) {
                    var r = new nk.ft.http.im.XHRRequestImpl("GET", url);
                    this.appendHeaders(r);
                    return r;
                };
                Client.prototype.post = function (url) {
                    var r = new nk.ft.http.im.XHRRequestImpl("POST", url);
                    this.appendHeaders(r);
                    return r;
                };
                /*private*/ Client.prototype.appendHeaders = function (r) {
                    var keys = Object.keys(this.headers);
                    for (var i = 0; i < keys.length; i++) {
                        {
                            var k = keys[i];
                            r.header(k, (this.headers[k]));
                        }
                        ;
                    }
                };
                return Client;
            }());
            http.Client = Client;
            Client["__class"] = "nk.ft.http.Client";
        })(http = ft.http || (ft.http = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var http;
        (function (http) {
            var im;
            (function (im) {
                var BusClient = /** @class */ (function () {
                    function BusClient(service) {
                        if (this.client === undefined)
                            this.client = null;
                        if (this.proxy === undefined)
                            this.proxy = null;
                        if (this.factories === undefined)
                            this.factories = null;
                        this.factories = {};
                        this.client = new nk.ft.http.Client().header("Content-type", "application/json");
                        this.proxy = new Object();
                        var keys = Object.getOwnPropertyNames(Object.getPrototypeOf(service));
                        var c = this.client;
                        var f = this;
                        for (var index121 = 0; index121 < keys.length; index121++) {
                            var method = keys[index121];
                            {
                                this.proxy[method] = ((function (c, method, f) {
                                    return function () {
                                        var className = (function (c) { return c["__class"] ? c["__class"] : c["name"]; })(service.constructor).split(".").join("/");
                                        var json = JSON.stringify(arguments);
                                        console.log(className + "." + method + "(" + json + ")");
                                        return new nk.ft.http.im.ClientPromiseImpl(c, f, className, method, json);
                                    };
                                })(c, method, f));
                            }
                        }
                    }
                    BusClient.prototype.getClient = function () {
                        return this.client;
                    };
                    BusClient.prototype.on = function (call) {
                        var _this = this;
                        return (function (target) { return (typeof target === 'function') ? target(_this.proxy) : target.apply(_this.proxy); })(call);
                    };
                    /**
                     *
                     * @param {string} clazzName
                     * @return {*}
                     */
                    BusClient.prototype.create = function (clazzName) {
                        var getter = (this.factories[clazzName]);
                        if (getter == null) {
                            var clazz = eval(clazzName);
                            return /* newInstance */ new (clazz)();
                        }
                        else {
                            return (function (target) { return (typeof target === 'function') ? target() : target.get(); })(getter);
                        }
                    };
                    BusClient.prototype.addFactory = function (clazz, getter) {
                        this.factories[ /* getName */(function (c) { return c["__class"] ? c["__class"] : c["name"]; })(clazz)] = getter;
                    };
                    return BusClient;
                }());
                im.BusClient = BusClient;
                BusClient["__class"] = "nk.ft.http.im.BusClient";
                BusClient["__interfaces"] = ["nk.ft.http.im.Factory"];
                (function (BusClient) {
                    var Holder = /** @class */ (function () {
                        function Holder(__parent) {
                            this.__parent = __parent;
                            if (this.value === undefined)
                                this.value = null;
                        }
                        return Holder;
                    }());
                    BusClient.Holder = Holder;
                    Holder["__class"] = "nk.ft.http.im.BusClient.Holder";
                })(BusClient = im.BusClient || (im.BusClient = {}));
            })(im = http.im || (http.im = {}));
        })(http = ft.http || (ft.http = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var http;
        (function (http) {
            var im;
            (function (im) {
                var ClientPromiseImpl = /** @class */ (function () {
                    function ClientPromiseImpl(client, factory, className, method, params) {
                        if (this.client === undefined)
                            this.client = null;
                        if (this.factory === undefined)
                            this.factory = null;
                        if (this.className === undefined)
                            this.className = null;
                        if (this.method === undefined)
                            this.method = null;
                        if (this.params === undefined)
                            this.params = null;
                        this.client = client;
                        this.factory = factory;
                        this.className = className;
                        this.method = method;
                        this.params = params;
                    }
                    /**
                     *
                     * @param {*} response
                     * @param {*} onError
                     */
                    ClientPromiseImpl.prototype.then = function (response, onError) {
                        var _this = this;
                        this.client.post("bus/" + this.className + "/" + this.method).body(this.params).json(function (o) {
                            try {
                                var m_1 = _this.createObject(o);
                                (function (target) { return (typeof target === 'function') ? target(m_1) : target.accept(m_1); })(response);
                            }
                            catch (e) {
                                console.error(e);
                                console.trace();
                                (function (target) { return (typeof target === 'function') ? target(e.message) : target.accept(e.message); })(onError);
                            }
                            ;
                        }, (onError));
                    };
                    /*private*/ ClientPromiseImpl.prototype.createObject = function (o) {
                        var m = null;
                        var t = (o["t"]);
                        var s = (o["s"]);
                        var d = (o["d"]);
                        if (d != null) {
                            if ( /* equals */(function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })("array", t)) {
                                var list = (new Array());
                                {
                                    var array123 = Object.keys(d);
                                    for (var index122 = 0; index122 < array123.length; index122++) {
                                        var key = array123[index122];
                                        {
                                            list.push(this.createObjectModel(s, (d[key])));
                                        }
                                    }
                                }
                                m = list;
                            }
                            else {
                                m = this.createObjectModel(t, d);
                            }
                        }
                        return m;
                    };
                    /*private*/ ClientPromiseImpl.prototype.createObjectModel = function (clazzName, source) {
                        var model = new Object(this.factory.create(clazzName));
                        {
                            var array125 = Object.keys(source);
                            for (var index124 = 0; index124 < array125.length; index124++) {
                                var prop = array125[index124];
                                {
                                    model[prop] = source[prop];
                                }
                            }
                        }
                        return model;
                    };
                    return ClientPromiseImpl;
                }());
                im.ClientPromiseImpl = ClientPromiseImpl;
                ClientPromiseImpl["__class"] = "nk.ft.http.im.ClientPromiseImpl";
                ClientPromiseImpl["__interfaces"] = ["nk.ft.http.im.Promise"];
            })(im = http.im || (http.im = {}));
        })(http = ft.http || (ft.http = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var http;
        (function (http) {
            var im;
            (function (im) {
                var XHRRequestImpl = /** @class */ (function () {
                    function XHRRequestImpl(method, url) {
                        if (this.url === undefined)
                            this.url = null;
                        if (this.method === undefined)
                            this.method = null;
                        if (this.__body === undefined)
                            this.__body = null;
                        if (this.headers === undefined)
                            this.headers = null;
                        this.method = method;
                        this.url = url;
                        this.headers = new Object();
                    }
                    /**
                     *
                     * @param {string} key
                     * @param {string} value
                     * @return {*}
                     */
                    XHRRequestImpl.prototype.header = function (key, value) {
                        this.headers[key] = value;
                        return this;
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    XHRRequestImpl.prototype.path = function (value) {
                        this.url += "/" + value;
                        return this;
                    };
                    /**
                     *
                     * @param {string} body
                     * @return {*}
                     */
                    XHRRequestImpl.prototype.body = function (body) {
                        this.__body = body;
                        return this;
                    };
                    /**
                     *
                     * @param {*} call
                     * @param {*} onError
                     */
                    XHRRequestImpl.prototype.json = function (call, onError) {
                        this.send(function (xhr) {
                            console.log(">>: " + xhr.responseText);
                            (function (target) { return (typeof target === 'function') ? target(new Object(JSON.parse(xhr.responseText))) : target.accept(new Object(JSON.parse(xhr.responseText))); })(call);
                        }, (onError));
                    };
                    /*private*/ XHRRequestImpl.prototype.send = function (call, onError) {
                        var xhr = new XMLHttpRequest();
                        xhr.open(this.method, this.url);
                        xhr.onreadystatechange = (function (xhr) {
                            return function (e) {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        (function (target) { return (typeof target === 'function') ? target(xhr) : target.accept(xhr); })(call);
                                    }
                                    else {
                                        (function (target) { return (typeof target === 'function') ? target(xhr.statusText + " " + xhr.responseText) : target.accept(xhr.statusText + " " + xhr.responseText); })(onError);
                                    }
                                }
                                return new Object();
                            };
                        })(xhr);
                        if (onError != null) {
                            xhr.onerror = (function (xhr) {
                                return function (e) {
                                    (function (target) { return (typeof target === 'function') ? target(xhr.statusText + " " + xhr.responseText) : target.accept(xhr.statusText + " " + xhr.responseText); })(onError);
                                    return null;
                                };
                            })(xhr);
                        }
                        if (this.__body != null) {
                            xhr.send(this.__body);
                        }
                        else {
                            xhr.send();
                        }
                    };
                    return XHRRequestImpl;
                }());
                im.XHRRequestImpl = XHRRequestImpl;
                XHRRequestImpl["__class"] = "nk.ft.http.im.XHRRequestImpl";
                XHRRequestImpl["__interfaces"] = ["nk.ft.http.Request"];
            })(im = http.im || (http.im = {}));
        })(http = ft.http || (ft.http = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var ext;
            (function (ext) {
                var Layout;
                (function (Layout) {
                    Layout.CENTER = "nk-c";
                    Layout.CONTAINER = "nk-t";
                    Layout.LEFT = "nk-l";
                    Layout.RIGHT = "nk-r";
                    Layout.STICKY = "nk-st";
                    Layout.WRAPPER = "nk-w";
                })(Layout = ext.Layout || (ext.Layout = {}));
            })(ext = ui.ext || (ui.ext = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui_1) {
            var ext;
            (function (ext) {
                var UIX = /** @class */ (function () {
                    function UIX(ui) {
                        if (this.ui === undefined)
                            this.ui = null;
                        this.ui = ui;
                    }
                    UIX.prototype.text$java_lang_String = function (value) {
                        return this.ui.text().content(value);
                    };
                    UIX.prototype.text = function (value) {
                        if (((typeof value === 'string') || value === null)) {
                            return this.text$java_lang_String(value);
                        }
                        else if (value === undefined) {
                            return this.text$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    UIX.prototype.container = function () {
                        return this.ui.box().addClassName(nk.ft.ui.ext.Layout.CONTAINER);
                    };
                    UIX.prototype.left = function (c) {
                        return this.ui.box().addClassName(nk.ft.ui.ext.Layout.LEFT).add(c);
                    };
                    UIX.prototype.right = function (c) {
                        return this.ui.box().addClassName(nk.ft.ui.ext.Layout.RIGHT).add(c);
                    };
                    UIX.prototype.button$java_lang_String = function (value) {
                        return this.ui.button().value(value);
                    };
                    UIX.prototype.button = function (value) {
                        if (((typeof value === 'string') || value === null)) {
                            return this.button$java_lang_String(value);
                        }
                        else if (value === undefined) {
                            return this.button$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    UIX.prototype.box = function () {
                        return this.ui.box();
                    };
                    UIX.prototype.segment = function () {
                        return this.ui.segment();
                    };
                    UIX.prototype.vertical = function () {
                        return this.ui.vertical();
                    };
                    UIX.prototype.horizontal = function () {
                        return this.ui.horizontal();
                    };
                    UIX.prototype.wrapper = function () {
                        return this.ui.box().addClassName(nk.ft.ui.ext.Layout.WRAPPER);
                    };
                    UIX.prototype.text$ = function () {
                        return this.ui.text();
                    };
                    UIX.prototype.heading = function () {
                        return this.ui.heading();
                    };
                    UIX.prototype.button$ = function () {
                        return this.ui.button();
                    };
                    UIX.prototype.input = function () {
                        return this.ui.input();
                    };
                    UIX.prototype.table = function (clazz) {
                        return this.ui.table(clazz);
                    };
                    return UIX;
                }());
                ext.UIX = UIX;
                UIX["__class"] = "nk.ft.ui.ext.UIX";
                UIX["__interfaces"] = ["nk.ft.ui.UI"];
            })(ext = ui_1.ext || (ui_1.ext = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var ColumnImpl = /** @class */ (function () {
                    function ColumnImpl() {
                        if (this.__head === undefined)
                            this.__head = null;
                        if (this.__foot === undefined)
                            this.__foot = null;
                        if (this.__value === undefined)
                            this.__value = null;
                    }
                    ColumnImpl.prototype.head$java_lang_String = function (value) {
                        return this.head$java_util_function_Function(function (l) { return value; });
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    ColumnImpl.prototype.head = function (value) {
                        if (((typeof value === 'string') || value === null)) {
                            return this.head$java_lang_String(value);
                        }
                        else if (((typeof value === 'function' && value.length == 1) || value === null)) {
                            return this.head$java_util_function_Function(value);
                        }
                        else if (value === undefined) {
                            return this.head$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    ColumnImpl.prototype.foot$java_lang_String = function (value) {
                        return this.foot$java_util_function_Function(function (l) { return value; });
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    ColumnImpl.prototype.foot = function (value) {
                        if (((typeof value === 'string') || value === null)) {
                            return this.foot$java_lang_String(value);
                        }
                        else if (((typeof value === 'function' && value.length == 1) || value === null)) {
                            return this.foot$java_util_function_Function(value);
                        }
                        else if (value === undefined) {
                            return this.foot$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    ColumnImpl.prototype.head$java_util_function_Function = function (value) {
                        this.__head = (value);
                        return this;
                    };
                    ColumnImpl.prototype.foot$java_util_function_Function = function (value) {
                        this.__foot = (value);
                        return this;
                    };
                    ColumnImpl.prototype.value$java_util_function_Function = function (value) {
                        this.__value = (value);
                        return this;
                    };
                    /**
                     *
                     * @param {*} value
                     * @return {*}
                     */
                    ColumnImpl.prototype.value = function (value) {
                        if (((typeof value === 'function' && value.length == 1) || value === null)) {
                            return this.value$java_util_function_Function(value);
                        }
                        else if (value === undefined) {
                            return this.value$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    ColumnImpl.prototype.head$ = function () {
                        return (this.__head);
                    };
                    ColumnImpl.prototype.foot$ = function () {
                        return (this.__foot);
                    };
                    ColumnImpl.prototype.value$ = function () {
                        return (this.__value);
                    };
                    return ColumnImpl;
                }());
                im.ColumnImpl = ColumnImpl;
                ColumnImpl["__class"] = "nk.ft.ui.im.ColumnImpl";
                ColumnImpl["__interfaces"] = ["nk.ft.ui.Column"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var ComponentImpl = /** @class */ (function () {
                    function ComponentImpl(up) {
                        if (this.up === undefined)
                            this.up = null;
                        this.up = up;
                    }
                    ComponentImpl.prototype.addChange = function (action) {
                        var _this = this;
                        this.up.addChange({ call: function () {
                                action.change(_this.element());
                            } });
                    };
                    /**
                     *
                     * @param {*} action
                     */
                    ComponentImpl.prototype.addAfterChange = function (action) {
                        this.up.addAfterChange(action);
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    ComponentImpl.prototype.addClassName = function (value) {
                        this.addChange({ change: function (e) {
                                var l = value.split(" ");
                                for (var index126 = 0; index126 < l.length; index126++) {
                                    var name_1 = l[index126];
                                    {
                                        e.classList.add(name_1);
                                    }
                                }
                            } });
                        return this;
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    ComponentImpl.prototype.removeClassName = function (value) {
                        this.addChange({ change: function (e) {
                                var l = value.split(" ");
                                for (var index127 = 0; index127 < l.length; index127++) {
                                    var name_2 = l[index127];
                                    {
                                        e.classList.remove(name_2);
                                    }
                                }
                            } });
                        return this;
                    };
                    /**
                     *
                     * @param {string} state1
                     * @param {string} state2
                     * @return {*}
                     */
                    ComponentImpl.prototype.toogleClass = function (state1, state2) {
                        this.addChange({ change: function (e) {
                                if (e.classList.contains(state1)) {
                                    e.classList.remove(state1);
                                    e.classList.add(state2);
                                }
                                else if (e.classList.contains(state2)) {
                                    e.classList.remove(state2);
                                    e.classList.add(state1);
                                }
                            } });
                        return this;
                    };
                    ComponentImpl.prototype.click = function (value) {
                        this.addClassName("nk-event");
                        this.addChange({ change: function (e) {
                                e.addEventListener("click", function (evt) {
                                    value.call();
                                });
                            } });
                        return this;
                    };
                    return ComponentImpl;
                }());
                im.ComponentImpl = ComponentImpl;
                ComponentImpl["__class"] = "nk.ft.ui.im.ComponentImpl";
                ComponentImpl["__interfaces"] = ["nk.ft.ui.Clickable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var UIImpl = /** @class */ (function () {
                    function UIImpl(document) {
                        /*private*/ this.debug = false;
                        if (this.document === undefined)
                            this.document = null;
                        if (this.changes === undefined)
                            this.changes = null;
                        if (this.afterChanges === undefined)
                            this.afterChanges = null;
                        this.document = document;
                        this.changes = (new Array());
                        this.afterChanges = (new Array());
                        this.applyChanges();
                    }
                    /*private*/ UIImpl.prototype.applyChanges = function () {
                        var _this = this;
                        while ((this.changes.length > 0)) {
                            {
                                this.changes.shift().call();
                            }
                        }
                        ;
                        while ((this.afterChanges.length > 0)) {
                            {
                                this.afterChanges.shift().call();
                            }
                        }
                        ;
                        window.requestAnimationFrame(function (time) {
                            _this.applyChanges();
                        });
                    };
                    /**
                     *
                     * @param {*} a
                     */
                    UIImpl.prototype.addChange = function (a) {
                        if (!this.debug) {
                            this.changes.push(a);
                        }
                        else {
                            a.call();
                        }
                    };
                    /**
                     *
                     * @param {*} a
                     */
                    UIImpl.prototype.addAfterChange = function (a) {
                        if (!this.debug) {
                            this.afterChanges.push(a);
                        }
                        else {
                            a.call();
                        }
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.box = function () {
                        return new nk.ft.ui.im.BoxImpl(this.document, this);
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.vertical = function () {
                        return new nk.ft.ui.im.VerticalImpl(this.document, this);
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.horizontal = function () {
                        return new nk.ft.ui.im.HorizontalImpl(this.document, this);
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.segment = function () {
                        return new nk.ft.ui.im.SegmentImpl(this.document, this);
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.text = function () {
                        return new nk.ft.ui.im.TextImpl(this.document, this);
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.heading = function () {
                        return new nk.ft.ui.im.HeadingImpl(this.document, this);
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.button = function () {
                        return new nk.ft.ui.im.ButtonImpl(this.document, this);
                    };
                    /**
                     *
                     * @return {*}
                     */
                    UIImpl.prototype.input = function () {
                        return new nk.ft.ui.im.InputImpl(this.document, this);
                    };
                    /**
                     *
                     * @param {*} clazz
                     * @return {*}
                     */
                    UIImpl.prototype.table = function (clazz) {
                        return (new nk.ft.ui.im.TableImpl(clazz, this.document, this));
                    };
                    return UIImpl;
                }());
                im.UIImpl = UIImpl;
                UIImpl["__class"] = "nk.ft.ui.im.UIImpl";
                UIImpl["__interfaces"] = ["nk.ft.ui.UI", "nk.ft.ui.im.Updater"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var vw;
        (function (vw) {
            var im;
            (function (im) {
                var CloseableImpl = /** @class */ (function () {
                    function CloseableImpl() {
                        if (this.delegate === undefined)
                            this.delegate = null;
                    }
                    CloseableImpl.prototype.setDelegate = function (delegate) {
                        this.delegate = delegate;
                    };
                    CloseableImpl.prototype.call = function () {
                        if (this.delegate != null) {
                            this.delegate.call();
                        }
                    };
                    return CloseableImpl;
                }());
                im.CloseableImpl = CloseableImpl;
                CloseableImpl["__class"] = "nk.ft.vw.im.CloseableImpl";
            })(im = vw.im || (vw.im = {}));
        })(vw = ft.vw || (ft.vw = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var vw;
        (function (vw) {
            var im;
            (function (im) {
                var ViewManagerImpl = /** @class */ (function () {
                    function ViewManagerImpl(window, document, selector) {
                        var _this = this;
                        if (this.document === undefined)
                            this.document = null;
                        if (this.root === undefined)
                            this.root = null;
                        if (this.stack === undefined)
                            this.stack = null;
                        this.document = document;
                        this.root = document.querySelector(selector);
                        this.stack = (new Array());
                        window.onpopstate = function (e) {
                            _this.pop();
                            return null;
                        };
                    }
                    /**
                     *
                     * @param {*} action
                     */
                    ViewManagerImpl.prototype.open = function (action) {
                        var _this = this;
                        var onClose = new nk.ft.vw.im.CloseableImpl();
                        (function (target) { return (typeof target === 'function') ? target(onClose) : target.apply(onClose); })(action).addChange({ change: (function (onClose) {
                                return function (e) {
                                    var element = _this.document.createElement("div");
                                    element["__c"] = _this;
                                    element.className = "nk-view";
                                    element.appendChild(e);
                                    if (_this.stack.length > 0) {
                                        ViewManagerImpl.setVisible(_this.stack[_this.stack.length - 1], false);
                                    }
                                    ViewManagerImpl.setVisible(element, true);
                                    _this.stack.push(element);
                                    onClose.setDelegate({ call: function () {
                                            _this.pop$def_dom_HTMLDivElement(element);
                                        } });
                                    window.setTimeout(function () {
                                        history.pushState(new Object(), "", "/");
                                    }, 1);
                                    _this.root.appendChild(_this.document.createDocumentFragment().appendChild(element));
                                };
                            })(onClose) });
                    };
                    ViewManagerImpl.prototype.pop$def_dom_HTMLDivElement = function (element) {
                        if (this.stack.length > 0) {
                            var pos = this.stack.lastIndexOf(element);
                            if (pos > -1) {
                                this.stack.splice(pos, 1);
                            }
                            ViewManagerImpl.setVisible(element, false);
                            try {
                                this.root.removeChild(element);
                            }
                            catch (e) {
                            }
                            ;
                            if (this.stack.length > 0) {
                                ViewManagerImpl.setVisible(this.stack[this.stack.length - 1], true);
                            }
                        }
                    };
                    ViewManagerImpl.prototype.pop = function (element) {
                        if (((element != null && element instanceof HTMLDivElement) || element === null)) {
                            return this.pop$def_dom_HTMLDivElement(element);
                        }
                        else if (element === undefined) {
                            return this.pop$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    /*private*/ ViewManagerImpl.prototype.pop$ = function () {
                        if (this.stack.length > 0) {
                            var element = this.stack.pop();
                            ViewManagerImpl.setVisible(element, false);
                            this.root.removeChild(element);
                            if (this.stack.length > 0) {
                                ViewManagerImpl.setVisible(this.stack[this.stack.length - 1], true);
                            }
                        }
                    };
                    /*private*/ ViewManagerImpl.setVisible = function (e, value) {
                        if (value) {
                            e.style.display = "unset";
                        }
                        else {
                            e.style.display = "none";
                        }
                    };
                    return ViewManagerImpl;
                }());
                im.ViewManagerImpl = ViewManagerImpl;
                ViewManagerImpl["__class"] = "nk.ft.vw.im.ViewManagerImpl";
                ViewManagerImpl["__interfaces"] = ["nk.ft.vw.ViewManager"];
            })(im = vw.im || (vw.im = {}));
        })(vw = ft.vw || (ft.vw = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var ButtonImpl = /** @class */ (function (_super) {
                    __extends(ButtonImpl, _super);
                    function ButtonImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.document === undefined)
                            _this.document = null;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        _this.document = document;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("button");
                                _this.__element["__c"] = _this;
                                _this.__element.className = "nk-btn";
                                _this.__element.setAttribute("data-nk-btn", "normal");
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    ButtonImpl.prototype.element = function () {
                        return this.__element;
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    ButtonImpl.prototype.value = function (value) {
                        var _this = this;
                        this.addChange({ change: function (e) {
                                if (e.childNodes.length > 0) {
                                    e.removeChild(e.childNodes[0]);
                                }
                                e.appendChild(_this.document.createTextNode(value));
                            } });
                        return this;
                    };
                    /**
                     *
                     * @return {*}
                     */
                    ButtonImpl.prototype.primary = function () {
                        this.addChange({ change: function (e) {
                                e.setAttribute("data-nk-btn", "primary");
                            } });
                        return this;
                    };
                    /**
                     *
                     * @return {*}
                     */
                    ButtonImpl.prototype.asLink = function () {
                        this.addChange({ change: function (e) {
                                e.setAttribute("data-nk-btn", "link");
                            } });
                        return this;
                    };
                    return ButtonImpl;
                }(nk.ft.ui.im.ComponentImpl));
                im.ButtonImpl = ButtonImpl;
                ButtonImpl["__class"] = "nk.ft.ui.im.ButtonImpl";
                ButtonImpl["__interfaces"] = ["nk.ft.ui.Button", "nk.ft.ui.Clickable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var ContainerImpl = /** @class */ (function (_super) {
                    __extends(ContainerImpl, _super);
                    function ContainerImpl(up) {
                        return _super.call(this, up) || this;
                    }
                    ContainerImpl.prototype.add = function (c) {
                        this.addChange({ change: function (e) {
                                c.addChange({ change: function (other) {
                                        e.appendChild(other);
                                    } });
                            } });
                        return this;
                    };
                    ContainerImpl.prototype.insert = function (c) {
                        this.addChange({ change: function (e) {
                                c.addChange({ change: function (other) {
                                        if (e.firstChild != null) {
                                            e.insertBefore(other, e.firstChild);
                                        }
                                        else {
                                            e.appendChild(other);
                                        }
                                    } });
                            } });
                        return this;
                    };
                    ContainerImpl.prototype.remove = function (c) {
                        this.addChange({ change: function (e) {
                                c.addChange({ change: function (other) {
                                        e.removeChild(other);
                                    } });
                            } });
                        return this;
                    };
                    ContainerImpl.prototype.removeAll = function () {
                        this.addChange({ change: function (e) {
                                while ((e.childNodes.length > 0)) {
                                    {
                                        e.removeChild(e.firstChild);
                                    }
                                }
                                ;
                            } });
                        return this;
                    };
                    /**
                     *
                     */
                    ContainerImpl.prototype.update = function () {
                        this.addChange({ change: function (e) {
                                var list = e.childNodes;
                                for (var i = 0; i < list.length; i++) {
                                    {
                                        var node = list.item(i);
                                        var c = (node["__c"]);
                                        if (c != null && (c != null && (c["__interfaces"] != null && c["__interfaces"].indexOf("nk.ft.ui.Bindable") >= 0 || c.constructor != null && c.constructor["__interfaces"] != null && c.constructor["__interfaces"].indexOf("nk.ft.ui.Bindable") >= 0))) {
                                            c.update();
                                        }
                                    }
                                    ;
                                }
                            } });
                    };
                    return ContainerImpl;
                }(nk.ft.ui.im.ComponentImpl));
                im.ContainerImpl = ContainerImpl;
                ContainerImpl["__class"] = "nk.ft.ui.im.ContainerImpl";
                ContainerImpl["__interfaces"] = ["nk.ft.ui.Clickable", "nk.ft.ui.Bindable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var HeadingImpl = /** @class */ (function (_super) {
                    __extends(HeadingImpl, _super);
                    function HeadingImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("h2");
                                _this.__element["__c"] = _this;
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    HeadingImpl.prototype.element = function () {
                        return this.__element;
                    };
                    HeadingImpl.prototype.content = function (value) {
                        this.addChange({ change: function (e) {
                                e.textContent = value;
                            } });
                        return this;
                    };
                    HeadingImpl.prototype.title = function (value) {
                        this.addChange({ change: function (e) {
                                e.classList.add("nk-heading-title");
                            } });
                        return this.content(value);
                    };
                    HeadingImpl.prototype.subtitle = function (value) {
                        this.addChange({ change: function (e) {
                                e.classList.add("nk-heading-subtitle");
                            } });
                        return this.content(value);
                    };
                    HeadingImpl.prototype.section = function (value) {
                        this.addChange({ change: function (e) {
                                e.classList.add("nk-heading-section");
                            } });
                        return this.content(value);
                    };
                    return HeadingImpl;
                }(nk.ft.ui.im.ComponentImpl));
                im.HeadingImpl = HeadingImpl;
                HeadingImpl["__class"] = "nk.ft.ui.im.HeadingImpl";
                HeadingImpl["__interfaces"] = ["nk.ft.ui.Clickable", "nk.ft.ui.Heading", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var InputImpl = /** @class */ (function (_super) {
                    __extends(InputImpl, _super);
                    function InputImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        if (_this.__label === undefined)
                            _this.__label = null;
                        if (_this.input === undefined)
                            _this.input = null;
                        if (_this.span === undefined)
                            _this.span = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("div");
                                _this.__element["__c"] = _this;
                                _this.__label = document.createElement("label");
                                _this.input = document.createElement("input");
                                _this.span = document.createElement("span");
                                _this.__element.appendChild(_this.__label);
                                _this.__element.appendChild(_this.input);
                                _this.__element.appendChild(_this.span);
                                _this.__element.className = "nk-input";
                                _this.input.value = "";
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    InputImpl.prototype.element = function () {
                        return this.__element;
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    InputImpl.prototype.label = function (value) {
                        var _this = this;
                        this.addChange({ change: function (e) {
                                _this.__label.textContent = value;
                            } });
                        return this;
                    };
                    /**
                     *
                     * @return {*}
                     */
                    InputImpl.prototype.typeNumber = function () {
                        var _this = this;
                        this.addChange({ change: function (e) {
                                _this.input.type = "number";
                            } });
                        return this;
                    };
                    /**
                     *
                     * @return {*}
                     */
                    InputImpl.prototype.typePassword = function () {
                        var _this = this;
                        this.addChange({ change: function (e) {
                                _this.input.type = "password";
                            } });
                        return this;
                    };
                    /**
                     *
                     * @param {string} v
                     * @return {*}
                     */
                    InputImpl.prototype.msg = function (v) {
                        var _this = this;
                        this.addChange({ change: function (e) {
                                _this.span.textContent = v;
                            } });
                        return this;
                    };
                    InputImpl.prototype.value$java_lang_String = function (value) {
                        var _this = this;
                        this.addChange({ change: function (e) {
                                _this.input.value = value;
                            } });
                        return this;
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    InputImpl.prototype.value = function (value) {
                        if (((typeof value === 'string') || value === null)) {
                            return this.value$java_lang_String(value);
                        }
                        else if (value === undefined) {
                            return this.value$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    InputImpl.prototype.value$ = function () {
                        return this.input.value;
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    InputImpl.prototype.hint = function (value) {
                        var _this = this;
                        this.addChange({ change: function (e) {
                                _this.input.placeholder = value;
                            } });
                        return this;
                    };
                    return InputImpl;
                }(nk.ft.ui.im.ComponentImpl));
                im.InputImpl = InputImpl;
                InputImpl["__class"] = "nk.ft.ui.im.InputImpl";
                InputImpl["__interfaces"] = ["nk.ft.ui.Input", "nk.ft.ui.Clickable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var TableImpl = /** @class */ (function (_super) {
                    __extends(TableImpl, _super);
                    function TableImpl(clazz, document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.document === undefined)
                            _this.document = null;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        if (_this.columns === undefined)
                            _this.columns = null;
                        _this.document = document;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("table");
                                _this.__element["__c"] = _this;
                                _this.__element.className = "nk-table";
                            } });
                        _this.columns = ([]);
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    TableImpl.prototype.element = function () {
                        return this.__element;
                    };
                    /**
                     *
                     * @param {*} call
                     * @return {*}
                     */
                    TableImpl.prototype.column = function (call) {
                        /* add */ (this.columns.push(call) > 0);
                        return this;
                    };
                    /**
                     *
                     * @param {*[]} list
                     * @return {*}
                     */
                    TableImpl.prototype.data = function (list) {
                        var _this = this;
                        var cols = ([]);
                        var headValues = ([]);
                        var bodyValues = ([]);
                        var footValues = ([]);
                        this.columns.forEach((function (headValues, cols, footValues) {
                            return function (cc) {
                                var c = (new nk.ft.ui.im.ColumnImpl());
                                (function (target) { return (typeof target === 'function') ? target(c) : target.accept(c); })(cc);
                                /* add */ (cols.push(c) > 0);
                                if (c.head() != null) {
                                    var tmp_1 = (function (target) { return (typeof target === 'function') ? target(list) : target.apply(list); })(c.head());
                                    /* add */ (headValues.push(function () { return _this.convertNode(tmp_1); }) > 0);
                                }
                                if (c.foot() != null) {
                                    var tmp_2 = (function (target) { return (typeof target === 'function') ? target(list) : target.apply(list); })(c.foot());
                                    /* add */ (footValues.push(function () { return _this.convertNode(tmp_2); }) > 0);
                                }
                            };
                        })(headValues, cols, footValues));
                        list.forEach((function (cols, bodyValues) {
                            return function (i) {
                                var row = ([]);
                                cols.forEach(function (c) {
                                    var tmp = (function (target) { return (typeof target === 'function') ? target(i) : target.apply(i); })(c.value());
                                    /* add */ (row.push(function () { return _this.convertNode(tmp); }) > 0);
                                });
                                /* add */ (bodyValues.push(row) > 0);
                            };
                        })(cols, bodyValues));
                        this.removeAllColumns();
                        this.addChange({ change: (function (headValues, bodyValues, footValues) {
                                return function (e) {
                                    _this.render(headValues, bodyValues, footValues);
                                };
                            })(headValues, bodyValues, footValues) });
                        return this;
                    };
                    TableImpl.prototype.convertNode = function (tmp) {
                        var node = null;
                        if (tmp != null && (tmp["__interfaces"] != null && tmp["__interfaces"].indexOf("nk.ft.ui.Component") >= 0 || tmp.constructor != null && tmp.constructor["__interfaces"] != null && tmp.constructor["__interfaces"].indexOf("nk.ft.ui.Component") >= 0)) {
                            node = tmp.element();
                        }
                        else if (tmp != null && tmp instanceof Node) {
                            node = tmp;
                        }
                        else {
                            node = this.document.createTextNode(tmp);
                        }
                        return node;
                    };
                    TableImpl.prototype.render = function (headValues, bodyValues, footValues) {
                        if (!(headValues.length == 0)) {
                            var section = this.__element.createTHead();
                            var row = section.insertRow();
                            for (var index128 = 0; index128 < headValues.length; index128++) {
                                var n = headValues[index128];
                                {
                                    var cell = row.insertCell();
                                    if (n != null) {
                                        cell.appendChild(n());
                                    }
                                }
                            }
                        }
                        if (!(bodyValues.length == 0)) {
                            var section = this.__element.createTBody();
                            for (var index129 = 0; index129 < bodyValues.length; index129++) {
                                var values = bodyValues[index129];
                                {
                                    var row = section.insertRow();
                                    for (var index130 = 0; index130 < values.length; index130++) {
                                        var n = values[index130];
                                        {
                                            var cell = row.insertCell();
                                            if (n != null) {
                                                cell.appendChild(n());
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (!(footValues.length == 0)) {
                            var section = this.__element.createTFoot();
                            var row = section.insertRow();
                            for (var index131 = 0; index131 < footValues.length; index131++) {
                                var n = footValues[index131];
                                {
                                    var cell = row.insertCell();
                                    if (n != null) {
                                        cell.appendChild(n());
                                    }
                                }
                            }
                        }
                    };
                    /**
                     *
                     * @return {*}
                     */
                    TableImpl.prototype.removeAllColumns = function () {
                        this.addChange({ change: function (e) {
                                while ((e.childNodes.length > 0)) {
                                    {
                                        e.removeChild(e.firstChild);
                                    }
                                }
                                ;
                            } });
                        return this;
                    };
                    return TableImpl;
                }(nk.ft.ui.im.ComponentImpl));
                im.TableImpl = TableImpl;
                TableImpl["__class"] = "nk.ft.ui.im.TableImpl";
                TableImpl["__interfaces"] = ["nk.ft.ui.Table", "nk.ft.ui.Clickable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var TextImpl = /** @class */ (function (_super) {
                    __extends(TextImpl, _super);
                    function TextImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.getter === undefined)
                            _this.getter = null;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("span");
                                _this.__element["__c"] = _this;
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    TextImpl.prototype.element = function () {
                        return this.__element;
                    };
                    /**
                     *
                     * @param {string} value
                     * @return {*}
                     */
                    TextImpl.prototype.content = function (value) {
                        this.addChange({ change: function (e) {
                                e.textContent = value;
                            } });
                        return this;
                    };
                    /**
                     *
                     * @param {*} getter
                     * @return {*}
                     */
                    TextImpl.prototype.bind = function (getter) {
                        this.getter = getter;
                        this.update();
                        return this;
                    };
                    /**
                     *
                     */
                    TextImpl.prototype.update = function () {
                        if (this.getter != null) {
                            this.content(this.getter.get());
                        }
                    };
                    return TextImpl;
                }(nk.ft.ui.im.ComponentImpl));
                im.TextImpl = TextImpl;
                TextImpl["__class"] = "nk.ft.ui.im.TextImpl";
                TextImpl["__interfaces"] = ["nk.ft.ui.ClickListener", "nk.ft.ui.Clickable", "nk.ft.ui.Bindable", "nk.ft.ui.Text", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var BoxImpl = /** @class */ (function (_super) {
                    __extends(BoxImpl, _super);
                    function BoxImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("div");
                                _this.__element["__c"] = _this;
                                _this.__element.className = "nk-b";
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    BoxImpl.prototype.element = function () {
                        return this.__element;
                    };
                    return BoxImpl;
                }(nk.ft.ui.im.ContainerImpl));
                im.BoxImpl = BoxImpl;
                BoxImpl["__class"] = "nk.ft.ui.im.BoxImpl";
                BoxImpl["__interfaces"] = ["nk.ft.ui.Clickable", "nk.ft.ui.Container", "nk.ft.ui.Bindable", "nk.ft.ui.Box", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var HorizontalImpl = /** @class */ (function (_super) {
                    __extends(HorizontalImpl, _super);
                    function HorizontalImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("div");
                                _this.__element["__c"] = _this;
                                _this.__element.className = "nk-h";
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    HorizontalImpl.prototype.element = function () {
                        return this.__element;
                    };
                    return HorizontalImpl;
                }(nk.ft.ui.im.ContainerImpl));
                im.HorizontalImpl = HorizontalImpl;
                HorizontalImpl["__class"] = "nk.ft.ui.im.HorizontalImpl";
                HorizontalImpl["__interfaces"] = ["nk.ft.ui.Clickable", "nk.ft.ui.Horizontal", "nk.ft.ui.Container", "nk.ft.ui.Bindable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var ItemImpl = /** @class */ (function (_super) {
                    __extends(ItemImpl, _super);
                    function ItemImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("div");
                                _this.__element["__c"] = _this;
                                _this.__element.className = "nk-it";
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    ItemImpl.prototype.element = function () {
                        return this.__element;
                    };
                    return ItemImpl;
                }(nk.ft.ui.im.ContainerImpl));
                im.ItemImpl = ItemImpl;
                ItemImpl["__class"] = "nk.ft.ui.im.ItemImpl";
                ItemImpl["__interfaces"] = ["nk.ft.ui.Clickable", "nk.ft.ui.Container", "nk.ft.ui.Bindable", "nk.ft.ui.Styleable", "nk.ft.ui.Item", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var SegmentImpl = /** @class */ (function (_super) {
                    __extends(SegmentImpl, _super);
                    function SegmentImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("div");
                                _this.__element["__c"] = _this;
                                _this.__element.className = "nk-s";
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    SegmentImpl.prototype.element = function () {
                        return this.__element;
                    };
                    return SegmentImpl;
                }(nk.ft.ui.im.ContainerImpl));
                im.SegmentImpl = SegmentImpl;
                SegmentImpl["__class"] = "nk.ft.ui.im.SegmentImpl";
                SegmentImpl["__interfaces"] = ["nk.ft.ui.Clickable", "nk.ft.ui.Segment", "nk.ft.ui.Container", "nk.ft.ui.Bindable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
(function (nk) {
    var ft;
    (function (ft) {
        var ui;
        (function (ui) {
            var im;
            (function (im) {
                var VerticalImpl = /** @class */ (function (_super) {
                    __extends(VerticalImpl, _super);
                    function VerticalImpl(document, up) {
                        var _this = _super.call(this, up) || this;
                        if (_this.__element === undefined)
                            _this.__element = null;
                        up.addChange({ call: function () {
                                _this.__element = document.createElement("div");
                                _this.__element["__c"] = _this;
                                _this.__element.className = "nk-v";
                            } });
                        return _this;
                    }
                    /**
                     *
                     * @return {HTMLElement}
                     */
                    VerticalImpl.prototype.element = function () {
                        return this.__element;
                    };
                    return VerticalImpl;
                }(nk.ft.ui.im.ContainerImpl));
                im.VerticalImpl = VerticalImpl;
                VerticalImpl["__class"] = "nk.ft.ui.im.VerticalImpl";
                VerticalImpl["__interfaces"] = ["nk.ft.ui.Vertical", "nk.ft.ui.Clickable", "nk.ft.ui.Container", "nk.ft.ui.Bindable", "nk.ft.ui.Styleable", "nk.ft.ui.Component"];
            })(im = ui.im || (ui.im = {}));
        })(ui = ft.ui || (ft.ui = {}));
    })(ft = nk.ft || (nk.ft = {}));
})(nk || (nk = {}));
