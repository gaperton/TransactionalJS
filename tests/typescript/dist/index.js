(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}



function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var levelToNumber = {
    none: 0, error: 1, warn: 2, info: 3, log: 4, debug: 5
};
var log = function (a_level, a_msg, a_props) {
    var levelAsNumber = levelToNumber[a_level], msg, props, level;
    if (levelAsNumber === void 0 && !a_props) {
        levelAsNumber = 4;
        msg = a_level;
        props = a_msg;
        level = 'log';
    }
    else {
        msg = a_msg, level = a_level, props = a_props;
    }
    if (levelAsNumber <= log.level) {
        if (levelAsNumber <= log.throw || !log.logger) {
            var error = new Error(msg);
            error.props = props;
            throw error;
        }
        else {
            log.logger(level, msg, props);
            if (levelAsNumber <= log.stop) {
                debugger;
            }
        }
    }
};
log.level = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production' ? 1 : 2;
log.throw = 0;
log.stop = 0;
if (typeof console !== 'undefined') {
    log.logger = function _console(level, error, props) {
        var args = [error];
        for (var name_1 in props) {
            args.push("\n\t" + name_1 + ":", props[name_1]);
        }
        console[level].apply(console, args);
    };
}
function isValidJSON(value) {
    if (value === null) {
        return true;
    }
    switch (typeof value) {
        case 'number':
        case 'string':
        case 'boolean':
            return true;
        case 'object':
            var proto = Object.getPrototypeOf(value);
            if (proto === Object.prototype || proto === Array.prototype) {
                return every(value, isValidJSON);
            }
    }
    return false;
}
function getBaseClass(Class) {
    return Object.getPrototypeOf(Class.prototype).constructor;
}

function isEmpty(obj) {
    if (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}
function someArray(arr, fun) {
    var result;
    for (var i = 0; i < arr.length; i++) {
        if (result = fun(arr[i], i)) {
            return result;
        }
    }
}
function someObject(obj, fun) {
    var result;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (result = fun(obj[key], key)) {
                return result;
            }
        }
    }
}
function some(obj, fun) {
    if (Object.getPrototypeOf(obj) === ArrayProto) {
        return someArray(obj, fun);
    }
    else {
        return someObject(obj, fun);
    }
}
function every(obj, predicate) {
    return !some(obj, function (x) { return !predicate(x); });
}

function omit(source) {
    var dest = {}, discard = {};
    for (var i = 1; i < arguments.length; i++) {
        discard[arguments[i]] = true;
    }
    for (var name in source) {
        if (!discard.hasOwnProperty(name) && source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    return dest;
}
function transform(dest, source, fun) {
    for (var name in source) {
        if (source.hasOwnProperty(name)) {
            var value = fun(source[name], name);
            value === void 0 || (dest[name] = value);
        }
    }
    return dest;
}


function assign(dest, source) {
    for (var name in source) {
        if (source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var other = arguments[i];
            other && assign(dest, other);
        }
    }
    return dest;
}
function defaults(dest, source) {
    for (var name in source) {
        if (source.hasOwnProperty(name) && !dest.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var other = arguments[i];
            other && defaults(dest, other);
        }
    }
    return dest;
}
Object.setPrototypeOf || (Object.setPrototypeOf = defaults);

function once$1(func) {
    var memo, first = true;
    return function () {
        if (first) {
            first = false;
            memo = func.apply(this, arguments);
            func = null;
        }
        return memo;
    };
}
var ArrayProto = Array.prototype;
var DateProto = Date.prototype;
var ObjectProto = Object.prototype;
function notEqual(a, b) {
    if (a === b)
        return false;
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        var protoA = Object.getPrototypeOf(a);
        if (protoA !== Object.getPrototypeOf(b))
            return true;
        switch (protoA) {
            case DateProto: return +a !== +b;
            case ArrayProto: return arraysNotEqual(a, b);
            case ObjectProto:
            case null:
                return objectsNotEqual(a, b);
        }
    }
    return true;
}
function objectsNotEqual(a, b) {
    var keysA = Object.keys(a);
    if (keysA.length !== Object.keys(b).length)
        return true;
    for (var i = 0; i < keysA.length; i++) {
        var key = keysA[i];
        if (!b.hasOwnProperty(key) || notEqual(a[key], b[key])) {
            return true;
        }
    }
    return false;
}
function arraysNotEqual(a, b) {
    if (a.length !== b.length)
        return true;
    for (var i = 0; i < a.length; i++) {
        if (notEqual(a[i], b[i]))
            return true;
    }
    return false;
}
var HashProto = Object.create(null);
HashProto.hasOwnProperty = ObjectProto.hasOwnProperty;
function hashMap(obj) {
    var hash = Object.create(HashProto);
    return obj ? assign(hash, obj) : hash;
}

var Mixable = (function () {
    function Mixable() {
    }
    Mixable.define = function (protoProps, staticProps) {
        if (protoProps === void 0) { protoProps = {}; }
        var BaseClass = getBaseClass(this);
        staticProps && assign(this, staticProps);
        var mixins = protoProps.mixins, defineMixin = __rest(protoProps, ["mixins"]);
        mixins && this.mixins.merge(mixins);
        this.mixins.mergeObject(this.prototype, defineMixin, true);
        this.mixins.mergeObject(this.prototype, this.mixins.getStaticDefinitions(BaseClass), true);
        this.onDefine && this.onDefine(this.mixins.definitions, BaseClass);
        this.mixins.mergeInheritedMembers(BaseClass);
        return this;
    };
    Mixable.extend = function (spec, statics) {
        var TheSubclass;
        if (spec && spec.hasOwnProperty('constructor')) {
            TheSubclass = spec.constructor;
            __extends(TheSubclass, this);
        }
        else {
            TheSubclass = (function (_super) {
                __extends(Subclass, _super);
                function Subclass() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Subclass;
            }(this));
        }
        predefine(TheSubclass);
        spec && TheSubclass.define(spec, statics);
        return TheSubclass;
    };
    return Mixable;
}());
function predefine(Constructor) {
    var BaseClass = getBaseClass(Constructor);
    Constructor.__super__ = BaseClass.prototype;
    Constructor.define || MixinsState.get(Mixable).populate(Constructor);
    MixinsState.get(Constructor);
    Constructor.onExtend && Constructor.onExtend(BaseClass);
}
function define(ClassOrDefinition) {
    if (typeof ClassOrDefinition === 'function') {
        predefine(ClassOrDefinition);
        ClassOrDefinition.define();
    }
    else {
        return function (Ctor) {
            predefine(Ctor);
            Ctor.define(ClassOrDefinition);
        };
    }
}
function definitions(rules) {
    return function (Class) {
        var mixins = MixinsState.get(Class);
        mixins.definitionRules = defaults(hashMap(), rules, mixins.definitionRules);
    };
}
function definitionDecorator(definitionKey, value) {
    return function (proto, name) {
        MixinsState
            .get(proto.constructor)
            .mergeObject(proto, (_a = {},
            _a[definitionKey] = (_b = {},
                _b[name] = value,
                _b),
            _a));
        var _a, _b;
    };
}
var MixinsState = (function () {
    function MixinsState(Class) {
        this.Class = Class;
        this.definitions = {};
        var mixins = getBaseClass(Class).mixins;
        this.mergeRules = (mixins && mixins.mergeRules) || hashMap();
        this.definitionRules = (mixins && mixins.definitionRules) || hashMap();
        this.appliedMixins = (mixins && mixins.appliedMixins) || [];
    }
    MixinsState.get = function (Class) {
        var mixins = Class.mixins;
        return mixins && Class === mixins.Class ? mixins :
            Class.mixins = new MixinsState(Class);
    };
    MixinsState.prototype.getStaticDefinitions = function (BaseClass) {
        var definitions = hashMap(), Class = this.Class;
        return transform(definitions, this.definitionRules, function (rule, name) {
            if (BaseClass[name] !== Class[name]) {
                return Class[name];
            }
        });
    };
    MixinsState.prototype.merge = function (mixins) {
        var proto = this.Class.prototype;
        var appliedMixins = this.appliedMixins = this.appliedMixins.slice();
        for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
            var mixin = mixins_1[_i];
            if (Array.isArray(mixin)) {
                this.merge(mixin);
            }
            else if (appliedMixins.indexOf(mixin) < 0) {
                appliedMixins.push(mixin);
                if (typeof mixin === 'function') {
                    if (getBaseClass(mixin) !== Object) {
                        console.log('Mixin error');
                    }
                    this.mergeObject(this.Class, mixin);
                    var sourceMixins = mixin.mixins;
                    if (sourceMixins) {
                        this.mergeRules = defaults(hashMap(), this.mergeRules, sourceMixins.mergeRules);
                        this.definitionRules = defaults(hashMap(), this.definitionRules, sourceMixins.definitionRules);
                        this.appliedMixins = this.appliedMixins.concat(sourceMixins.appliedMixins);
                    }
                    this.mergeObject(proto, mixin.prototype);
                }
                else {
                    this.mergeObject(proto, mixin);
                }
            }
        }
    };
    MixinsState.prototype.populate = function () {
        var ctors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ctors[_i] = arguments[_i];
        }
        for (var _a = 0, ctors_1 = ctors; _a < ctors_1.length; _a++) {
            var Ctor = ctors_1[_a];
            MixinsState.get(Ctor).merge([this.Class]);
        }
    };
    MixinsState.prototype.mergeObject = function (dest, source, unshift) {
        var _this = this;
        forEachOwnProp(source, function (name) {
            var sourceProp = Object.getOwnPropertyDescriptor(source, name);
            var rule;
            if (rule = _this.definitionRules[name]) {
                assignProperty(_this.definitions, name, sourceProp, rule, unshift);
            }
            if (!rule || rule === mixinRules.protoValue) {
                assignProperty(dest, name, sourceProp, _this.mergeRules[name], unshift);
            }
        });
    };
    MixinsState.prototype.mergeInheritedMembers = function (BaseClass) {
        var _a = this, mergeRules = _a.mergeRules, Class = _a.Class;
        if (mergeRules) {
            var proto = Class.prototype, baseProto = BaseClass.prototype;
            for (var name_1 in mergeRules) {
                var rule = mergeRules[name_1];
                if (proto.hasOwnProperty(name_1) && name_1 in baseProto) {
                    proto[name_1] = resolveRule(proto[name_1], baseProto[name_1], rule);
                }
            }
        }
    };
    return MixinsState;
}());
var dontMix = {
    function: hashMap({
        length: true,
        prototype: true,
        caller: true,
        arguments: true,
        name: true,
        __super__: true
    }),
    object: hashMap({
        constructor: true
    })
};
function forEachOwnProp(object, fun) {
    var ignore = dontMix[typeof object];
    for (var _i = 0, _a = Object.getOwnPropertyNames(object); _i < _a.length; _i++) {
        var name_2 = _a[_i];
        ignore[name_2] || fun(name_2);
    }
}
var mixins = function () {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    return (function (Class) { return MixinsState.get(Class).merge(list); });
};
var mixinRules = (function (rules) { return (function (Class) {
    var mixins = MixinsState.get(Class);
    mixins.mergeRules = defaults(rules, mixins.mergeRules);
}); });
mixinRules.value = function (a, b) { return a; };
mixinRules.protoValue = function (a, b) { return a; };
mixinRules.merge = function (a, b) { return defaults({}, a, b); };
mixinRules.pipe = function (a, b) { return (function (x) {
    return a.call(this, b.call(this, x));
}); };
mixinRules.defaults = function (a, b) { return (function () {
    return defaults(a.apply(this, arguments), b.apply(this, arguments));
}); };
mixinRules.classFirst = function (a, b) { return (function () {
    a.apply(this, arguments);
    b.apply(this, arguments);
}); };
mixinRules.classLast = function (a, b) { return (function () {
    b.apply(this, arguments);
    a.apply(this, arguments);
}); };
mixinRules.every = function (a, b) { return (function () {
    return a.apply(this, arguments) && b.apply(this, arguments);
}); };
mixinRules.some = function (a, b) { return (function () {
    return a.apply(this, arguments) || b.apply(this, arguments);
}); };
function assignProperty(dest, name, sourceProp, rule, unshift) {
    if (dest.hasOwnProperty(name)) {
        var destProp = Object.getOwnPropertyDescriptor(dest, name);
        if (destProp.configurable && 'value' in destProp) {
            dest[name] = unshift ?
                resolveRule(sourceProp.value, destProp.value, rule) :
                resolveRule(destProp.value, sourceProp.value, rule);
        }
    }
    else {
        Object.defineProperty(dest, name, sourceProp);
    }
}
function resolveRule(dest, source, rule) {
    if (dest === void 0)
        return source;
    if (!rule || source === void 0)
        return dest;
    return rule(dest, source);
}

var EventMap = (function () {
    function EventMap(map) {
        this.handlers = [];
        if (map) {
            if (map instanceof EventMap) {
                this.handlers = map.handlers.slice();
            }
            else {
                map && this.addEventsMap(map);
            }
        }
    }
    EventMap.prototype.merge = function (map) {
        this.handlers = this.handlers.concat(map.handlers);
    };
    EventMap.prototype.addEventsMap = function (map) {
        for (var names in map) {
            this.addEvent(names, map[names]);
        }
    };
    EventMap.prototype.bubbleEvents = function (names) {
        for (var _i = 0, _a = names.split(eventSplitter$1); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            this.addEvent(name_1, getBubblingHandler(name_1));
        }
    };
    EventMap.prototype.addEvent = function (names, callback) {
        var handlers = this.handlers;
        for (var _i = 0, _a = names.split(eventSplitter$1); _i < _a.length; _i++) {
            var name_2 = _a[_i];
            handlers.push(new EventDescriptor(name_2, callback));
        }
    };
    EventMap.prototype.subscribe = function (target, source) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            on$2(source, event_1.name, event_1.callback, target);
        }
    };
    EventMap.prototype.unsubscribe = function (target, source) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var event_2 = _a[_i];
            off$2(source, event_2.name, event_2.callback, target);
        }
    };
    return EventMap;
}());
var EventDescriptor = (function () {
    function EventDescriptor(name, callback) {
        this.name = name;
        if (callback === true) {
            this.callback = getBubblingHandler(name);
        }
        else if (typeof callback === 'string') {
            this.callback =
                function localCallback() {
                    var handler = this[callback];
                    handler && handler.apply(this, arguments);
                };
        }
        else {
            this.callback = callback;
        }
    }
    return EventDescriptor;
}());
var _bubblingHandlers = {};
function getBubblingHandler(event) {
    return _bubblingHandlers[event] || (_bubblingHandlers[event] = function (a, b, c, d, e) {
        if (d !== void 0 || e !== void 0)
            trigger5$1(this, event, a, b, c, d, e);
        if (c !== void 0)
            trigger3$1(this, event, a, b, c);
        else
            trigger2$1(this, event, a, b);
    });
}
var EventHandler$1 = (function () {
    function EventHandler(callback, context, next) {
        if (next === void 0) { next = null; }
        this.callback = callback;
        this.context = context;
        this.next = next;
    }
    return EventHandler;
}());
function listOff(_events, name, callback, context) {
    var head = _events[name];
    var filteredHead, prev;
    for (var ev = head; ev; ev = ev.next) {
        if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
            (context && context !== ev.context)) {
            prev = ev;
            filteredHead || (filteredHead = ev);
        }
        else {
            if (prev)
                prev.next = ev.next;
        }
    }
    if (head !== filteredHead)
        _events[name] = filteredHead;
}
function listSend2(head, a, b) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b);
}
function listSend3(head, a, b, c) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c);
}
function listSend4(head, a, b, c, d) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c, d);
}
function listSend5(head, a, b, c, d, e) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c, d, e);
}
function listSend6(head, a, b, c, d, e, f) {
    for (var ev = head; ev; ev = ev.next)
        ev.callback.call(ev.context, a, b, c, d, e, f);
}
function on$2(source, name, callback, context) {
    if (callback) {
        var _events = source._events || (source._events = Object.create(null));
        _events[name] = new EventHandler$1(callback, context, _events[name]);
    }
}
function once$3(source, name, callback, context) {
    if (callback) {
        var once_1 = once$1(function () {
            off$2(source, name, once_1);
            callback.apply(this, arguments);
        });
        once_1._callback = callback;
        on$2(source, name, once_1, context);
    }
}
function off$2(source, name, callback, context) {
    var _events = source._events;
    if (_events) {
        if (callback || context) {
            if (name) {
                listOff(_events, name, callback, context);
            }
            else {
                for (var name_3 in _events) {
                    listOff(_events, name_3, callback, context);
                }
            }
        }
        else if (name) {
            _events[name] = void 0;
        }
        else {
            source._events = void 0;
        }
    }
}
var eventSplitter$1 = /\s+/;
function strings$1(api, source, events, callback, context) {
    if (eventSplitter$1.test(events)) {
        var names = events.split(eventSplitter$1);
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_4 = names_1[_i];
            api(source, name_4, callback, context);
        }
    }
    else
        api(source, events, callback, context);
}
function trigger2$1(self, name, a, b) {
    var _events = self._events;
    if (_events) {
        var queue = _events[name], all = _events.all;
        listSend2(queue, a, b);
        listSend3(all, name, a, b);
    }
}

function trigger3$1(self, name, a, b, c) {
    var _events = self._events;
    if (_events) {
        var queue = _events[name], all = _events.all;
        listSend3(queue, a, b, c);
        listSend4(all, name, a, b, c);
    }
}

function trigger5$1(self, name, a, b, c, d, e) {
    var _events = self._events;
    if (_events) {
        var queue = _events[name], all = _events.all;
        listSend5(queue, a, b, c, d, e);
        listSend6(all, name, a, b, c, d, e);
    }
}

var strings = strings$1;
var on$1 = on$2;
var off$1 = off$2;
var once$2 = once$3;
var trigger5 = trigger5$1;
var trigger2 = trigger2$1;
var trigger3 = trigger3$1;
var _idCount = 0;
function uniqueId() {
    return 'l' + _idCount++;
}
var Messenger = (function () {
    function Messenger() {
        this._events = void 0;
        this._listeningTo = void 0;
        this.cid = uniqueId();
        this.initialize.apply(this, arguments);
    }
    Messenger.onDefine = function (_a, BaseClass) {
        var localEvents = _a.localEvents, _localEvents = _a._localEvents, properties = _a.properties;
        if (localEvents || _localEvents) {
            var eventsMap = new EventMap(this.prototype._localEvents);
            localEvents && eventsMap.addEventsMap(localEvents);
            _localEvents && eventsMap.merge(_localEvents);
            this.prototype._localEvents = eventsMap;
        }
        if (properties) {
            Object.defineProperties(this.prototype, transform({}, properties, toPropertyDescriptor));
        }
    };
    Messenger.prototype.initialize = function () { };
    Messenger.prototype.on = function (events, callback, context) {
        if (typeof events === 'string')
            strings(on$1, this, events, callback, context);
        else
            for (var name_1 in events)
                strings(on$1, this, name_1, events[name_1], context || callback);
        return this;
    };
    Messenger.prototype.once = function (events, callback, context) {
        if (typeof events === 'string')
            strings(once$2, this, events, callback, context);
        else
            for (var name_2 in events)
                strings(once$2, this, name_2, events[name_2], context || callback);
        return this;
    };
    Messenger.prototype.off = function (events, callback, context) {
        if (!events)
            off$1(this, void 0, callback, context);
        else if (typeof events === 'string')
            strings(off$1, this, events, callback, context);
        else
            for (var name_3 in events)
                strings(off$1, this, name_3, events[name_3], context || callback);
        return this;
    };
    Messenger.prototype.trigger = function (name, a, b, c, d, e) {
        if (d !== void 0 || e !== void 0)
            trigger5(this, name, a, b, c, d, e);
        else if (c !== void 0)
            trigger3(this, name, a, b, c);
        else
            trigger2(this, name, a, b);
        return this;
    };
    Messenger.prototype.listenTo = function (source, a, b) {
        if (source) {
            addReference(this, source);
            source.on(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };
    Messenger.prototype.listenToOnce = function (source, a, b) {
        if (source) {
            addReference(this, source);
            source.once(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };
    Messenger.prototype.stopListening = function (a_source, a, b) {
        var _listeningTo = this._listeningTo;
        if (_listeningTo) {
            var removeAll = !(a || b), second = !b && typeof a === 'object' ? this : b;
            if (a_source) {
                var source = _listeningTo[a_source.cid];
                if (source) {
                    if (removeAll)
                        delete _listeningTo[a_source.cid];
                    source.off(a, second, this);
                }
            }
            else if (a_source == null) {
                for (var cid in _listeningTo)
                    _listeningTo[cid].off(a, second, this);
                if (removeAll)
                    (this._listeningTo = void 0);
            }
        }
        return this;
    };
    Messenger.prototype.dispose = function () {
        if (this._disposed)
            return;
        this.stopListening();
        this.off();
        this._disposed = true;
    };
    Messenger = __decorate([
        define,
        definitions({
            properties: mixinRules.merge,
            localEvents: mixinRules.merge
        })
    ], Messenger);
    return Messenger;
}());
var Events = omit(Messenger.prototype, 'constructor', 'initialize');
function toPropertyDescriptor(x) {
    if (x) {
        return typeof x === 'function' ? { get: x } : x;
    }
}
function addReference(listener, source) {
    var listeningTo = listener._listeningTo || (listener._listeningTo = Object.create(null)), cid = source.cid || (source.cid = uniqueId());
    listeningTo[cid] = source;
}

Object.extend = function (protoProps, staticProps) { return Mixable.extend(protoProps, staticProps); };
Object.assign || (Object.assign = assign);
Object.log = log;

var ValidationError = (function () {
    function ValidationError(obj) {
        this.length = obj._validateNested(this.nested = {});
        if (this.error = obj.validate(obj)) {
            this.length++;
        }
    }
    ValidationError.prototype.each = function (iteratee) {
        var _a = this, error = _a.error, nested = _a.nested;
        if (error)
            iteratee(error, null);
        for (var key in nested) {
            iteratee(nested[key], key);
        }
    };
    ValidationError.prototype.eachError = function (iteratee, object) {
        this.each(function (value, key) {
            if (value instanceof ValidationError) {
                value.eachError(iteratee, object.get(key));
            }
            else {
                iteratee(value, key, object);
            }
        });
    };
    return ValidationError;
}());

var referenceMask = /\^|([^.]+)/g;
var CompiledReference = (function () {
    function CompiledReference(reference, splitTail) {
        if (splitTail === void 0) { splitTail = false; }
        var path = reference
            .match(referenceMask)
            .map(function (key) {
            if (key === '^')
                return 'getOwner()';
            if (key[0] === '~')
                return "getStore().get(\"" + key.substr(1) + "\")";
            return key;
        });
        this.tail = splitTail && path.pop();
        this.local = !path.length;
        path.unshift('self');
        this.resolve = new Function('self', "return " + path.join('.') + ";");
    }
    return CompiledReference;
}());
function resolveReference(root, reference, action) {
    var path = reference.match(referenceMask), skip = path.length - 1;
    var self = root;
    for (var i = 0; i < skip; i++) {
        var key = path[i];
        switch (key) {
            case '~':
                self = self.getStore();
                break;
            case '^':
                self = self.getOwner();
                break;
            default: self = self.get(key);
        }
        if (!self)
            return;
    }
    return action(self, path[skip]);
}

function getOwnerEndpoint$1(self) {
    var collection = self.collection;
    if (collection) {
        return getOwnerEndpoint$1(collection);
    }
    if (self._owner) {
        var _endpoints = self._owner._endpoints;
        return _endpoints && _endpoints[self._ownerKey];
    }
}
function createIOPromise(initialize) {
    var resolve, reject, onAbort;
    function abort(fn) {
        onAbort = fn;
    }
    var promise = new Promise(function (a_resolve, a_reject) {
        reject = a_reject;
        resolve = a_resolve;
        initialize(resolve, reject, abort);
    });
    promise.abort = function () {
        onAbort ? onAbort(resolve, reject) : reject(new Error("I/O Aborted"));
    };
    return promise;
}
function startIO(self, promise, options, thenDo) {
    abortIO(self);
    self._ioPromise = promise
        .then(function (resp) {
        self._ioPromise = null;
        var result = thenDo ? thenDo(resp) : resp;
        triggerAndBubble(self, 'sync', self, resp, options);
        return result;
    })
        .catch(function (err) {
        self._ioPromise = null;
        console.error(err);
        triggerAndBubble(self, 'error', self, err, options);
        throw err;
    });
    self._ioPromise.abort = promise.abort;
    return self._ioPromise;
}
function abortIO(self) {
    if (self._ioPromise && self._ioPromise.abort) {
        self._ioPromise.abort();
        self._ioPromise = null;
    }
}
function triggerAndBubble(eventSource) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    eventSource.trigger.apply(eventSource, args);
    var collection = eventSource.collection;
    collection && collection.trigger.apply(collection, args);
}

var trigger3$2 = trigger3$1;
var on$4 = on$2;
var off$4 = off$2;
var ItemsBehavior;
(function (ItemsBehavior) {
    ItemsBehavior[ItemsBehavior["share"] = 1] = "share";
    ItemsBehavior[ItemsBehavior["listen"] = 2] = "listen";
    ItemsBehavior[ItemsBehavior["persistent"] = 4] = "persistent";
})(ItemsBehavior || (ItemsBehavior = {}));
var Transactional = (function () {
    function Transactional(cid) {
        this._events = void 0;
        this._changeToken = {};
        this._transaction = false;
        this._isDirty = null;
        this._owner = void 0;
        this._ownerKey = void 0;
        this._validationError = void 0;
        this.cid = this.cidPrefix + cid;
    }
    Transactional_1 = Transactional;
    Transactional.onDefine = function (definitions, BaseClass) {
        if (definitions.endpoint)
            this.prototype._endpoint = definitions.endpoint;
        Messenger.onDefine.call(this, definitions, BaseClass);
    };
    
    Transactional.onExtend = function (BaseClass) {
        if (BaseClass.create === this.create) {
            this.create = Transactional_1.create;
        }
    };
    Transactional.create = function (a, b) {
        return new this(a, b);
    };
    Transactional.prototype.dispose = function () {
        if (this._disposed)
            return;
        abortIO(this);
        this._owner = void 0;
        this._ownerKey = void 0;
        this.off();
        this.stopListening();
        this._disposed = true;
    };
    Transactional.prototype.initialize = function () { };
    Transactional.prototype.onChanges = function (handler, target) {
        on$4(this, this._changeEventName, handler, target);
    };
    Transactional.prototype.offChanges = function (handler, target) {
        off$4(this, this._changeEventName, handler, target);
    };
    Transactional.prototype.listenToChanges = function (target, handler) {
        this.listenTo(target, target._changeEventName, handler);
    };
    Transactional.prototype.transaction = function (fun, options) {
        if (options === void 0) { options = {}; }
        var isRoot = transactionApi.begin(this);
        var update = fun.call(this, this);
        update && this.set(update);
        isRoot && transactionApi.commit(this);
    };
    Transactional.prototype.updateEach = function (iteratee, options) {
        var isRoot = transactionApi.begin(this);
        this.each(iteratee);
        isRoot && transactionApi.commit(this);
    };
    Transactional.prototype.set = function (values, options) {
        if (values) {
            var transaction = this._createTransaction(values, options);
            transaction && transaction.commit();
        }
        return this;
    };
    Transactional.prototype.assignFrom = function (source) {
        return this.set(source.__inner_state__ || source, { merge: true });
    };
    Transactional.prototype.parse = function (data, options) { return data; };
    Transactional.prototype.deepGet = function (reference) {
        return resolveReference(this, reference, function (object, key) { return object.get ? object.get(key) : object[key]; });
    };
    Transactional.prototype.getOwner = function () {
        return this._owner;
    };
    Transactional.prototype.getStore = function () {
        var _owner = this._owner;
        return _owner ? _owner.getStore() : this._defaultStore;
    };
    Transactional.prototype.map = function (iteratee, context) {
        var arr = [], fun = context !== void 0 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee;
        this.each(function (val, key) {
            var result = fun(val, key);
            if (result !== void 0)
                arr.push(result);
        });
        return arr;
    };
    Transactional.prototype.fetch = function (options) { throw new Error("Not implemented"); };
    Transactional.prototype.getEndpoint = function () {
        return getOwnerEndpoint(this) || this._endpoint;
    };
    Transactional.prototype.mapObject = function (iteratee, context) {
        var obj = {};
        this.each(function (val, key) {
            var result = iteratee(val, key);
            if (result !== void 0)
                obj[key] = result;
        });
        return obj;
    };
    Object.defineProperty(Transactional.prototype, "validationError", {
        get: function () {
            var error = this._validationError || (this._validationError = new ValidationError(this));
            return error.length ? error : null;
        },
        enumerable: true,
        configurable: true
    });
    Transactional.prototype.validate = function (obj) { };
    Transactional.prototype.getValidationError = function (key) {
        var error = this.validationError;
        return (key ? error && error.nested[key] : error) || null;
    };
    Transactional.prototype.deepValidationError = function (reference) {
        return resolveReference(this, reference, function (object, key) { return object.getValidationError(key); });
    };
    Transactional.prototype.eachValidationError = function (iteratee) {
        var validationError = this.validationError;
        validationError && validationError.eachError(iteratee, this);
    };
    Transactional.prototype.isValid = function (key) {
        return !this.getValidationError(key);
    };
    Transactional.prototype.valueOf = function () { return this.cid; };
    Transactional.prototype.toString = function () { return this.cid; };
    Transactional.prototype.getClassName = function () {
        var name = this.constructor.name;
        if (name !== 'Subclass')
            return name;
    };
    Transactional = Transactional_1 = __decorate([
        define,
        definitions({
            endpoint: mixinRules.value
        }),
        mixins(Messenger)
    ], Transactional);
    return Transactional;
    var Transactional_1;
}());
var transactionApi = {
    begin: function (object) {
        return object._transaction ? false : (object._transaction = true);
    },
    markAsDirty: function (object, options) {
        var dirty = !options.silent;
        if (dirty)
            object._isDirty = options;
        object._changeToken = {};
        object._validationError = void 0;
        return dirty;
    },
    commit: function (object, initiator) {
        var originalOptions = object._isDirty;
        if (originalOptions) {
            while (object._isDirty) {
                var options = object._isDirty;
                object._isDirty = null;
                trigger3$2(object, object._changeEventName, object, options, initiator);
            }
            object._transaction = false;
            var _owner = object._owner;
            if (_owner && _owner !== initiator) {
                _owner._onChildrenChange(object, originalOptions);
            }
        }
        else {
            object._isDirty = null;
            object._transaction = false;
        }
    },
    aquire: function (owner, child, key) {
        if (!child._owner) {
            child._owner = owner;
            child._ownerKey = key;
            return true;
        }
        return child._owner === owner;
    },
    free: function (owner, child) {
        if (owner === child._owner) {
            child._owner = void 0;
            child._ownerKey = void 0;
        }
    }
};
function getOwnerEndpoint(self) {
    var collection = self.collection;
    if (collection) {
        return getOwnerEndpoint(collection);
    }
    if (self._owner) {
        var _endpoints = self._owner._endpoints;
        return _endpoints && _endpoints[self._ownerKey];
    }
}

var _begin = transactionApi.begin;
var _markAsDirty = transactionApi.markAsDirty;
var commit$1 = transactionApi.commit;
var trigger3$3 = trigger3$1;
function setAttribute(record, name, value) {
    var isRoot = begin$1(record), options = {};
    if (record._attributes[name].doUpdate(value, record, options)) {
        markAsDirty$1(record, options);
        trigger3$3(record, 'change:' + name, record, record.attributes[name], options);
    }
    isRoot && commit$1(record);
}
function begin$1(record) {
    if (_begin(record)) {
        record._previousAttributes = new record.AttributesCopy(record.attributes);
        record._changedAttributes = null;
        return true;
    }
    return false;
}
function markAsDirty$1(record, options) {
    if (record._changedAttributes) {
        record._changedAttributes = null;
    }
    return _markAsDirty(record, options);
}
var UpdateRecordMixin = {
    transaction: function (fun, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin$1(this);
        fun.call(this, this);
        isRoot && commit$1(this);
    },
    _onChildrenChange: function (child, options) {
        var _ownerKey = child._ownerKey, attribute = this._attributes[_ownerKey];
        if (!attribute || attribute.propagateChanges)
            this.forceAttributeChange(_ownerKey, options);
    },
    forceAttributeChange: function (key, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin$1(this);
        if (markAsDirty$1(this, options)) {
            trigger3$3(this, 'change:' + key, this, this.attributes[key], options);
        }
        isRoot && commit$1(this);
    },
    _createTransaction: function (a_values, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin$1(this), changes = [], nested = [], _attributes = this._attributes, values = options.parse ? this.parse(a_values, options) : a_values;
        var unknown;
        if (shouldBeAnObject(this, values)) {
            for (var name_1 in values) {
                var spec = _attributes[name_1];
                if (spec) {
                    if (spec.doUpdate(values[name_1], this, options, nested)) {
                        changes.push(name_1);
                    }
                }
                else {
                    unknown || (unknown = []);
                    unknown.push("'" + name_1 + "'");
                }
            }
            
        }
        if (changes.length && markAsDirty$1(this, options)) {
            return new RecordTransaction(this, isRoot, nested, changes);
        }
        for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
            var pendingTransaction = nested_1[_i];
            pendingTransaction.commit(this);
        }
        isRoot && commit$1(this);
    }
};
function constructorsMixin(attrDefs) {
    var attrs = Object.keys(attrDefs);
    var AttributesCopy = new Function('values', "\n        " + attrs.map(function (attr) { return "\n            this." + attr + " = values." + attr + ";\n        "; }).join('') + "\n    ");
    AttributesCopy.prototype = Object.prototype;
    var Attributes = new Function('record', 'values', 'options', "\n        var _attrs = record._attributes;\n\n        " + attrs.map(function (attr) { return "\n            this." + attr + " = _attrs." + attr + ".doInit( values." + attr + ", record, options );\n        "; }).join('') + "\n    ");
    Attributes.prototype = Object.prototype;
    return { Attributes: Attributes, AttributesCopy: AttributesCopy };
}
function shouldBeAnObject(record, values) {
    if (values && values.constructor === Object)
        return true;
    record._log('warn', 'update with non-object is ignored!', { values: values });
    return false;
}
var RecordTransaction = (function () {
    function RecordTransaction(object, isRoot, nested, changes) {
        this.object = object;
        this.isRoot = isRoot;
        this.nested = nested;
        this.changes = changes;
    }
    RecordTransaction.prototype.commit = function (initiator) {
        var _a = this, nested = _a.nested, object = _a.object, changes = _a.changes;
        for (var _i = 0, nested_2 = nested; _i < nested_2.length; _i++) {
            var transaction = nested_2[_i];
            transaction.commit(object);
        }
        var attributes = object.attributes, _isDirty = object._isDirty;
        for (var _b = 0, changes_1 = changes; _b < changes_1.length; _b++) {
            var key = changes_1[_b];
            trigger3$3(object, 'change:' + key, object, attributes[key], _isDirty);
        }
        this.isRoot && commit$1(object, initiator);
    };
    return RecordTransaction;
}());

var notEqual$1 = notEqual;
var assign$5 = assign;
var emptyOptions = {};
var AnyType = (function () {
    function AnyType(name, a_options) {
        this.name = name;
        this.getHook = null;
        this.options = a_options;
        var options = assign$5({ getHooks: [], transforms: [], changeHandlers: [] }, a_options);
        options.getHooks = options.getHooks.slice();
        options.transforms = options.transforms.slice();
        options.changeHandlers = options.changeHandlers.slice();
        var value = options.value, type = options.type, parse = options.parse, toJSON = options.toJSON, changeEvents = options.changeEvents, validate = options.validate, getHooks = options.getHooks, transforms = options.transforms, changeHandlers = options.changeHandlers;
        this.value = value;
        this.type = type;
        if (!options.hasCustomDefault && type) {
            this.defaultValue = this.create;
        }
        else if (isValidJSON(value)) {
            this.defaultValue = new Function("return " + JSON.stringify(value) + ";");
        }
        else {
            this.defaultValue = this.defaultValue;
        }
        this.propagateChanges = changeEvents !== false;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.validate = validate || this.validate;
        if (options.isRequired) {
            this.validate = wrapIsRequired(this.validate);
        }
        transforms.unshift(this.convert);
        this.parse = parse || this.parse;
        if (this.get)
            getHooks.unshift(this.get);
        this.initialize.call(this, options);
        if (getHooks.length) {
            var getHook_1 = this.getHook = getHooks.reduce(chainGetHooks);
            var validate_1 = this.validate;
            this.validate = function (record, value, key) {
                return validate_1.call(this, record, getHook_1.call(record, value, key), key);
            };
        }
        this.transform = transforms.length ? transforms.reduce(chainTransforms) : this.transform;
        this.handleChange = changeHandlers.length ? changeHandlers.reduce(chainChangeHandlers) : this.handleChange;
    }
    AnyType.create = function (options, name) {
        var type = options.type, AttributeCtor = options._attribute || (type ? type._attribute : AnyType);
        return new AttributeCtor(name, options);
    };
    AnyType.prototype.canBeUpdated = function (prev, next, options) { };
    AnyType.prototype.transform = function (next, prev, model, options) { return next; };
    AnyType.prototype.convert = function (next, prev, model, options) { return next; };
    AnyType.prototype.isChanged = function (a, b) {
        return notEqual$1(a, b);
    };
    AnyType.prototype.handleChange = function (next, prev, model, options) { };
    AnyType.prototype.create = function () { return void 0; };
    AnyType.prototype.clone = function (value, record) {
        return value;
    };
    AnyType.prototype.dispose = function (record, value) {
        this.handleChange(void 0, value, record, emptyOptions);
    };
    AnyType.prototype.validate = function (record, value, key) { };
    AnyType.prototype.toJSON = function (value, key) {
        return value && value.toJSON ? value.toJSON() : value;
    };
    AnyType.prototype.createPropertyDescriptor = function () {
        var _a = this, name = _a.name, getHook = _a.getHook;
        if (name !== 'id') {
            return {
                set: function (value) {
                    setAttribute(this, name, value);
                },
                get: (getHook ?
                    function () {
                        return getHook.call(this, this.attributes[name], name);
                    } :
                    function () { return this.attributes[name]; })
            };
        }
    };
    AnyType.prototype.initialize = function (name, options) { };
    AnyType.prototype.doInit = function (value, record, options) {
        var v = value === void 0 ? this.defaultValue() : value, x = this.transform(v, void 0, record, options);
        this.handleChange(x, void 0, record, options);
        return x;
    };
    AnyType.prototype.doUpdate = function (value, record, options, nested) {
        var name = this.name, attributes = record.attributes, prev = attributes[name];
        var next = this.transform(value, prev, record, options);
        attributes[name] = next;
        if (this.isChanged(next, prev)) {
            this.handleChange(next, prev, record, options);
            return true;
        }
        return false;
    };
    AnyType.prototype._log = function (level, text, value, record) {
        log(level, "[Attribute Update Error] " + record.getClassName() + "." + this.name + ": " + text, {
            'Record': record,
            'Attribute definition': this,
            'Prev. value': record.attributes[this.name],
            'New value': value
        });
    };
    AnyType.prototype.defaultValue = function () {
        return this.value;
    };
    return AnyType;
}());
function chainGetHooks(prevHook, nextHook) {
    return function (value, name) {
        return nextHook.call(this, prevHook.call(this, value, name), name);
    };
}
function chainTransforms(prevTransform, nextTransform) {
    return function (next, prev, record, options) {
        return nextTransform.call(this, prevTransform.call(this, next, prev, record, options), prev, record, options);
    };
}
function chainChangeHandlers(prevHandler, nextHandler) {
    return function (next, prev, record, options) {
        prevHandler.call(this, next, prev, record, options);
        nextHandler.call(this, next, prev, record, options);
    };
}
function wrapIsRequired(validate) {
    return function (record, value, key) {
        return value ? validate.call(this, record, value, key) : 'Required';
    };
}

var free = transactionApi.free;
var aquire = transactionApi.aquire;
var AggregatedType = (function (_super) {
    __extends(AggregatedType, _super);
    function AggregatedType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregatedType.prototype.clone = function (value) {
        return value ? value.clone() : value;
    };
    AggregatedType.prototype.toJSON = function (x) { return x && x.toJSON(); };
    AggregatedType.prototype.doInit = function (value, record, options) {
        var v = options.clone ? this.clone(value) : (value === void 0 ? this.defaultValue() : value);
        var x = this.transform(v, void 0, record, options);
        this.handleChange(x, void 0, record, options);
        return x;
    };
    AggregatedType.prototype.doUpdate = function (value, record, options, nested) {
        var key = this.name, attributes = record.attributes;
        var prev = attributes[key];
        var update;
        if (update = this.canBeUpdated(prev, value, options)) {
            var nestedTransaction = prev._createTransaction(update, options);
            if (nestedTransaction) {
                if (nested) {
                    nested.push(nestedTransaction);
                }
                else {
                    nestedTransaction.commit(record);
                }
                if (this.propagateChanges)
                    return true;
            }
            return false;
        }
        var next = this.transform(value, prev, record, options);
        attributes[key] = next;
        if (this.isChanged(next, prev)) {
            this.handleChange(next, prev, record, options);
            return true;
        }
        return false;
    };
    AggregatedType.prototype.canBeUpdated = function (prev, next, options) {
        if (prev && next != null) {
            if (next instanceof this.type) {
                if (options.merge)
                    return next.__inner_state__;
            }
            else {
                return next;
            }
        }
    };
    AggregatedType.prototype.convert = function (next, prev, record, options) {
        if (next == null)
            return next;
        if (next instanceof this.type) {
            if (next._shared && !(next._shared & ItemsBehavior.persistent)) {
                this._log('error', 'aggregated collection attribute is assigned with shared collection', next, record);
            }
            return options.merge ? next.clone() : next;
        }
        return this.type.create(next, options);
    };
    AggregatedType.prototype.dispose = function (record, value) {
        if (value) {
            this.handleChange(void 0, value, record, {});
        }
    };
    AggregatedType.prototype.validate = function (record, value) {
        var error = value && value.validationError;
        if (error)
            return error;
    };
    AggregatedType.prototype.create = function () {
        return this.type.create();
    };
    AggregatedType.prototype.initialize = function (options) {
        options.changeHandlers.unshift(this._handleChange);
    };
    AggregatedType.prototype._handleChange = function (next, prev, record, options) {
        if (prev) {
            free(record, prev);
            options.unset || prev.dispose();
        }
        if (next && !aquire(record, next, this.name)) {
            this._log('error', 'aggregated attribute assigned with object already having an owner', next, record);
        }
    };
    return AggregatedType;
}(AnyType));

var assign$6 = assign;
var ChainableAttributeSpec = (function () {
    function ChainableAttributeSpec(options) {
        this.options = { getHooks: [], transforms: [], changeHandlers: [] };
        if (options)
            assign$6(this.options, options);
    }
    ChainableAttributeSpec.prototype.check = function (check, error) {
        function validate(model, value, name) {
            if (!check.call(model, value, name)) {
                var msg = error || check.error || name + ' is not valid';
                return typeof msg === 'function' ? msg.call(model, name) : msg;
            }
        }
        var prev = this.options.validate;
        return this.metadata({
            validate: prev ? (function (model, value, name) {
                return prev(model, value, name) || validate(model, value, name);
            }) : validate
        });
    };
    Object.defineProperty(ChainableAttributeSpec.prototype, "asProp", {
        get: function () {
            return definitionDecorator('attributes', this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChainableAttributeSpec.prototype, "isRequired", {
        get: function () {
            return this.metadata({ isRequired: true });
        },
        enumerable: true,
        configurable: true
    });
    ChainableAttributeSpec.prototype.watcher = function (ref) {
        return this.metadata({ _onChange: ref });
    };
    ChainableAttributeSpec.prototype.parse = function (fun) {
        return this.metadata({ parse: fun });
    };
    ChainableAttributeSpec.prototype.toJSON = function (fun) {
        return this.metadata({
            toJSON: typeof fun === 'function' ? fun : (fun ? function (x) { return x && x.toJSON(); } : emptyFunction)
        });
    };
    ChainableAttributeSpec.prototype.get = function (fun) {
        return this.metadata({
            getHooks: this.options.getHooks.concat(fun)
        });
    };
    ChainableAttributeSpec.prototype.set = function (fun) {
        function handleSetHook(next, prev, record, options) {
            if (this.isChanged(next, prev)) {
                var changed = fun.call(record, next, this.name);
                return changed === void 0 ? prev : this.convert(changed, prev, record, options);
            }
            return prev;
        }
        return this.metadata({
            transforms: this.options.transforms.concat(handleSetHook)
        });
    };
    ChainableAttributeSpec.prototype.changeEvents = function (events) {
        return this.metadata({ changeEvents: events });
    };
    ChainableAttributeSpec.prototype.events = function (map) {
        var eventMap = new EventMap(map);
        function handleEventsSubscribtion(next, prev, record) {
            prev && prev.trigger && eventMap.unsubscribe(record, prev);
            next && next.trigger && eventMap.subscribe(record, next);
        }
        return this.metadata({
            changeHandlers: this.options.changeHandlers.concat(handleEventsSubscribtion)
        });
    };
    Object.defineProperty(ChainableAttributeSpec.prototype, "has", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    ChainableAttributeSpec.prototype.metadata = function (options) {
        var cloned = new ChainableAttributeSpec(this.options);
        assign$6(cloned.options, options);
        return cloned;
    };
    ChainableAttributeSpec.prototype.value = function (x) {
        return this.metadata({ value: x, hasCustomDefault: true });
    };
    return ChainableAttributeSpec;
}());
function emptyFunction() { }
Function.prototype.value = function (x) {
    return new ChainableAttributeSpec({ type: this, value: x, hasCustomDefault: true });
};
Object.defineProperty(Function.prototype, 'isRequired', {
    get: function () { return this._isRequired || this.has.isRequired; },
    set: function (x) { this._isRequired = x; }
});
Object.defineProperty(Function.prototype, 'asProp', {
    get: function () { return this.has.asProp; },
});
Object.defineProperty(Function.prototype, 'has', {
    get: function () {
        return this._has || new ChainableAttributeSpec({
            type: this,
            value: this._attribute.defaultValue,
            hasCustomDefault: this._attribute.defaultValue !== void 0
        });
    },
    set: function (value) { this._has = value; }
});
function toAttributeOptions(spec) {
    var attrSpec;
    if (typeof spec === 'function') {
        attrSpec = spec.has;
    }
    else if (spec && spec instanceof ChainableAttributeSpec) {
        attrSpec = spec;
    }
    else {
        var type = inferType(spec);
        if (type && type.prototype instanceof Transactional) {
            attrSpec = type.shared.value(spec);
        }
        else {
            attrSpec = new ChainableAttributeSpec({ type: type, value: spec, hasCustomDefault: true });
        }
    }
    return attrSpec.options;
}
function inferType(value) {
    switch (typeof value) {
        case 'number':
            return Number;
        case 'string':
            return String;
        case 'boolean':
            return Boolean;
        case 'undefined':
            return void 0;
        case 'object':
            return value ? value.constructor : void 0;
    }
}

var DateType = (function (_super) {
    __extends(DateType, _super);
    function DateType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateType.prototype.create = function () {
        return new Date();
    };
    DateType.prototype.convert = function (next, a, record) {
        if (next == null || next instanceof Date)
            return next;
        var date = new Date(next), timestamp = date.getTime();
        if (timestamp !== timestamp) {
            this._log('warn', 'assigned with Invalid Date', next, record);
        }
        return date;
    };
    DateType.prototype.validate = function (model, value, name) {
        if (value != null) {
            var timestamp = value.getTime();
            if (timestamp !== timestamp)
                return name + ' is Invalid Date';
        }
    };
    DateType.prototype.toJSON = function (value) { return value && value.toISOString(); };
    DateType.prototype.isChanged = function (a, b) { return (a && a.getTime()) !== (b && b.getTime()); };
    DateType.prototype.doInit = function (value, record, options) {
        return this.transform(value === void 0 ? this.defaultValue() : value, void 0, record, options);
    };
    DateType.prototype.doUpdate = function (value, record, options, nested) {
        var name = this.name, attributes = record.attributes, prev = attributes[name];
        return this.isChanged(prev, attributes[name] = this.transform(value, prev, record, options));
    };
    DateType.prototype.clone = function (value) { return value && new Date(value.getTime()); };
    DateType.prototype.dispose = function () { };
    return DateType;
}(AnyType));
Date._attribute = DateType;
var msDatePattern = /\/Date\(([0-9]+)\)\//;
var MSDateType = (function (_super) {
    __extends(MSDateType, _super);
    function MSDateType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MSDateType.prototype.convert = function (next) {
        if (typeof next === 'string') {
            var msDate = msDatePattern.exec(next);
            if (msDate) {
                return new Date(Number(msDate[1]));
            }
        }
        return DateType.prototype.convert.apply(this, arguments);
    };
    MSDateType.prototype.toJSON = function (value) { return value && "/Date(" + value.getTime() + ")/"; };
    return MSDateType;
}(DateType));
var TimestampType = (function (_super) {
    __extends(TimestampType, _super);
    function TimestampType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimestampType.prototype.toJSON = function (value) { return value && value.getTime(); };
    return TimestampType;
}(DateType));
Object.defineProperties(Date, {
    microsoft: {
        get: function () {
            return new ChainableAttributeSpec({
                type: Date,
                _attribute: MSDateType
            });
        }
    },
    timestamp: {
        get: function () {
            return new ChainableAttributeSpec({
                type: Date,
                _attribute: TimestampType
            });
        }
    }
});
function supportsDate(date) {
    return !isNaN((new Date(date)).getTime());
}
if (!supportsDate('2011-11-29T15:52:30.5') ||
    !supportsDate('2011-11-29T15:52:30.52') ||
    !supportsDate('2011-11-29T15:52:18.867') ||
    !supportsDate('2011-11-29T15:52:18.867Z') ||
    !supportsDate('2011-11-29T15:52:18.867-03:30')) {
    DateType.prototype.convert = function (value) {
        return value == null || value instanceof Date ? value : new Date(safeParseDate(value));
    };
}
var numericKeys = [1, 4, 5, 6, 7, 10, 11];
var isoDatePattern = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
function safeParseDate(date) {
    var timestamp, struct, minutesOffset = 0;
    if ((struct = isoDatePattern.exec(date))) {
        for (var i = 0, k; (k = numericKeys[i]); ++i) {
            struct[k] = +struct[k] || 0;
        }
        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1;
        if (struct[8] !== 'Z' && struct[9] !== undefined) {
            minutesOffset = struct[10] * 60 + struct[11];
            if (struct[9] === '+') {
                minutesOffset = 0 - minutesOffset;
            }
        }
        timestamp =
            Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
    else {
        timestamp = Date.parse(date);
    }
    return timestamp;
}

var ImmutableClassType = (function (_super) {
    __extends(ImmutableClassType, _super);
    function ImmutableClassType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImmutableClassType.prototype.create = function () {
        return new this.type();
    };
    ImmutableClassType.prototype.convert = function (next) {
        return next == null || next instanceof this.type ? next : new this.type(next);
    };
    ImmutableClassType.prototype.toJSON = function (value) {
        return value && value.toJSON ? value.toJSON() : value;
    };
    ImmutableClassType.prototype.clone = function (value) {
        return new this.type(this.toJSON(value));
    };
    ImmutableClassType.prototype.isChanged = function (a, b) {
        return a !== b;
    };
    return ImmutableClassType;
}(AnyType));
Function.prototype._attribute = ImmutableClassType;
var PrimitiveType = (function (_super) {
    __extends(PrimitiveType, _super);
    function PrimitiveType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrimitiveType.prototype.dispose = function () { };
    PrimitiveType.prototype.create = function () { return this.type(); };
    PrimitiveType.prototype.toJSON = function (value) { return value; };
    PrimitiveType.prototype.convert = function (next) { return next == null ? next : this.type(next); };
    PrimitiveType.prototype.isChanged = function (a, b) { return a !== b; };
    PrimitiveType.prototype.clone = function (value) { return value; };
    PrimitiveType.prototype.doInit = function (value, record, options) {
        return this.transform(value === void 0 ? this.value : value, void 0, record, options);
    };
    PrimitiveType.prototype.doUpdate = function (value, record, options, nested) {
        var name = this.name, attributes = record.attributes, prev = attributes[name];
        return prev !== (attributes[name] = this.transform(value, prev, record, options));
    };
    PrimitiveType.prototype.initialize = function () {
        if (!this.options.hasCustomDefault) {
            this.value = this.type();
        }
    };
    return PrimitiveType;
}(AnyType));
Boolean._attribute = String._attribute = PrimitiveType;
var NumericType = (function (_super) {
    __extends(NumericType, _super);
    function NumericType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericType.prototype.create = function () {
        return 0;
    };
    NumericType.prototype.convert = function (next, prev, record) {
        var num = next == null ? next : this.type(next);
        if (num !== num) {
            this._log('warn', 'assigned with Invalid Number', next, record);
        }
        return num;
    };
    NumericType.prototype.validate = function (model, value, name) {
        if (value != null && !isFinite(value)) {
            return name + ' is not valid number';
        }
    };
    return NumericType;
}(PrimitiveType));
Number._attribute = NumericType;
function Integer(x) {
    return x ? Math.round(x) : 0;
}
Integer._attribute = NumericType;
Number.integer = Integer;
if (typeof window !== 'undefined') {
    window.Integer = Number.integer;
}
var ArrayType = (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayType.prototype.toJSON = function (value) { return value; };
    ArrayType.prototype.dispose = function () { };
    ArrayType.prototype.create = function () { return []; };
    ArrayType.prototype.convert = function (next, prev, record) {
        if (next == null || Array.isArray(next))
            return next;
        this._log('warn', 'assignment of non-array to Array attribute is ignored', next, record);
        return [];
    };
    ArrayType.prototype.clone = function (value) {
        return value && value.slice();
    };
    return ArrayType;
}(AnyType));
Array._attribute = ArrayType;
var ObjectType = (function (_super) {
    __extends(ObjectType, _super);
    function ObjectType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectType.prototype.create = function () { return {}; };
    ObjectType.prototype.convert = function (next, prev, record) {
        if (next == null || typeof next === 'object')
            return next;
        this._log('warn', 'assignment of non-object to Object attribute is ignored', next, record);
        return {};
    };
    return ObjectType;
}(AnyType));
Object._attribute = ObjectType;
function doNothing() { }
var FunctionType = (function (_super) {
    __extends(FunctionType, _super);
    function FunctionType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionType.prototype.toJSON = function (value) { return void 0; };
    FunctionType.prototype.create = function () { return doNothing; };
    FunctionType.prototype.dispose = function () { };
    FunctionType.prototype.convert = function (next, prev, record) {
        if (next == null || typeof next === 'function')
            return next;
        this._log('warn', 'assigned with non-function', next, record);
        return doNothing;
    };
    FunctionType.prototype.clone = function (value) { return value; };
    return FunctionType;
}(AnyType));
Function._attribute = FunctionType;

var on$5 = on$2;
var off$5 = off$2;
var free$1 = transactionApi.free;
var aquire$1 = transactionApi.aquire;
var shareAndListen = ItemsBehavior.listen | ItemsBehavior.share;
var SharedType = (function (_super) {
    __extends(SharedType, _super);
    function SharedType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SharedType.prototype.doInit = function (value, record, options) {
        var v = options.clone ? this.clone(value, record) : (value === void 0 ? this.defaultValue() : value);
        var x = this.transform(v, void 0, record, options);
        this.handleChange(x, void 0, record, options);
        return x;
    };
    SharedType.prototype.doUpdate = function (value, record, options, nested) {
        var key = this.name, attributes = record.attributes;
        var prev = attributes[key];
        var update;
        if (update = this.canBeUpdated(prev, value, options)) {
            var nestedTransaction = prev._createTransaction(update, options);
            if (nestedTransaction) {
                if (nested) {
                    nested.push(nestedTransaction);
                }
                else {
                    nestedTransaction.commit(record);
                }
                if (this.propagateChanges)
                    return true;
            }
            return false;
        }
        var next = this.transform(value, prev, record, options);
        attributes[key] = next;
        if (this.isChanged(next, prev)) {
            this.handleChange(next, prev, record, options);
            return true;
        }
        return false;
    };
    SharedType.prototype.clone = function (value, record) {
        if (!value || value._owner !== record)
            return value;
        var clone = value.clone();
        aquire$1(record, clone, this.name);
        return clone;
    };
    SharedType.prototype.toJSON = function () { };
    SharedType.prototype.canBeUpdated = function (prev, next, options) {
        if (prev && next != null && !(next instanceof this.type)) {
            return next;
        }
    };
    SharedType.prototype.convert = function (next, prev, record, options) {
        if (next == null || next instanceof this.type)
            return next;
        var implicitObject = new this.type(next, options, shareAndListen);
        aquire$1(record, implicitObject, this.name);
        return implicitObject;
    };
    SharedType.prototype.validate = function (model, value, name) { };
    SharedType.prototype.create = function () {
        return null;
    };
    SharedType.prototype._handleChange = function (next, prev, record, options) {
        if (prev) {
            if (prev._owner === record) {
                free$1(record, prev);
                options.unset || prev.dispose();
            }
            else {
                off$5(prev, prev._changeEventName, this._onChange, record);
            }
        }
        if (next) {
            if (next._owner !== record) {
                on$5(next, next._changeEventName, this._onChange, record);
            }
        }
    };
    SharedType.prototype.dispose = function (record, value) {
        if (value) {
            this.handleChange(void 0, value, record, {});
        }
    };
    SharedType.prototype.initialize = function (options) {
        var attribute = this;
        this._onChange = this.propagateChanges ? function (child, options, initiator) {
            this === initiator || this.forceAttributeChange(attribute.name, options);
        } : ignore;
        options.changeHandlers.unshift(this._handleChange);
    };
    return SharedType;
}(AnyType));
function ignore() { }

var compile = function (attributesDefinition, baseClassAttributes) {
    var myAttributes = transform({}, attributesDefinition, createAttribute), allAttributes = defaults({}, myAttributes, baseClassAttributes);
    var ConstructorsMixin = constructorsMixin(allAttributes);
    return __assign({}, ConstructorsMixin, { _attributes: new ConstructorsMixin.AttributesCopy(allAttributes), _attributesArray: Object.keys(allAttributes).map(function (key) { return allAttributes[key]; }), properties: transform({}, myAttributes, function (x) { return x.createPropertyDescriptor(); }), _toJSON: createToJSON(allAttributes) }, parseMixin(allAttributes), localEventsMixin(myAttributes));
};
function createAttribute(spec, name) {
    return AnyType.create(toAttributeOptions(spec), name);
}
function parseMixin(attributes) {
    var attrsWithParse = Object.keys(attributes).filter(function (name) { return attributes[name].parse; });
    return attrsWithParse.length ? {
        _parse: new Function('json', "\n            var _attrs = this._attributes;\n\n            " + attrsWithParse.map(function (name) { return "                \n                json." + name + " === void 0 || ( json." + name + " = _attrs." + name + ".parse.call( this, json." + name + ", \"" + name + "\" ) );\n            "; }).join('') + "\n\n            return json;\n        ")
    } : {};
}
function createToJSON(attributes) {
    return new Function("\n        var json = {},\n            v = this.attributes,\n            a = this._attributes;\n\n        " + Object.keys(attributes).map(function (key) {
        if (attributes[key].toJSON) {
            return "json." + key + " = a." + key + ".toJSON.call( this, v." + key + ", '" + key + "' );";
        }
    }).join('\n') + "\n\n        return json;\n    ");
}
function createSharedTypeSpec(Constructor, Attribute) {
    if (!Constructor.hasOwnProperty('shared')) {
        Object.defineProperty(Constructor, 'shared', {
            get: function () {
                return new ChainableAttributeSpec({
                    value: null,
                    type: Constructor,
                    _attribute: Attribute
                });
            }
        });
    }
}
function localEventsMixin(attrSpecs) {
    var _localEvents;
    for (var key in attrSpecs) {
        var attribute = attrSpecs[key], _onChange = attribute.options._onChange;
        if (_onChange) {
            _localEvents || (_localEvents = new EventMap());
            _localEvents.addEvent('change:' + key, typeof _onChange === 'string' ?
                createWatcherFromRef(_onChange, key) :
                wrapWatcher(_onChange, key));
        }
    }
    return _localEvents ? { _localEvents: _localEvents } : {};
}
function wrapWatcher(watcher, key) {
    return function (record, value) {
        watcher.call(record, value, key);
    };
}
function createWatcherFromRef(ref, key) {
    var _a = new CompiledReference(ref, true), local = _a.local, resolve = _a.resolve, tail = _a.tail;
    return local ?
        function (record, value) {
            record[tail](value, key);
        } :
        function (record, value) {
            resolve(record)[tail](value, key);
        };
}

var IORecordMixin = {
    getEndpoint: function () {
        return getOwnerEndpoint$1(this) || this._endpoint;
    },
    save: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var endpoint = this.getEndpoint(), json = this.toJSON();
        return startIO(this, this.isNew() ?
            endpoint.create(json, options) :
            endpoint.update(this.id, json, options), options, function (update) {
            _this.set(update, __assign({ parse: true }, options));
        });
    },
    fetch: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().read(this.id, options), options, function (json) { return _this.set(json, __assign({ parse: true }, options)); });
    },
    destroy: function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return startIO(this, this.getEndpoint().destroy(this.id, options), options, function () {
            var collection = _this.collection;
            if (collection) {
                collection.remove(_this, options);
            }
            else {
                _this.dispose();
            }
        });
    }
};

var assign$4 = assign;
var isEmpty$1 = isEmpty;
var log$2 = log;
var _cidCounter = 0;
var Record = (function (_super) {
    __extends(Record, _super);
    function Record(a_values, a_options) {
        var _this = _super.call(this, _cidCounter++) || this;
        _this.attributes = {};
        var options = a_options || {}, values = (options.parse ? _this.parse(a_values, options) : a_values) || {};
        if (log$2.level > 1)
            typeCheck(_this, values);
        _this._previousAttributes = _this.attributes = new _this.Attributes(_this, values, options);
        _this.initialize(a_values, a_options);
        if (_this._localEvents)
            _this._localEvents.subscribe(_this, _this);
        return _this;
    }
    Record_1 = Record;
    Record.onDefine = function (definition, BaseClass) { };
    Record.defaults = function (attrs) {
        return this.extend({ attributes: attrs });
    };
    Record.prototype.previousAttributes = function () { return new this.AttributesCopy(this._previousAttributes); };
    Object.defineProperty(Record.prototype, "__inner_state__", {
        get: function () { return this.attributes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "changed", {
        get: function () {
            var changed = this._changedAttributes;
            if (!changed) {
                var prev = this._previousAttributes;
                changed = {};
                var _a = this, _attributes = _a._attributes, attributes = _a.attributes;
                for (var _i = 0, _b = this._attributesArray; _i < _b.length; _i++) {
                    var attr = _b[_i];
                    var key = attr.name, value = attributes[key];
                    if (attr.isChanged(value, prev[key])) {
                        changed[key] = value;
                    }
                }
                this._changedAttributes = changed;
            }
            return changed;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.changedAttributes = function (diff) {
        if (!diff)
            return this.hasChanged() ? assign$4({}, this.changed) : false;
        var val, changed = false, old = this._transaction ? this._previousAttributes : this.attributes, attrSpecs = this._attributes;
        for (var attr in diff) {
            if (!attrSpecs[attr].isChanged(old[attr], (val = diff[attr])))
                continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    };
    Record.prototype.hasChanged = function (key) {
        var _previousAttributes = this._previousAttributes;
        if (!_previousAttributes)
            return false;
        return key ?
            this._attributes[key].isChanged(this.attributes[key], _previousAttributes[key]) :
            !isEmpty$1(this.changed);
    };
    Record.prototype.previous = function (key) {
        if (key) {
            var _previousAttributes = this._previousAttributes;
            if (_previousAttributes)
                return _previousAttributes[key];
        }
        return null;
    };
    Record.prototype.isNew = function () {
        return this.id == null;
    };
    Record.prototype.has = function (key) {
        return this[key] != void 0;
    };
    Record.prototype.unset = function (key, options) {
        var value = this[key];
        this.set((_a = {}, _a[key] = void 0, _a), __assign({ unset: true }, options));
        return value;
        var _a;
    };
    Record.prototype.clear = function (options) {
        var _this = this;
        var nullify = options && options.nullify;
        this.transaction(function () {
            _this.forEachAttr(_this.attributes, function (value, key) { return _this[key] = nullify ? null : void 0; });
        }, options);
        return this;
    };
    Record.prototype.getOwner = function () {
        var owner = this._owner;
        return this._ownerKey ? owner : owner && owner._owner;
    };
    Object.defineProperty(Record.prototype, "id", {
        get: function () { return this.attributes[this.idAttribute]; },
        set: function (x) { setAttribute(this, this.idAttribute, x); },
        enumerable: true,
        configurable: true
    });
    Record.prototype.forEachAttr = function (attrs, iteratee) {
        var _attributes = this._attributes;
        var unknown;
        for (var name_1 in attrs) {
            var spec = _attributes[name_1];
            if (spec) {
                iteratee(attrs[name_1], name_1, spec);
            }
            else {
                unknown || (unknown = []);
                unknown.push("'" + name_1 + "'");
            }
        }
        if (unknown) {
            this._log('warn', "attributes " + unknown.join(', ') + " are not defined", {
                attributes: attrs
            });
        }
    };
    Record.prototype.each = function (iteratee, context) {
        var fun = context !== void 0 ? function (v, k) { return iteratee.call(context, v, k); } : iteratee, attributes = this.attributes;
        for (var key in this.attributes) {
            var value = attributes[key];
            if (value !== void 0)
                fun(value, key);
        }
    };
    Record.prototype.keys = function () {
        var keys$$1 = [];
        this.each(function (value, key) { return value === void 0 || keys$$1.push(key); });
        return keys$$1;
    };
    Record.prototype.values = function () {
        return this.map(function (value) { return value; });
    };
    Record.prototype._toJSON = function () { return {}; };
    Record.prototype._parse = function (data) { return data; };
    Record.prototype.defaults = function (values) {
        if (values === void 0) { values = {}; }
        var defaults$$1 = {}, _attributesArray = this._attributesArray;
        for (var _i = 0, _attributesArray_1 = _attributesArray; _i < _attributesArray_1.length; _i++) {
            var attr = _attributesArray_1[_i];
            var key = attr.name, value = values[key];
            defaults$$1[key] = value === void 0 ? attr.defaultValue() : value;
        }
        return defaults$$1;
    };
    Record.prototype.initialize = function (values, options) { };
    Record.prototype.clone = function (options) {
        if (options === void 0) { options = {}; }
        var copy = new this.constructor(this.attributes, { clone: true });
        if (options.pinStore)
            copy._defaultStore = this.getStore();
        return copy;
    };
    Record.prototype.deepClone = function () { return this.clone(); };
    
    Record.prototype._validateNested = function (errors) {
        var _this = this;
        var length = 0;
        this.forEachAttr(this.attributes, function (value, name, attribute) {
            var error = attribute.validate(_this, value, name);
            if (error) {
                errors[name] = error;
                length++;
            }
        });
        return length;
    };
    Record.prototype.get = function (key) {
        return this[key];
    };
    Record.prototype.toJSON = function () {
        var _this = this;
        var json = {};
        this.forEachAttr(this.attributes, function (value, key, _a) {
            var toJSON = _a.toJSON;
            if (value !== void 0) {
                var asJson = toJSON.call(_this, value, key);
                if (asJson !== void 0)
                    json[key] = asJson;
            }
        });
        return json;
    };
    Record.prototype.parse = function (data, options) {
        return this._parse(data);
    };
    Record.prototype.deepSet = function (name, value, options) {
        var _this = this;
        this.transaction(function () {
            var path = name.split('.'), l = path.length - 1, attr = path[l];
            var model = _this;
            for (var i = 0; i < l; i++) {
                var key = path[i];
                var next = model.get ? model.get(key) : model[key];
                if (!next) {
                    var attrSpecs = model._attributes;
                    if (attrSpecs) {
                        var newModel = attrSpecs[key].create();
                        if (options && options.nullify && newModel._attributes) {
                            newModel.clear(options);
                        }
                        model[key] = next = newModel;
                    }
                    else
                        return;
                }
                model = next;
            }
            if (model.set) {
                model.set((_a = {}, _a[attr] = value, _a), options);
            }
            else {
                model[attr] = value;
            }
            var _a;
        });
        return this;
    };
    Object.defineProperty(Record.prototype, "collection", {
        get: function () {
            return this._ownerKey ? null : this._owner;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.dispose = function () {
        var _this = this;
        if (this._disposed)
            return;
        this.forEachAttr(this.attributes, function (value, key, attribute) {
            attribute.dispose(_this, value);
        });
        _super.prototype.dispose.call(this);
    };
    Record.prototype._log = function (level, text, props) {
        log(level, '[Record] ' + text, __assign({ 'Record': this, 'Attributes definition:': this._attributes }, props));
    };
    Record.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) || 'Record';
    };
    Record.prototype._createTransaction = function (values, options) { return void 0; };
    Record = Record_1 = __decorate([
        define({
            cidPrefix: 'm',
            _changeEventName: 'change',
            idAttribute: 'id'
        }),
        mixins(IORecordMixin),
        definitions({
            defaults: mixinRules.merge,
            attributes: mixinRules.merge,
            endpoints: mixinRules.merge,
            collection: mixinRules.merge,
            Collection: mixinRules.value,
            idAttribute: mixinRules.protoValue
        })
    ], Record);
    return Record;
    var Record_1;
}(Transactional));

assign$4(Record.prototype, UpdateRecordMixin);
var BaseRecordAttributes = (function () {
    function BaseRecordAttributes(record, x, options) {
        this.id = x.id;
    }
    return BaseRecordAttributes;
}());
Record.prototype.Attributes = BaseRecordAttributes;
var BaseRecordAttributesCopy = (function () {
    function BaseRecordAttributesCopy(x) {
        this.id = x.id;
    }
    return BaseRecordAttributesCopy;
}());
Record.prototype.AttributesCopy = BaseRecordAttributesCopy;
var IdAttribute = AnyType.create({ value: void 0 }, 'id');
Record.prototype._attributes = { id: IdAttribute };
Record.prototype._attributesArray = [IdAttribute];
Record._attribute = AggregatedType;
function typeCheck(record, values) {
    if (shouldBeAnObject(record, values)) {
        var _attributes = record._attributes;
        var unknown = void 0;
        for (var name_2 in values) {
            if (!_attributes[name_2]) {
                unknown || (unknown = []);
                unknown.push("'" + name_2 + "'");
            }
        }
        if (unknown) {
            record._log('warn', "undefined attributes " + unknown.join(', ') + " are ignored.", { values: values });
        }
    }
}

var assign$3 = assign;
var defaults$2 = defaults;
Record.onExtend = function (BaseClass) {
    Transactional.onExtend.call(this, BaseClass);
    var Class = this;
    var DefaultCollection = (function (_super) {
        __extends(DefaultCollection, _super);
        function DefaultCollection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DefaultCollection.model = Class;
        DefaultCollection = __decorate([
            predefine
        ], DefaultCollection);
        return DefaultCollection;
    }(BaseClass.Collection));
    this.DefaultCollection = DefaultCollection;
    if (Class.Collection === BaseClass.Collection) {
        this.Collection = DefaultCollection;
    }
    createSharedTypeSpec(this, SharedType);
};
Record.onDefine = function (definition, BaseClass) {
    var baseProto = BaseClass.prototype;
    var _a = compile(this.attributes = getAttributes(definition), baseProto._attributes), properties = _a.properties, _localEvents = _a._localEvents, dynamicMixin = __rest(_a, ["properties", "_localEvents"]);
    assign$3(this.prototype, dynamicMixin);
    definition.properties = defaults$2(definition.properties || {}, properties);
    definition._localEvents = _localEvents;
    if (definition.endpoints)
        this.prototype._endpoints = definition.endpoints;
    Transactional.onDefine.call(this, definition, BaseClass);
    this.DefaultCollection.define(definition.collection || {});
    this.Collection = definition.Collection;
    this.Collection.prototype.model = this;
    if (definition.endpoint)
        this.Collection.prototype._endpoint = definition.endpoint;
};
Record._attribute = AggregatedType;
createSharedTypeSpec(Record, SharedType);
function getAttributes(_a) {
    var defaults$$1 = _a.defaults, attributes = _a.attributes, idAttribute = _a.idAttribute;
    var definition = attributes || defaults$$1 || {};
    if (idAttribute && !(idAttribute in definition)) {
        definition[idAttribute] = void 0;
    }
    return definition;
}
function attr(proto, attrName) {
    if (attrName) {
        if (typeof Reflect !== 'undefined' && Reflect.getMetadata) {
            Reflect
                .getMetadata("design:type", proto, attrName)
                .asProp(proto, attrName);
        }
        else {
            proto._log('error', 'Add import "reflect-metadata"; as the first line of your app.');
        }
    }
    else {
        return proto.asProp;
    }
}

var trigger2$4 = trigger2$1;
var trigger3$4 = trigger3$1;
var on$6 = on$2;
var off$6 = off$2;
var commit$2 = transactionApi.commit;
var _aquire = transactionApi.aquire;
var _free = transactionApi.free;
function dispose(collection) {
    var models = collection.models;
    collection.models = [];
    collection._byId = {};
    freeAll(collection, models);
    return models;
}
function convertAndAquire(collection, attrs, options) {
    var model = collection.model;
    var record;
    if (collection._shared) {
        record = attrs instanceof model ? attrs : model.create(attrs, options);
        if (collection._shared & ItemsBehavior.listen) {
            on$6(record, record._changeEventName, collection._onChildrenChange, collection);
        }
    }
    else {
        record = attrs instanceof model ? (options.merge ? attrs.clone() : attrs) : model.create(attrs, options);
        if (!_aquire(collection, record)) {
            var errors = collection._aggregationError || (collection._aggregationError = []);
            errors.push(record);
        }
    }
    var _itemEvents = collection._itemEvents;
    _itemEvents && _itemEvents.subscribe(collection, record);
    return record;
}
function free$2(owner, child, unset) {
    if (owner._shared) {
        if (owner._shared & ItemsBehavior.listen) {
            off$6(child, child._changeEventName, owner._onChildrenChange, owner);
        }
    }
    else {
        _free(owner, child);
        unset || child.dispose();
    }
    var _itemEvents = owner._itemEvents;
    _itemEvents && _itemEvents.unsubscribe(owner, child);
}
function freeAll(collection, children) {
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        free$2(collection, child);
    }
    return children;
}
function sortElements(collection, options) {
    var _comparator = collection._comparator;
    if (_comparator && options.sort !== false) {
        collection.models.sort(_comparator);
        return true;
    }
    return false;
}
function addIndex(index, model) {
    index[model.cid] = model;
    var id = model.id;
    if (id != null) {
        index[id] = model;
    }
}
function removeIndex(index, model) {
    delete index[model.cid];
    var id = model.id;
    if (id != null) {
        delete index[id];
    }
}
function updateIndex(index, model) {
    delete index[model.previous(model.idAttribute)];
    var id = model.id;
    id == null || (index[id] = model);
}
var CollectionTransaction = (function () {
    function CollectionTransaction(object, isRoot, added, removed, nested, sorted) {
        this.object = object;
        this.isRoot = isRoot;
        this.added = added;
        this.removed = removed;
        this.nested = nested;
        this.sorted = sorted;
    }
    CollectionTransaction.prototype.commit = function (initiator) {
        var _a = this, nested = _a.nested, object = _a.object, _isDirty = object._isDirty;
        for (var _i = 0, nested_1 = nested; _i < nested_1.length; _i++) {
            var transaction = nested_1[_i];
            transaction.commit(object);
        }
        if (object._aggregationError) {
            logAggregationError(object);
        }
        for (var _b = 0, nested_2 = nested; _b < nested_2.length; _b++) {
            var transaction = nested_2[_b];
            trigger2$4(object, 'change', transaction.object, _isDirty);
        }
        var _c = this, added = _c.added, removed = _c.removed;
        for (var _d = 0, added_1 = added; _d < added_1.length; _d++) {
            var record = added_1[_d];
            trigger3$4(record, 'add', record, object, _isDirty);
            trigger3$4(object, 'add', record, object, _isDirty);
        }
        for (var _e = 0, removed_1 = removed; _e < removed_1.length; _e++) {
            var record = removed_1[_e];
            trigger3$4(record, 'remove', record, object, _isDirty);
            trigger3$4(object, 'remove', record, object, _isDirty);
        }
        if (this.sorted) {
            trigger2$4(object, 'sort', object, _isDirty);
        }
        if (added.length || removed.length) {
            trigger2$4(object, 'update', object, _isDirty);
        }
        this.isRoot && commit$2(object, initiator);
    };
    return CollectionTransaction;
}());
function logAggregationError(collection) {
    collection._log('error', 'added records already have an owner', collection._aggregationError);
    collection._aggregationError = void 0;
}

var begin$2 = transactionApi.begin;
var commit$3 = transactionApi.commit;
var markAsDirty$3 = transactionApi.markAsDirty;
function addTransaction(collection, items, options, merge) {
    var isRoot = begin$2(collection), nested = [];
    var added = appendElements(collection, items, nested, options, merge);
    if (added.length || nested.length) {
        var needSort = sortOrMoveElements(collection, added, options);
        if (markAsDirty$3(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, [], nested, needSort);
        }
        if (collection._aggregationError)
            logAggregationError(collection);
    }
    isRoot && commit$3(collection);
}

function sortOrMoveElements(collection, added, options) {
    var at = options.at;
    if (at != null) {
        var length_1 = collection.models.length - added.length;
        at = Number(at);
        if (at < 0)
            at += length_1 + 1;
        if (at < 0)
            at = 0;
        if (at > length_1)
            at = length_1;
        moveElements(collection.models, at, added);
        return false;
    }
    return sortElements(collection, options);
}
function moveElements(source, at, added) {
    for (var j = source.length - 1, i = j - added.length; i >= at; i--, j--) {
        source[j] = source[i];
    }
    for (i = 0, j = at; i < added.length; i++, j++) {
        source[j] = added[i];
    }
}
function appendElements(collection, a_items, nested, a_options, forceMerge) {
    var _byId = collection._byId, models = collection.models, merge = (forceMerge || a_options.merge) && !collection._shared, parse = a_options.parse, idAttribute = collection.model.prototype.idAttribute, prevLength = models.length;
    for (var _i = 0, a_items_1 = a_items; _i < a_items_1.length; _i++) {
        var item = a_items_1[_i];
        var model = item ? _byId[item[idAttribute]] || _byId[item.cid] : null;
        if (model) {
            if (merge && item !== model) {
                var attrs = item.attributes || item;
                var transaction = model._createTransaction(attrs, a_options);
                transaction && nested.push(transaction);
                if (model.hasChanged(idAttribute)) {
                    updateIndex(_byId, model);
                }
            }
        }
        else {
            model = convertAndAquire(collection, item, a_options);
            models.push(model);
            addIndex(_byId, model);
        }
    }
    return models.slice(prevLength);
}

var begin$3 = transactionApi.begin;
var commit$4 = transactionApi.commit;
var markAsDirty$4 = transactionApi.markAsDirty;
var silentOptions = { silent: true };
function emptySetTransaction(collection, items, options, silent) {
    var isRoot = begin$3(collection);
    var added = _reallocateEmpty(collection, items, options);
    if (added.length) {
        var needSort = sortElements(collection, options);
        if (markAsDirty$4(collection, silent ? silentOptions : options)) {
            return new CollectionTransaction(collection, isRoot, added.slice(), [], [], needSort);
        }
        if (collection._aggregationError)
            logAggregationError(collection);
    }
    isRoot && commit$4(collection);
}

function setTransaction(collection, items, options) {
    var isRoot = begin$3(collection), nested = [];
    var previous = collection.models, added = _reallocate(collection, items, nested, options);
    var reusedCount = collection.models.length - added.length, removed = reusedCount < previous.length ? (reusedCount ? _garbageCollect(collection, previous) :
        freeAll(collection, previous)) : [];
    var addedOrChanged = nested.length || added.length, sorted = (sortElements(collection, options) && addedOrChanged) || added.length || options.sorted;
    if (addedOrChanged || removed.length || sorted) {
        if (markAsDirty$4(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, removed, nested, sorted);
        }
        if (collection._aggregationError)
            logAggregationError(collection);
    }
    isRoot && commit$4(collection);
}

function _garbageCollect(collection, previous) {
    var _byId = collection._byId, removed = [];
    for (var _i = 0, previous_1 = previous; _i < previous_1.length; _i++) {
        var record = previous_1[_i];
        if (!_byId[record.cid]) {
            removed.push(record);
            free$2(collection, record);
        }
    }
    return removed;
}
function _reallocate(collection, source, nested, options) {
    var models = Array(source.length), _byId = {}, merge = (options.merge == null ? true : options.merge) && !collection._shared, _prevById = collection._byId, prevModels = collection.models, idAttribute = collection.model.prototype.idAttribute, toAdd = [], orderKept = true;
    for (var i = 0, j = 0; i < source.length; i++) {
        var item = source[i], model = null;
        if (item) {
            var id = item[idAttribute], cid = item.cid;
            if (_byId[id] || _byId[cid])
                continue;
            model = _prevById[id] || _prevById[cid];
        }
        if (model) {
            if (merge && item !== model) {
                if (orderKept && prevModels[j] !== model)
                    orderKept = false;
                var attrs = item.attributes || item;
                var transaction = model._createTransaction(attrs, options);
                transaction && nested.push(transaction);
            }
        }
        else {
            model = convertAndAquire(collection, item, options);
            toAdd.push(model);
        }
        models[j++] = model;
        addIndex(_byId, model);
    }
    models.length = j;
    collection.models = models;
    collection._byId = _byId;
    if (!orderKept)
        options.sorted = true;
    return toAdd;
}
function _reallocateEmpty(self, source, options) {
    var len = source ? source.length : 0, models = Array(len), _byId = {}, idAttribute = self.model.prototype.idAttribute;
    for (var i = 0, j = 0; i < len; i++) {
        var src = source[i];
        if (src && (_byId[src[idAttribute]] || _byId[src.cid])) {
            continue;
        }
        var model = convertAndAquire(self, src, options);
        models[j++] = model;
        addIndex(_byId, model);
    }
    models.length = j;
    self._byId = _byId;
    return self.models = models;
}

var trigger2$5 = trigger2$1;
var trigger3$5 = trigger3$1;
var markAsDirty$5 = transactionApi.markAsDirty;
var begin$4 = transactionApi.begin;
var commit$5 = transactionApi.commit;
function removeOne(collection, el, options) {
    var model = collection.get(el);
    if (model) {
        var isRoot = begin$4(collection), models = collection.models;
        models.splice(models.indexOf(model), 1);
        removeIndex(collection._byId, model);
        var notify = markAsDirty$5(collection, options);
        if (notify) {
            trigger3$5(model, 'remove', model, collection, options);
            trigger3$5(collection, 'remove', model, collection, options);
        }
        free$2(collection, model, options.unset);
        notify && trigger2$5(collection, 'update', collection, options);
        isRoot && commit$5(collection);
        return model;
    }
}

function removeMany(collection, toRemove, options) {
    var removed = _removeFromIndex(collection, toRemove, options.unset);
    if (removed.length) {
        var isRoot = begin$4(collection);
        _reallocate$1(collection, removed.length);
        if (markAsDirty$5(collection, options)) {
            var transaction = new CollectionTransaction(collection, isRoot, [], removed, [], false);
            transaction.commit();
        }
        else {
            isRoot && commit$5(collection);
        }
    }
    return removed;
}

function _removeFromIndex(collection, toRemove, unset) {
    var removed = Array(toRemove.length), _byId = collection._byId;
    for (var i = 0, j = 0; i < toRemove.length; i++) {
        var model = collection.get(toRemove[i]);
        if (model) {
            removed[j++] = model;
            removeIndex(_byId, model);
            free$2(collection, model, unset);
        }
    }
    removed.length = j;
    return removed;
}
function _reallocate$1(collection, removed) {
    var prev = collection.models, models = collection.models = Array(prev.length - removed), _byId = collection._byId;
    for (var i = 0, j = 0; i < prev.length; i++) {
        var model = prev[i];
        if (_byId[model.cid]) {
            models[j++] = model;
        }
    }
    models.length = j;
}

var trigger2$2 = trigger2$1;
var begin = transactionApi.begin;
var commit = transactionApi.commit;
var markAsDirty = transactionApi.markAsDirty;
var assign$1 = assign;
var defaults$1 = defaults;
var _count = 0;
var slice = Array.prototype.slice;
var CollectionRefsType = (function (_super) {
    __extends(CollectionRefsType, _super);
    function CollectionRefsType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollectionRefsType.defaultValue = [];
    return CollectionRefsType;
}(SharedType));
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(records, options, shared) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, _count++) || this;
        _this.models = [];
        _this._byId = {};
        _this.comparator = _this.comparator;
        if (options.comparator !== void 0) {
            _this.comparator = options.comparator;
            options.comparator = void 0;
        }
        _this.model = _this.model;
        if (options.model) {
            _this.model = options.model;
            options.model = void 0;
        }
        _this.idAttribute = _this.model.prototype.idAttribute;
        _this._shared = shared || 0;
        if (records) {
            var elements = toElements(_this, records, options);
            emptySetTransaction(_this, elements, options, true);
        }
        _this.initialize.apply(_this, arguments);
        if (_this._localEvents)
            _this._localEvents.subscribe(_this, _this);
        return _this;
    }
    Collection_1 = Collection;
    Collection.prototype.createSubset = function (models, options) {
        var SubsetOf = this.constructor.subsetOf(this).options.type, subset = new SubsetOf(models, options);
        subset.resolve(this);
        return subset;
    };
    Collection.onExtend = function (BaseClass) {
        var Ctor = this;
        this._SubsetOf = null;
        function RefsCollection(a, b, listen) {
            Ctor.call(this, a, b, ItemsBehavior.share | (listen ? ItemsBehavior.listen : 0));
        }
        Mixable.mixins.populate(RefsCollection);
        RefsCollection.prototype = this.prototype;
        RefsCollection._attribute = CollectionRefsType;
        this.Refs = this.Subset = RefsCollection;
        Transactional.onExtend.call(this, BaseClass);
        createSharedTypeSpec(this, SharedType);
    };
    Collection.onDefine = function (definition, BaseClass) {
        if (definition.itemEvents) {
            var eventsMap = new EventMap(BaseClass.prototype._itemEvents);
            eventsMap.addEventsMap(definition.itemEvents);
            this.prototype._itemEvents = eventsMap;
        }
        if (definition.comparator)
            this.prototype.comparator = definition.comparator;
        Transactional.onDefine.call(this, definition);
    };
    Object.defineProperty(Collection.prototype, "__inner_state__", {
        get: function () { return this.models; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "comparator", {
        get: function () { return this._comparator; },
        set: function (x) {
            var _this = this;
            switch (typeof x) {
                case 'string':
                    this._comparator = function (a, b) {
                        var aa = a[x], bb = b[x];
                        if (aa === bb)
                            return 0;
                        return aa < bb ? -1 : +1;
                    };
                    break;
                case 'function':
                    if (x.length === 1) {
                        this._comparator = function (a, b) {
                            var aa = x.call(_this, a), bb = x.call(_this, b);
                            if (aa === bb)
                                return 0;
                            return aa < bb ? -1 : +1;
                        };
                    }
                    else {
                        this._comparator = function (a, b) { return x.call(_this, a, b); };
                    }
                    break;
                default:
                    this._comparator = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.getStore = function () {
        return this._store || (this._store = this._owner ? this._owner.getStore() : this._defaultStore);
    };
    Collection.prototype._onChildrenChange = function (record, options, initiator) {
        if (options === void 0) { options = {}; }
        if (initiator === this)
            return;
        var idAttribute = this.idAttribute;
        if (record.hasChanged(idAttribute)) {
            updateIndex(this._byId, record);
        }
        var isRoot = begin(this);
        if (markAsDirty(this, options)) {
            trigger2$2(this, 'change', record, options);
        }
        isRoot && commit(this);
    };
    Collection.prototype.get = function (objOrId) {
        if (objOrId == null)
            return;
        if (typeof objOrId === 'object') {
            var id = objOrId[this.idAttribute];
            return (id !== void 0 && this._byId[id]) || this._byId[objOrId.cid];
        }
        else {
            return this._byId[objOrId];
        }
    };
    Collection.prototype.each = function (iteratee, context) {
        var fun = bindContext(iteratee, context), models = this.models;
        for (var i = 0; i < models.length; i++) {
            fun(models[i], i);
        }
    };
    Collection.prototype.every = function (iteratee, context) {
        var fun = toPredicateFunction(iteratee, context), models = this.models;
        for (var i = 0; i < models.length; i++) {
            if (!fun(models[i], i))
                return false;
        }
        return true;
    };
    Collection.prototype.filter = function (iteratee, context) {
        var fun = toPredicateFunction(iteratee, context);
        return this.map(function (x, i) { return fun(x, i) ? x : void 0; });
    };
    Collection.prototype.find = function (iteratee, context) {
        var fun = toPredicateFunction(iteratee, context), models = this.models;
        for (var i = 0; i < models.length; i++) {
            if (fun(models[i], i))
                return models[i];
        }
        return null;
    };
    Collection.prototype.some = function (iteratee, context) {
        return Boolean(this.find(iteratee, context));
    };
    Collection.prototype.map = function (iteratee, context) {
        var fun = bindContext(iteratee, context), models = this.models, mapped = Array(models.length);
        var j = 0;
        for (var i = 0; i < models.length; i++) {
            var x = fun(models[i], i);
            x === void 0 || (mapped[j++] = x);
        }
        mapped.length = j;
        return mapped;
    };
    Collection.prototype._validateNested = function (errors) {
        if (this._shared)
            return 0;
        var count = 0;
        this.each(function (record) {
            var error = record.validationError;
            if (error) {
                errors[record.cid] = error;
                count++;
            }
        });
        return count;
    };
    Collection.prototype.initialize = function () { };
    Object.defineProperty(Collection.prototype, "length", {
        get: function () { return this.models.length; },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.first = function () { return this.models[0]; };
    Collection.prototype.last = function () { return this.models[this.models.length - 1]; };
    Collection.prototype.at = function (a_index) {
        var index = a_index < 0 ? a_index + this.models.length : a_index;
        return this.models[index];
    };
    Collection.prototype.clone = function (options) {
        if (options === void 0) { options = {}; }
        var models = this._shared & ItemsBehavior.share ? this.models : this.map(function (model) { return model.clone(); }), copy = new this.constructor(models, { model: this.model, comparator: this.comparator }, this._shared);
        if (options.pinStore)
            copy._defaultStore = this.getStore();
        return copy;
    };
    Collection.prototype.toJSON = function () {
        return this.models.map(function (model) { return model.toJSON(); });
    };
    Collection.prototype.set = function (elements, options) {
        if (elements === void 0) { elements = []; }
        if (options === void 0) { options = {}; }
        if (options.add !== void 0) {
            this._log('warn', "Collection.set doesn't support 'add' option, behaving as if options.add === true.", options);
        }
        if (options.reset) {
            this.reset(elements, options);
        }
        else {
            var transaction = this._createTransaction(elements, options);
            transaction && transaction.commit();
        }
        return this;
    };
    Collection.prototype.liveUpdates = function (enabled) {
        var _this = this;
        if (enabled) {
            this.liveUpdates(false);
            var filter_1 = typeof enabled === 'function' ? enabled : function () { return true; };
            this._liveUpdates = {
                updated: function (json) {
                    filter_1(json) && _this.add(json, { parse: true, merge: true });
                },
                removed: function (id) { return _this.remove(id); }
            };
            return this.getEndpoint().subscribe(this._liveUpdates);
        }
        else {
            if (this._liveUpdates) {
                this.getEndpoint().unsubscribe(this._liveUpdates);
                this._liveUpdates = null;
            }
        }
    };
    Collection.prototype.fetch = function (a_options) {
        var _this = this;
        if (a_options === void 0) { a_options = {}; }
        var options = __assign({ parse: true }, a_options), endpoint = this.getEndpoint();
        return startIO(this, endpoint.list(options), options, function (json) {
            var result = _this.set(json, __assign({ parse: true }, options));
            if (options.liveUpdates) {
                result = _this.liveUpdates(options.liveUpdates);
            }
            return result;
        });
    };
    Collection.prototype.dispose = function () {
        if (this._disposed)
            return;
        var aggregated = !this._shared;
        for (var _i = 0, _a = this.models; _i < _a.length; _i++) {
            var record = _a[_i];
            free$2(this, record);
            if (aggregated)
                record.dispose();
        }
        this.liveUpdates(false);
        _super.prototype.dispose.call(this);
    };
    Collection.prototype.reset = function (a_elements, options) {
        if (options === void 0) { options = {}; }
        var isRoot = begin(this), previousModels = dispose(this);
        if (a_elements) {
            emptySetTransaction(this, toElements(this, a_elements, options), options, true);
        }
        markAsDirty(this, options);
        options.silent || trigger2$2(this, 'reset', this, defaults$1({ previousModels: previousModels }, options));
        isRoot && commit(this);
        return this.models;
    };
    Collection.prototype.add = function (a_elements, options) {
        if (options === void 0) { options = {}; }
        var elements = toElements(this, a_elements, options), transaction = this.models.length ?
            addTransaction(this, elements, options) :
            emptySetTransaction(this, elements, options);
        if (transaction) {
            transaction.commit();
            return transaction.added;
        }
    };
    Collection.prototype.remove = function (recordsOrIds, options) {
        if (options === void 0) { options = {}; }
        if (recordsOrIds) {
            return Array.isArray(recordsOrIds) ?
                removeMany(this, recordsOrIds, options) :
                removeOne(this, recordsOrIds, options);
        }
        return [];
    };
    Collection.prototype._createTransaction = function (a_elements, options) {
        if (options === void 0) { options = {}; }
        var elements = toElements(this, a_elements, options);
        if (this.models.length) {
            return options.remove === false ?
                addTransaction(this, elements, options, true) :
                setTransaction(this, elements, options);
        }
        else {
            return emptySetTransaction(this, elements, options);
        }
    };
    Collection.prototype.pluck = function (key) {
        return this.models.map(function (model) { return model[key]; });
    };
    Collection.prototype.sort = function (options) {
        if (options === void 0) { options = {}; }
        if (sortElements(this, options)) {
            var isRoot = begin(this);
            if (markAsDirty(this, options)) {
                trigger2$2(this, 'sort', this, options);
            }
            isRoot && commit(this);
        }
        return this;
    };
    Collection.prototype.push = function (model, options) {
        return this.add(model, assign$1({ at: this.length }, options));
    };
    Collection.prototype.pop = function (options) {
        var model = this.at(this.length - 1);
        this.remove(model, __assign({ unset: true }, options));
        return model;
    };
    Collection.prototype.unset = function (modelOrId, options) {
        var value = this.get(modelOrId);
        this.remove(modelOrId, __assign({ unset: true }, options));
        return value;
    };
    Collection.prototype.unshift = function (model, options) {
        return this.add(model, assign$1({ at: 0 }, options));
    };
    Collection.prototype.shift = function (options) {
        var model = this.at(0);
        this.remove(model, __assign({ unset: true }, options));
        return model;
    };
    Collection.prototype.slice = function () {
        return slice.apply(this.models, arguments);
    };
    Collection.prototype.indexOf = function (modelOrId) {
        var record = this.get(modelOrId);
        return this.models.indexOf(record);
    };
    Collection.prototype.modelId = function (attrs) {
        return attrs[this.model.prototype.idAttribute];
    };
    Collection.prototype.toggle = function (model, a_next) {
        var prev = Boolean(this.get(model)), next = a_next === void 0 ? !prev : Boolean(a_next);
        if (prev !== next) {
            if (prev) {
                this.remove(model);
            }
            else {
                this.add(model);
            }
        }
        return next;
    };
    Collection.prototype._log = function (level, text, value) {
        log(level, "[Collection Update] " + this.model.prototype.getClassName() + "." + this.getClassName() + ": " + text, {
            Argument: value,
            'Attributes spec': this.model.prototype._attributes
        });
    };
    Collection.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) || 'Collection';
    };
    Collection._attribute = AggregatedType;
    Collection = Collection_1 = __decorate([
        define({
            cidPrefix: 'c',
            model: Record,
            _changeEventName: 'changes',
            _aggregationError: null
        }),
        definitions({
            comparator: mixinRules.value,
            model: mixinRules.protoValue,
            itemEvents: mixinRules.merge
        })
    ], Collection);
    return Collection;
    var Collection_1;
}(Transactional));
function toElements(collection, elements, options) {
    var parsed = options.parse ? collection.parse(elements, options) : elements;
    return Array.isArray(parsed) ? parsed : [parsed];
}
createSharedTypeSpec(Collection, SharedType);
Record.Collection = Collection;
function bindContext(fun, context) {
    return context !== void 0 ? function (v, k) { return fun.call(context, v, k); } : fun;
}
function toPredicateFunction(iteratee, context) {
    if (typeof iteratee === 'object') {
        return function (x) {
            for (var key in iteratee) {
                if (iteratee[key] !== x[key])
                    return false;
            }
            return true;
        };
    }
    return bindContext(iteratee, context);
}

function parseReference(collectionRef) {
    switch (typeof collectionRef) {
        case 'function':
            return function (root) { return collectionRef.call(root); };
        case 'object':
            return function () { return collectionRef; };
        case 'string':
            var resolve = new CompiledReference(collectionRef).resolve;
            return resolve;
    }
}

var RecordRefType = (function (_super) {
    __extends(RecordRefType, _super);
    function RecordRefType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecordRefType.prototype.toJSON = function (value) {
        return value && typeof value === 'object' ? value.id : value;
    };
    RecordRefType.prototype.clone = function (value) {
        return value && typeof value === 'object' ? value.id : value;
    };
    RecordRefType.prototype.isChanged = function (a, b) {
        var aId = a && (a.id == null ? a : a.id), bId = b && (b.id == null ? b : b.id);
        return aId !== bId;
    };
    RecordRefType.prototype.validate = function (model, value, name) { };
    return RecordRefType;
}(AnyType));
Record.from = function from(masterCollection) {
    var getMasterCollection = parseReference(masterCollection);
    var typeSpec = new ChainableAttributeSpec({
        value: null,
        _attribute: RecordRefType
    });
    return typeSpec
        .get(function (objOrId, name) {
        if (typeof objOrId === 'object')
            return objOrId;
        var collection = getMasterCollection(this);
        var record = null;
        if (collection && collection.length) {
            record = collection.get(objOrId) || null;
            this.attributes[name] = record;
            record && this._attributes[name].handleChange(record, null, this, {});
        }
        return record;
    });
};

Collection.subsetOf = function subsetOf(masterCollection) {
    var SubsetOf = this._SubsetOf || (this._SubsetOf = defineSubsetCollection(this)), getMasterCollection = parseReference(masterCollection), typeSpec = new ChainableAttributeSpec({
        type: SubsetOf
    });
    return typeSpec.get(function (refs) {
        !refs || refs.resolvedWith || refs.resolve(getMasterCollection(this));
        return refs;
    });
};
var subsetOfBehavior = ItemsBehavior.share | ItemsBehavior.persistent;
function defineSubsetCollection(CollectionConstructor) {
    var SubsetOfCollection = (function (_super) {
        __extends(SubsetOfCollection, _super);
        function SubsetOfCollection(recordsOrIds, options) {
            var _this = _super.call(this, [], options, subsetOfBehavior) || this;
            _this.resolvedWith = null;
            _this.refs = toArray(recordsOrIds);
            return _this;
        }
        Object.defineProperty(SubsetOfCollection.prototype, "__inner_state__", {
            get: function () { return this.refs || this.models; },
            enumerable: true,
            configurable: true
        });
        SubsetOfCollection.prototype.add = function (a_elements, options) {
            var resolvedWith = this.resolvedWith, toAdd = toArray(a_elements);
            if (resolvedWith) {
                return _super.prototype.add.call(this, resolveRefs(resolvedWith, toAdd), options);
            }
            else {
                if (toAdd.length) {
                    var isRoot = transactionApi.begin(this);
                    this.refs = this.refs ? this.refs.concat(toAdd) : toAdd.slice();
                    transactionApi.markAsDirty(this, options);
                    isRoot && transactionApi.commit(this);
                }
            }
        };
        SubsetOfCollection.prototype.reset = function (a_elements, options) {
            var resolvedWith = this.resolvedWith, elements = toArray(a_elements);
            return resolvedWith ?
                _super.prototype.reset.call(this, resolveRefs(resolvedWith, elements), options) :
                delaySet(this, elements, options) || [];
        };
        SubsetOfCollection.prototype._createTransaction = function (a_elements, options) {
            var resolvedWith = this.resolvedWith, elements = toArray(a_elements);
            return resolvedWith ?
                _super.prototype._createTransaction.call(this, resolveRefs(resolvedWith, elements), options) :
                delaySet(this, elements, options);
        };
        SubsetOfCollection.prototype.toJSON = function () {
            return this.refs ?
                this.refs.map(function (objOrId) { return objOrId.id || objOrId; }) :
                this.models.map(function (model) { return model.id; });
        };
        SubsetOfCollection.prototype._validateNested = function () { return 0; };
        SubsetOfCollection.prototype.clone = function (owner) {
            var Ctor = this.constructor, copy = new Ctor([], {
                model: this.model,
                comparator: this.comparator
            });
            if (this.resolvedWith) {
                copy.resolvedWith = this.resolvedWith;
                copy.reset(this.models, { silent: true });
            }
            else {
                copy.refs = this.refs.slice();
            }
            return copy;
        };
        SubsetOfCollection.prototype.parse = function (raw) {
            return raw;
        };
        SubsetOfCollection.prototype.resolve = function (collection) {
            if (collection && collection.length) {
                this.resolvedWith = collection;
                if (this.refs) {
                    this.reset(this.refs, { silent: true });
                    this.refs = null;
                }
            }
            return this;
        };
        SubsetOfCollection.prototype.getModelIds = function () { return this.toJSON(); };
        SubsetOfCollection.prototype.toggle = function (modelOrId, val) {
            return _super.prototype.toggle.call(this, this.resolvedWith.get(modelOrId), val);
        };
        SubsetOfCollection.prototype.addAll = function () {
            if (this.resolvedWith) {
                this.set(this.resolvedWith.models);
                return this.models;
            }
            throw new Error("Cannot add elemens because the subset collection is not resolved yet.");
        };
        SubsetOfCollection.prototype.toggleAll = function () {
            return this.length ? this.reset() : this.addAll();
        };
        SubsetOfCollection = __decorate([
            define
        ], SubsetOfCollection);
        return SubsetOfCollection;
    }(CollectionConstructor));
    SubsetOfCollection.prototype._itemEvents = void 0;
    return SubsetOfCollection;
}
function resolveRefs(master, elements) {
    var records = [];
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var el = elements_1[_i];
        var record = master.get(el);
        if (record)
            records.push(record);
    }
    return records;
}
function delaySet(collection, elements, options) {
    if (notEqual(collection.refs, elements)) {
        var isRoot = transactionApi.begin(collection);
        collection.refs = elements.slice();
        transactionApi.markAsDirty(collection, options);
        isRoot && transactionApi.commit(collection);
    }
}
function toArray(elements) {
    return elements ? (Array.isArray(elements) ? elements : [elements]) : [];
}

var _store = null;
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Store.prototype.getStore = function () { return this; };
    Store.prototype.get = function (name) {
        var local = this[name];
        if (local || this === this._defaultStore)
            return local;
        return this._owner ? this._owner.get(name) : this._defaultStore.get(name);
    };
    Object.defineProperty(Store, "global", {
        get: function () { return _store; },
        set: function (store) {
            if (_store) {
                _store.dispose();
            }
            Transactional.prototype._defaultStore = _store = store;
        },
        enumerable: true,
        configurable: true
    });
    return Store;
}(Record));
Store.global = new Store();

var on = (_a = Events, _a.on);



var _a;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
}

/*!
 * Primary Exports
 */

var assertionError = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || arguments.callee;
  if (ssf && Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    try {
      throw new Error();
    } catch(e) {
      this.stack = e.stack;
    }
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};

'use strict';

/* !
 * Chai - pathval utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .hasProperty(object, name)
 *
 * This allows checking whether an object has own
 * or inherited from prototype chain named property.
 *
 * Basically does the same thing as the `in`
 * operator but works properly with null/undefined values
 * and other primitives.
 *
 *     var obj = {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *
 * The following would be the results.
 *
 *     hasProperty(obj, 'str');  // true
 *     hasProperty(obj, 'constructor');  // true
 *     hasProperty(obj, 'bar');  // false
 *
 *     hasProperty(obj.str, 'length'); // true
 *     hasProperty(obj.str, 1);  // true
 *     hasProperty(obj.str, 5);  // false
 *
 *     hasProperty(obj.arr, 'length');  // true
 *     hasProperty(obj.arr, 2);  // true
 *     hasProperty(obj.arr, 3);  // false
 *
 * @param {Object} object
 * @param {String|Symbol} name
 * @returns {Boolean} whether it exists
 * @namespace Utils
 * @name hasProperty
 * @api public
 */

function hasProperty$1(obj, name) {
  if (typeof obj === 'undefined' || obj === null) {
    return false;
  }

  // The `in` operator does not work with primitives.
  return name in Object(obj);
}

/* !
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `internalGetPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be infinitely deep and nested.
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath(path) {
  var str = path.replace(/([^\\])\[/g, '$1.[');
  var parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function mapMatches(value) {
    var regexp = /^\[(\d+)\]$/;
    var mArr = regexp.exec(value);
    var parsed = null;
    if (mArr) {
      parsed = { i: parseFloat(mArr[1]) };
    } else {
      parsed = { p: value.replace(/\\([.\[\]])/g, '$1') };
    }

    return parsed;
  });
}

/* !
 * ## internalGetPathValue(obj, parsed[, pathDepth])
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(obj, parsed);
 *
 * @param {Object} object to search against
 * @param {Object} parsed definition from `parsePath`.
 * @param {Number} depth (nesting level) of the property we want to retrieve
 * @returns {Object|Undefined} value
 * @api private
 */

function internalGetPathValue(obj, parsed, pathDepth) {
  var temporaryValue = obj;
  var res = null;
  pathDepth = (typeof pathDepth === 'undefined' ? parsed.length : pathDepth);

  for (var i = 0; i < pathDepth; i++) {
    var part = parsed[i];
    if (temporaryValue) {
      if (typeof part.p === 'undefined') {
        temporaryValue = temporaryValue[part.i];
      } else {
        temporaryValue = temporaryValue[part.p];
      }

      if (i === (pathDepth - 1)) {
        res = temporaryValue;
      }
    }
  }

  return res;
}

/* !
 * ## internalSetPathValue(obj, value, parsed)
 *
 * Companion function for `parsePath` that sets
 * the value located at a parsed address.
 *
 *  internalSetPathValue(obj, 'value', parsed);
 *
 * @param {Object} object to search and define on
 * @param {*} value to use upon set
 * @param {Object} parsed definition from `parsePath`
 * @api private
 */

function internalSetPathValue(obj, val, parsed) {
  var tempObj = obj;
  var pathDepth = parsed.length;
  var part = null;
  // Here we iterate through every part of the path
  for (var i = 0; i < pathDepth; i++) {
    var propName = null;
    var propVal = null;
    part = parsed[i];

    // If it's the last part of the path, we set the 'propName' value with the property name
    if (i === (pathDepth - 1)) {
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Now we set the property with the name held by 'propName' on object with the desired val
      tempObj[propName] = val;
    } else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
      tempObj = tempObj[part.p];
    } else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
      tempObj = tempObj[part.i];
    } else {
      // If the obj doesn't have the property we create one with that name to define it
      var next = parsed[i + 1];
      // Here we set the name of the property which will be defined
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Here we decide if this property will be an array or a new object
      propVal = typeof next.p === 'undefined' ? [] : {};
      tempObj[propName] = propVal;
      tempObj = tempObj[propName];
    }
  }
}

/**
 * ### .getPathInfo(object, path)
 *
 * This allows the retrieval of property info in an
 * object given a string path.
 *
 * The path info consists of an object with the
 * following properties:
 *
 * * parent - The parent object of the property referenced by `path`
 * * name - The name of the final property, a number if it was an array indexer
 * * value - The value of the property, if it exists, otherwise `undefined`
 * * exists - Whether the property exists or not
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} info
 * @namespace Utils
 * @name getPathInfo
 * @api public
 */

function getPathInfo$1(obj, path) {
  var parsed = parsePath(path);
  var last = parsed[parsed.length - 1];
  var info = {
    parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed),
  };
  info.exists = hasProperty$1(info.parent, info.name);

  return info;
}

/**
 * ### .getPathValue(object, path)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue(obj, 'prop1.str'); // Hello
 *     getPathValue(obj, 'prop1.att[2]'); // b
 *     getPathValue(obj, 'prop2.arr[0].nested'); // Universe
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} value or `undefined`
 * @namespace Utils
 * @name getPathValue
 * @api public
 */

function getPathValue(obj, path) {
  var info = getPathInfo$1(obj, path);
  return info.value;
}

/**
 * ### .setPathValue(object, path, value)
 *
 * Define the value in an object at a given string path.
 *
 * ```js
 * var obj = {
 *     prop1: {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *   , prop2: {
 *         arr: [ { nested: 'Universe' } ]
 *       , str: 'Hello again!'
 *     }
 * };
 * ```
 *
 * The following would be acceptable.
 *
 * ```js
 * var properties = require('tea-properties');
 * properties.set(obj, 'prop1.str', 'Hello Universe!');
 * properties.set(obj, 'prop1.arr[2]', 'B');
 * properties.set(obj, 'prop2.arr[0].nested.value', { hello: 'universe' });
 * ```
 *
 * @param {Object} object
 * @param {String} path
 * @param {Mixed} value
 * @api private
 */

function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}

var pathval = {
  hasProperty: hasProperty$1,
  getPathInfo: getPathInfo$1,
  getPathValue: getPathValue,
  setPathValue: setPathValue,
};

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .flag(object, key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @namespace Utils
 * @name flag
 * @api private
 */

var flag$1 = function flag(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};

/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name test
 */

var test$1 = function test(obj, args) {
  var negate = flag$1(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};

var typeDetect = createCommonjsModule(function (module) {
'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';
var globalObject = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : self; // eslint-disable-line
var isDom = 'location' in globalObject && 'document' in globalObject;
var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
module.exports = function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  if (isDom) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (obj === globalObject.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (obj === globalObject.document) {
      return 'Document';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
     * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
     * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
     *  - IE <=10 === "[object MSMimeTypesCollection]"
     */
    if (obj === (globalObject.navigator || {}).mimeTypes) {
      return 'MimeTypeArray';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
     * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
     * Test: `Object.prototype.toString.call(navigator.plugins)``
     *  - IE <=10 === "[object MSPluginsCollection]"
     */
    if (obj === (globalObject.navigator || {}).plugins) {
      return 'PluginArray';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
     * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
     * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
     *  - IE <=10 === "[object HTMLBlockElement]"
     */
    if (obj instanceof HTMLElement && obj.tagName === 'BLOCKQUOTE') {
      return 'HTMLQuoteElement';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#htmltabledatacellelement)
     * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     * Test: Object.prototype.toString.call(document.createElement('td'))
     *  - Chrome === "[object HTMLTableCellElement]"
     *  - Firefox === "[object HTMLTableCellElement]"
     *  - Safari === "[object HTMLTableCellElement]"
     */
    if (obj instanceof HTMLElement && obj.tagName === 'TD') {
      return 'HTMLTableDataCellElement';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#htmltableheadercellelement)
     * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     * Test: Object.prototype.toString.call(document.createElement('th'))
     *  - Chrome === "[object HTMLTableCellElement]"
     *  - Firefox === "[object HTMLTableCellElement]"
     *  - Safari === "[object HTMLTableCellElement]"
     */
    if (obj instanceof HTMLElement && obj.tagName === 'TH') {
      return 'HTMLTableHeaderCellElement';
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
};

module.exports.typeDetect = module.exports;
});

/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .expectTypes(obj, types)
 *
 * Ensures that the object being tested against is of a valid type.
 *
 *     utils.expectTypes(this, ['array', 'object', 'string']);
 *
 * @param {Mixed} obj constructed Assertion
 * @param {Array} type A list of allowed types for this assertion
 * @namespace Utils
 * @name expectTypes
 * @api public
 */





var expectTypes$1 = function expectTypes(obj, types) {
  var flagMsg = flag$1(obj, 'message');
  var ssfi = flag$1(obj, 'ssfi');

  flagMsg = flagMsg ? flagMsg + ': ' : '';

  obj = flag$1(obj, 'object');
  types = types.map(function (t) { return t.toLowerCase(); });
  types.sort();

  // Transforms ['lorem', 'ipsum'] into 'a lorem, or an ipsum'
  var str = types.map(function (t, index) {
    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
    return or + art + ' ' + t;
  }).join(', ');

  var objType = typeDetect(obj).toLowerCase();

  if (!types.some(function (expected) { return objType === expected; })) {
    throw new assertionError(
      flagMsg + 'object tested must be ' + str + ', but ' + objType + ' given',
      undefined,
      ssfi
    );
  }
};

/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getActual
 */

var getActual$1 = function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};

'use strict';

/* !
 * Chai - getFuncName utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getFuncName(constructorFn)
 *
 * Returns the name of a function.
 * When a non-function instance is passed, returns `null`.
 * This also includes a polyfill function if `aFunc.name` is not defined.
 *
 * @name getFuncName
 * @param {Function} funct
 * @namespace Utils
 * @api public
 */

var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
  if (typeof aFunc !== 'function') {
    return null;
  }

  var name = '';
  if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
    // Here we run a polyfill if Function does not support the `name` property and if aFunc.name is not defined
    var match = toString.call(aFunc).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    // If we've got a `name` property we just use it
    name = aFunc.name;
  }

  return name;
}

var getFuncName_1 = getFuncName;

/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getProperties
 * @api public
 */

var getProperties = function getProperties(object) {
  var result = Object.getOwnPropertyNames(object);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};

/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getEnumerableProperties
 * @api public
 */

var getEnumerableProperties = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};

var config = {

  /**
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message.
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @param {Boolean}
   * @api public
   */

  includeStack: false,

  /**
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @param {Boolean}
   * @api public
   */

  showDiff: true,

  /**
   * ### config.truncateThreshold
   *
   * User configurable property, sets length threshold for actual and
   * expected values in assertion errors. If this threshold is exceeded, for
   * example for large data structures, the value is replaced with something
   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
   *
   * Set it to zero if you want to disable truncating altogether.
   *
   * This is especially userful when doing assertions on arrays: having this
   * set to a reasonable large value makes the failure messages readily
   * inspectable.
   *
   *     chai.config.truncateThreshold = 0;  // disable truncating
   *
   * @param {Number}
   * @api public
   */

  truncateThreshold: 40,

  /**
   * ### config.useProxy
   *
   * User configurable property, defines if chai will use a Proxy to throw
   * an error when a non-existent property is read, which protects users
   * from typos when using property-based assertions.
   *
   * Set it to false if you want to disable this feature.
   *
   *     chai.config.useProxy = false;  // disable use of Proxy
   *
   * This feature is automatically disabled regardless of this config value
   * in environments that don't support proxies.
   *
   * @param {Boolean}
   * @api public
   */

  useProxy: true,

  /**
   * ### config.proxyExcludedKeys
   *
   * User configurable property, defines which properties should be ignored
   * instead of throwing an error if they do not exist on the assertion.
   * This is only applied if the environment Chai is running in supports proxies and
   * if the `useProxy` configuration setting is enabled.
   * By default, `then` and `inspect` will not throw an error if they do not exist on the
   * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
   * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
   *
   *     // By default these keys will not throw an error if they do not exist on the assertion object
   *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
   *
   * @param {Array}
   * @api public
   */

  proxyExcludedKeys: ['then', 'inspect', 'toJSON']
};

var inspect_1 = createCommonjsModule(function (module, exports) {
// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js






module.exports = inspect;

/**
 * ### .inspect(obj, [showHidden], [depth], [colors])
 *
 * Echoes the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects. Default is false.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 * @namespace Utils
 * @name inspect
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      'nodeType' in object &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If this is a DOM element, try to get the outer HTML.
  if (isDOMElement(value)) {
    if ('outerHTML' in value) {
      return value.outerHTML;
      // This value does not have an outerHTML attribute,
      //   it could still be an XML element
    } else {
      // Attempt to serialize it
      try {
        if (document.xmlVersion) {
          var xmlSerializer = new XMLSerializer();
          return xmlSerializer.serializeToString(value);
        } else {
          // Firefox 11- do not support outerHTML
          //   It does, however, support innerHTML
          //   Use the following to render the element
          var ns = "http://www.w3.org/1999/xhtml";
          var container = document.createElementNS(ns, '_');

          container.appendChild(value.cloneNode(false));
          var html = container.innerHTML
            .replace('><', '>' + value.innerHTML + '<');
          container.innerHTML = '';
          return html;
        }
      } catch (err) {
        // This could be a non-native DOM implementation,
        //   continue with the normal flow:
        //   printing the element as if it is an object.
      }
    }
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  var name, nameSuffix;

  // Some type of object without properties can be shortcutted.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      name = getFuncName_1(value);
      nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = ''
    , array = false
    , typedArray = false
    , braces = ['{', '}'];

  if (isTypedArray(value)) {
    typedArray = true;
    braces = ['[', ']'];
  }

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    name = getFuncName_1(value);
    nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else if (typedArray) {
    return formatTypedArray(value);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      if (value === 0 && (1/value) === -Infinity) {
        return ctx.stylize('-0', 'number');
      }
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');

    case 'symbol':
      return ctx.stylize(value.toString(), 'symbol');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}

function formatTypedArray(value) {
  var str = '[ ';

  for (var i = 0; i < value.length; ++i) {
    if (str.length >= config.truncateThreshold - 7) {
      str += '...';
      break;
    }
    str += value[i] + ', ';
  }
  str += ' ]';

  // Removing trailing `, ` if the array was not truncated
  if (str.indexOf(',  ]') !== -1) {
    str = str.replace(',  ]', ' ]');
  }

  return str;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name;
  var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
  var str;

  if (propDescriptor) {
    if (propDescriptor.get) {
      if (propDescriptor.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (propDescriptor.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isTypedArray(ar) {
  // Unfortunately there's no way to check if an object is a TypedArray
  // We have to check if it's one of these types
  return (typeof ar === 'object' && /\w+Array]$/.test(objectToString(ar)));
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
});

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */




/**
 * ### .objDisplay(object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @namespace Utils
 * @api public
 */

var objDisplay$1 = function objDisplay(obj) {
  var str = inspect_1(obj)
    , type = Object.prototype.toString.call(obj);

  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};

/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getMessage
 * @api public
 */

var getMessage$1 = function getMessage(obj, args) {
  var negate = flag$1(obj, 'negate')
    , val = flag$1(obj, 'object')
    , expected = args[3]
    , actual = getActual$1(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag$1(obj, 'message');

  if(typeof msg === "function") msg = msg();
  msg = msg || '';
  msg = msg
    .replace(/#\{this\}/g, function () { return objDisplay$1(val); })
    .replace(/#\{act\}/g, function () { return objDisplay$1(actual); })
    .replace(/#\{exp\}/g, function () { return objDisplay$1(expected); });

  return flagMsg ? flagMsg + ': ' + msg : msg;
};

/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, `lockSsfi`,
 * and `message`) will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAsseriton = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags to; usually a new assertion
 * @param {Boolean} includeAll
 * @namespace Utils
 * @name transferFlags
 * @api private
 */

var transferFlags$1 = function transferFlags(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag !== 'lockSsfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};

'use strict';
/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true,
      });
    }
  },
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

var deepEql = deepEqual;
var MemoizeMap_1 = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (
    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
    return true;
  }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = typeDetect(leftHandOperand);
  if (leftHandType !== typeDetect(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([ key, value ]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([ key, value ]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' &&
    typeof target === 'object' &&
    typeof Symbol.iterator !== 'undefined' &&
    typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [ generatorResult.value ];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 &&
      leftHandEntries.length === 0 &&
      rightHandKeys.length === 0 &&
      rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}

deepEql.MemoizeMap = MemoizeMap_1;

/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .isProxyEnabled()
 *
 * Helper function to check if Chai's proxy protection feature is enabled. If
 * proxies are unsupported or disabled via the user's Chai config, then return
 * false. Otherwise, return true.
 *
 * @namespace Utils
 * @name isProxyEnabled
 */

var isProxyEnabled$1 = function isProxyEnabled() {
  return config.useProxy && 
    typeof Proxy !== 'undefined' &&
    typeof Reflect !== 'undefined';
};

/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */






/**
 * ### .addProperty(ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @namespace Utils
 * @name addProperty
 * @api public
 */

var addProperty$1 = function addProperty(ctx, name, getter) {
  getter = getter === undefined ? function () {} : getter;

  Object.defineProperty(ctx, name,
    { get: function propertyGetter() {
        // Setting the `ssfi` flag to `propertyGetter` causes this function to
        // be the starting point for removing implementation frames from the
        // stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled$1() && !flag$1(this, 'lockSsfi')) {
          flag$1(this, 'ssfi', propertyGetter);
        }

        var result = getter.call(this);
        if (result !== undefined)
          return result;

        var newAssertion = new chai$2.Assertion();
        transferFlags$1(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};

var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');

/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addLengthGuard(fn, assertionName, isChainable)
 *
 * Define `length` as a getter on the given uninvoked method assertion. The
 * getter acts as a guard against chaining `length` directly off of an uninvoked
 * method assertion, which is a problem because it references `function`'s
 * built-in `length` property instead of Chai's `length` assertion. When the
 * getter catches the user making this mistake, it throws an error with a
 * helpful message.
 *
 * There are two ways in which this mistake can be made. The first way is by
 * chaining the `length` assertion directly off of an uninvoked chainable
 * method. In this case, Chai suggests that the user use `lengthOf` instead. The
 * second way is by chaining the `length` assertion directly off of an uninvoked
 * non-chainable method. Non-chainable methods must be invoked prior to
 * chaining. In this case, Chai suggests that the user consult the docs for the
 * given assertion.
 *
 * If the `length` property of functions is unconfigurable, then return `fn`
 * without modification.
 *
 * Note that in ES6, the function's `length` property is configurable, so once
 * support for legacy environments is dropped, Chai's `length` property can
 * replace the built-in function's `length` property, and this length guard will
 * no longer be necessary. In the mean time, maintaining consistency across all
 * environments is the priority.
 *
 * @param {Function} fn
 * @param {String} assertionName
 * @param {Boolean} isChainable
 * @namespace Utils
 * @name addLengthGuard
 */

var addLengthGuard$1 = function addLengthGuard (fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable) return fn;

  Object.defineProperty(fn, 'length', {
    get: function () {
      if (isChainable) {
        throw Error('Invalid Chai property: ' + assertionName + '.length. Due' +
          ' to a compatibility issue, "length" cannot directly follow "' +
          assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
      }

      throw Error('Invalid Chai property: ' + assertionName + '.length. See' +
        ' docs for proper usage of "' + assertionName + '".');
    }
  });

  return fn;
};

/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .proxify(object)
 *
 * Return a proxy of given object that throws an error when a non-existent
 * property is read. By default, the root cause is assumed to be a misspelled
 * property, and thus an attempt is made to offer a reasonable suggestion from
 * the list of existing properties. However, if a nonChainableMethodName is
 * provided, then the root cause is instead a failure to invoke a non-chainable
 * method prior to reading the non-existent property.
 * 
 * If proxies are unsupported or disabled via the user's Chai config, then
 * return object without modification.
 *
 * @param {Object} obj
 * @param {String} nonChainableMethodName
 * @namespace Utils
 * @name proxify
 */

var builtins = ['__flags', '__methods', '_obj', 'assert'];

var proxify$1 = function proxify(obj, nonChainableMethodName) {
  if (!isProxyEnabled$1()) return obj;

  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      // This check is here because we should not throw errors on Symbol properties
      // such as `Symbol.toStringTag`.
      // The values for which an error should be thrown can be configured using
      // the `config.proxyExcludedKeys` setting.
      if (typeof property === 'string' &&
          config.proxyExcludedKeys.indexOf(property) === -1 &&
          !Reflect.has(target, property)) {
        // Special message for invalid property access of non-chainable methods.
        if (nonChainableMethodName) {
          throw Error('Invalid Chai property: ' + nonChainableMethodName + '.' +
            property + '. See docs for proper usage of "' +
            nonChainableMethodName + '".');
        }

        var orderedProperties = getProperties(target).filter(function(property) {
          return !Object.prototype.hasOwnProperty(property) &&
            builtins.indexOf(property) === -1;
        }).sort(function(a, b) {
          return stringDistance(property, a) - stringDistance(property, b);
        });

        if (orderedProperties.length &&
            stringDistance(orderedProperties[0], property) < 4) {
          // If the property is reasonably close to an existing Chai property,
          // suggest that property to the user.
          throw Error('Invalid Chai property: ' + property +
            '. Did you mean "' + orderedProperties[0] + '"?');
        } else {
          throw Error('Invalid Chai property: ' + property);
        }
      }

      // Use this proxy getter as the starting point for removing implementation
      // frames from the stack trace of a failed assertion. For property
      // assertions, this prevents the proxy getter from showing up in the stack
      // trace since it's invoked before the property getter. For method and
      // chainable method assertions, this flag will end up getting changed to
      // the method wrapper, which is good since this frame will no longer be in
      // the stack once the method is invoked. Note that Chai builtin assertion
      // properties such as `__flags` are skipped since this is only meant to
      // capture the starting point of an assertion. This step is also skipped
      // if the `lockSsfi` flag is set, thus indicating that this assertion is
      // being called from within another assertion. In that case, the `ssfi`
      // flag is already set to the outer assertion's starting point.
      if (builtins.indexOf(property) === -1 && !flag$1(target, 'lockSsfi')) {
        flag$1(target, 'ssfi', proxyGetter);
      }

      return Reflect.get(target, property);
    }
  });
};

/**
 * # stringDistance(strA, strB)
 * Return the Levenshtein distance between two strings.
 * @param {string} strA
 * @param {string} strB
 * @return {number} the string distance between strA and strB
 * @api private
 */

function stringDistance(strA, strB, memo) {
  if (!memo) {
    // `memo` is a two-dimensional array containing a cache of distances
    // memo[i][j] is the distance between strA.slice(0, i) and
    // strB.slice(0, j).
    memo = [];
    for (var i = 0; i <= strA.length; i++) {
      memo[i] = [];
    }
  }

  if (!memo[strA.length] || !memo[strA.length][strB.length]) {
    if (strA.length === 0 || strB.length === 0) {
      memo[strA.length][strB.length] = Math.max(strA.length, strB.length);
    } else {
      memo[strA.length][strB.length] = Math.min(
        stringDistance(strA.slice(0, -1), strB, memo) + 1,
        stringDistance(strA, strB.slice(0, -1), memo) + 1,
        stringDistance(strA.slice(0, -1), strB.slice(0, -1), memo) +
          (strA.slice(-1) === strB.slice(-1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
}

/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */







/**
 * ### .addMethod(ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @namespace Utils
 * @name addMethod
 * @api public
 */

var addMethod$1 = function addMethod(ctx, name, method) {
  var methodWrapper = function () {
    // Setting the `ssfi` flag to `methodWrapper` causes this function to be the
    // starting point for removing implementation frames from the stack trace of
    // a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag$1(this, 'lockSsfi')) {
      flag$1(this, 'ssfi', methodWrapper);
    }

    var result = method.apply(this, arguments);
    if (result !== undefined)
      return result;

    var newAssertion = new chai$2.Assertion();
    transferFlags$1(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard$1(methodWrapper, name, false);
  ctx[name] = proxify$1(methodWrapper, name);
};

/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */






/**
 * ### .overwriteProperty(ctx, name, fn)
 *
 * Overwites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @namespace Utils
 * @name overwriteProperty
 * @api public
 */

var overwriteProperty$1 = function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get;

  Object.defineProperty(ctx, name,
    { get: function overwritingPropertyGetter() {
        // Setting the `ssfi` flag to `overwritingPropertyGetter` causes this
        // function to be the starting point for removing implementation frames
        // from the stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled$1() && !flag$1(this, 'lockSsfi')) {
          flag$1(this, 'ssfi', overwritingPropertyGetter);
        }

        // Setting the `lockSsfi` flag to `true` prevents the overwritten
        // assertion from changing the `ssfi` flag. By this point, the `ssfi`
        // flag is already set to the correct starting point for this assertion.
        var origLockSsfi = flag$1(this, 'lockSsfi');
        flag$1(this, 'lockSsfi', true);
        var result = getter(_super).call(this);
        flag$1(this, 'lockSsfi', origLockSsfi);

        if (result !== undefined) {
          return result;
        }

        var newAssertion = new chai$2.Assertion();
        transferFlags$1(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};

/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */







/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @api public
 */

var overwriteMethod$1 = function overwriteMethod(ctx, name, method) {
  var _method = ctx[name]
    , _super = function () {
      throw new Error(name + ' is not a function');
    };

  if (_method && 'function' === typeof _method)
    _super = _method;

  var overwritingMethodWrapper = function () {
    // Setting the `ssfi` flag to `overwritingMethodWrapper` causes this
    // function to be the starting point for removing implementation frames from
    // the stack trace of a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag$1(this, 'lockSsfi')) {
      flag$1(this, 'ssfi', overwritingMethodWrapper);
    }

    // Setting the `lockSsfi` flag to `true` prevents the overwritten assertion
    // from changing the `ssfi` flag. By this point, the `ssfi` flag is already
    // set to the correct starting point for this assertion.
    var origLockSsfi = flag$1(this, 'lockSsfi');
    flag$1(this, 'lockSsfi', true);
    var result = method(_super).apply(this, arguments);
    flag$1(this, 'lockSsfi', origLockSsfi);

    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai$2.Assertion();
    transferFlags$1(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard$1(overwritingMethodWrapper, name, false);
  ctx[name] = proxify$1(overwritingMethodWrapper, name);
};

/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */







/*!
 * Module variables
 */

// Check whether `Object.setPrototypeOf` is supported
var canSetPrototype = typeof Object.setPrototypeOf === 'function';

// Without `Object.setPrototypeOf` support, this module will need to add properties to a function.
// However, some of functions' own props are not configurable and should be skipped.
var testFn = function() {};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);

  // Note: PhantomJS 1.x includes `callee` as one of `testFn`'s own properties,
  // but then returns `undefined` as the property descriptor for `callee`. As a
  // workaround, we perform an otherwise unnecessary type-check for `propDesc`,
  // and then filter it out if it's not an object as it should be.
  if (typeof propDesc !== 'object')
    return true;

  return !propDesc.configurable;
});

// Cache `Function` properties
var call  = Function.prototype.call;
var apply = Function.prototype.apply;

/**
 * ### .addChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @namespace Utils
 * @name addChainableMethod
 * @api public
 */

var addChainableMethod$1 = function addChainableMethod(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function () { };
  }

  var chainableBehavior = {
      method: method
    , chainingBehavior: chainingBehavior
  };

  // save the methods so we can overwrite them later, if we need to.
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;

  Object.defineProperty(ctx, name,
    { get: function chainableMethodGetter() {
        chainableBehavior.chainingBehavior.call(this);

        var chainableMethodWrapper = function () {
          // Setting the `ssfi` flag to `chainableMethodWrapper` causes this
          // function to be the starting point for removing implementation
          // frames from the stack trace of a failed assertion.
          //
          // However, we only want to use this function as the starting point if
          // the `lockSsfi` flag isn't set.
          //
          // If the `lockSsfi` flag is set, then this assertion is being
          // invoked from inside of another assertion. In this case, the `ssfi`
          // flag has already been set by the outer assertion.
          //
          // Note that overwriting a chainable method merely replaces the saved
          // methods in `ctx.__methods` instead of completely replacing the
          // overwritten assertion. Therefore, an overwriting assertion won't
          // set the `ssfi` or `lockSsfi` flags.
          if (!flag$1(this, 'lockSsfi')) {
            flag$1(this, 'ssfi', chainableMethodWrapper);
          }

          var result = chainableBehavior.method.apply(this, arguments);
          if (result !== undefined) {
            return result;
          }

          var newAssertion = new chai$2.Assertion();
          transferFlags$1(this, newAssertion);
          return newAssertion;
        };

        addLengthGuard$1(chainableMethodWrapper, name, true);

        // Use `Object.setPrototypeOf` if available
        if (canSetPrototype) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
          Object.setPrototypeOf(chainableMethodWrapper, prototype);
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (excludeNames.indexOf(asserterName) !== -1) {
              return;
            }

            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(chainableMethodWrapper, asserterName, pd);
          });
        }

        transferFlags$1(this, chainableMethodWrapper);
        return proxify$1(chainableMethodWrapper);
      }
    , configurable: true
  });
};

/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */




/**
 * ### .overwriteChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Overwites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'lengthOf',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.lengthOf(3);
 *     expect(myFoo).to.have.lengthOf.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @namespace Utils
 * @name overwriteChainableMethod
 * @api public
 */

var overwriteChainableMethod$1 = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai$2.Assertion();
    transferFlags$1(this, newAssertion);
    return newAssertion;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper() {
    var result = method(_method).apply(this, arguments);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai$2.Assertion();
    transferFlags$1(this, newAssertion);
    return newAssertion;
  };
};

/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .compareByInspect(mixed, mixed)
 *
 * To be used as a compareFunction with Array.prototype.sort. Compares elements
 * using inspect instead of default behavior of using toString so that Symbols
 * and objects with irregular/missing toString can still be sorted without a
 * TypeError.
 *
 * @param {Mixed} first element to compare
 * @param {Mixed} second element to compare
 * @returns {Number} -1 if 'a' should come before 'b'; otherwise 1 
 * @name compareByInspect
 * @namespace Utils
 * @api public
 */

var compareByInspect$1 = function compareByInspect(a, b) {
  return inspect_1(a) < inspect_1(b) ? -1 : 1;
};

/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getOwnEnumerablePropertySymbols(object)
 *
 * This allows the retrieval of directly-owned enumerable property symbols of an
 * object. This function is necessary because Object.getOwnPropertySymbols
 * returns both enumerable and non-enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerablePropertySymbols
 * @api public
 */

var getOwnEnumerablePropertySymbols$1 = function getOwnEnumerablePropertySymbols(obj) {
  if (typeof Object.getOwnPropertySymbols !== 'function') return [];

  return Object.getOwnPropertySymbols(obj).filter(function (sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
};

/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .getOwnEnumerableProperties(object)
 *
 * This allows the retrieval of directly-owned enumerable property names and
 * symbols of an object. This function is necessary because Object.keys only
 * returns enumerable property names, not enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerableProperties
 * @api public
 */

var getOwnEnumerableProperties$1 = function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols$1(obj));
};

'use strict';

/* !
 * Chai - checkError utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .checkError
 *
 * Checks that an error conforms to a given set of criteria and/or retrieves information about it.
 *
 * @api public
 */

/**
 * ### .compatibleInstance(thrown, errorLike)
 *
 * Checks if two instances are compatible (strict equal).
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @name compatibleInstance
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}

/**
 * ### .compatibleConstructor(thrown, errorLike)
 *
 * Checks if two constructors are compatible.
 * This function can receive either an error constructor or
 * an error instance as the `errorLike` argument.
 * Constructors are compatible if they're the same or if one is
 * an instance of another.
 *
 * @name compatibleConstructor
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    // If `errorLike` is an instance of any error we compare their constructors
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    // If `errorLike` is a constructor that inherits from Error, we compare `thrown` to `errorLike` directly
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }

  return false;
}

/**
 * ### .compatibleMessage(thrown, errMatcher)
 *
 * Checks if an error's message is compatible with a matcher (String or RegExp).
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @name compatibleMessage
 * @param {Error} thrown error
 * @param {String|RegExp} errMatcher to look for into the message
 * @namespace Utils
 * @api public
 */

function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === 'string') {
    return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
  }

  return false;
}

/**
 * ### .getFunctionName(constructorFn)
 *
 * Returns the name of a function.
 * This also includes a polyfill function if `constructorFn.name` is not defined.
 *
 * @name getFunctionName
 * @param {Function} constructorFn
 * @namespace Utils
 * @api private
 */

var functionNameMatch$1 = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = '';
  if (typeof constructorFn.name === 'undefined') {
    // Here we run a polyfill if constructorFn.name is not defined
    var match = String(constructorFn).match(functionNameMatch$1);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }

  return name;
}

/**
 * ### .getConstructorName(errorLike)
 *
 * Gets the constructor name for an Error instance or constructor itself.
 *
 * @name getConstructorName
 * @param {Error|ErrorConstructor} errorLike
 * @namespace Utils
 * @api public
 */

function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === 'function') {
    // If `err` is not an instance of Error it is an error constructor itself or another function.
    // If we've got a common function we get its name, otherwise we may need to create a new instance
    // of the error just in case it's a poorly-constructed error. Please see chaijs/chai/issues/45 to know more.
    constructorName = getFunctionName(errorLike).trim() ||
        getFunctionName(new errorLike()); // eslint-disable-line new-cap
  }

  return constructorName;
}

/**
 * ### .getMessage(errorLike)
 *
 * Gets the error message from an error.
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @name getMessage
 * @param {Error|String} errorLike
 * @namespace Utils
 * @api public
 */

function getMessage$3(errorLike) {
  var msg = '';
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === 'string') {
    msg = errorLike;
  }

  return msg;
}

var checkError$1 = {
  compatibleInstance: compatibleInstance,
  compatibleConstructor: compatibleConstructor,
  compatibleMessage: compatibleMessage,
  getMessage: getMessage$3,
  getConstructorName: getConstructorName,
};

/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */

/**
 * ### .isNaN(value)
 *
 * Checks if the given value is NaN or not.
 *
 *     utils.isNaN(NaN); // true
 *
 * @param {Value} The value which has to be checked if it is NaN
 * @name isNaN
 * @api private
 */

function isNaN$2(value) {
  // Refer http://www.ecma-international.org/ecma-262/6.0/#sec-isnan-number
  // section's NOTE.
  return value !== value;
}

// If ECMAScript 6's Number.isNaN is present, prefer that.
var _isNaN = Number.isNaN || isNaN$2;

/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Dependencies that are used for multiple exports are required here only once
 */



/*!
 * test utility
 */

var test = test$1;

/*!
 * type utility
 */

var type = typeDetect;

/*!
 * expectTypes utility
 */
var expectTypes = expectTypes$1;

/*!
 * message utility
 */

var getMessage = getMessage$1;

/*!
 * actual utility
 */

var getActual = getActual$1;

/*!
 * Inspect util
 */

var inspect = inspect_1;

/*!
 * Object Display util
 */

var objDisplay = objDisplay$1;

/*!
 * Flag utility
 */

var flag = flag$1;

/*!
 * Flag transferring utility
 */

var transferFlags = transferFlags$1;

/*!
 * Deep equal utility
 */

var eql = deepEql;

/*!
 * Deep path info
 */

var getPathInfo = pathval.getPathInfo;

/*!
 * Check if a property exists
 */

var hasProperty = pathval.hasProperty;

/*!
 * Function name
 */

var getName = getFuncName_1;

/*!
 * add Property
 */

var addProperty = addProperty$1;

/*!
 * add Method
 */

var addMethod = addMethod$1;

/*!
 * overwrite Property
 */

var overwriteProperty = overwriteProperty$1;

/*!
 * overwrite Method
 */

var overwriteMethod = overwriteMethod$1;

/*!
 * Add a chainable method
 */

var addChainableMethod = addChainableMethod$1;

/*!
 * Overwrite chainable method
 */

var overwriteChainableMethod = overwriteChainableMethod$1;

/*!
 * Compare by inspect method
 */

var compareByInspect = compareByInspect$1;

/*!
 * Get own enumerable property symbols method
 */

var getOwnEnumerablePropertySymbols = getOwnEnumerablePropertySymbols$1;

/*!
 * Get own enumerable properties method
 */

var getOwnEnumerableProperties = getOwnEnumerableProperties$1;

/*!
 * Checks error against a given set of criteria
 */

var checkError = checkError$1;

/*!
 * Proxify util
 */

var proxify = proxify$1;

/*!
 * addLengthGuard util
 */

var addLengthGuard = addLengthGuard$1;

/*!
 * isProxyEnabled helper
 */

var isProxyEnabled = isProxyEnabled$1;

/*!
 * isNaN method
 */

var isNaN$1 = _isNaN;

var utils = {
	test: test,
	type: type,
	expectTypes: expectTypes,
	getMessage: getMessage,
	getActual: getActual,
	inspect: inspect,
	objDisplay: objDisplay,
	flag: flag,
	transferFlags: transferFlags,
	eql: eql,
	getPathInfo: getPathInfo,
	hasProperty: hasProperty,
	getName: getName,
	addProperty: addProperty,
	addMethod: addMethod,
	overwriteProperty: overwriteProperty,
	overwriteMethod: overwriteMethod,
	addChainableMethod: addChainableMethod,
	overwriteChainableMethod: overwriteChainableMethod,
	compareByInspect: compareByInspect,
	getOwnEnumerablePropertySymbols: getOwnEnumerablePropertySymbols,
	getOwnEnumerableProperties: getOwnEnumerableProperties,
	checkError: checkError,
	proxify: proxify,
	addLengthGuard: addLengthGuard,
	isProxyEnabled: isProxyEnabled,
	isNaN: isNaN$1
};

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */



var assertion = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */

  function Assertion (obj, msg, ssfi, lockSsfi) {
    flag(this, 'ssfi', ssfi || Assertion);
    flag(this, 'lockSsfi', lockSsfi);
    flag(this, 'object', obj);
    flag(this, 'message', msg);

    return util.proxify(this);
  }

  Object.defineProperty(Assertion, 'includeStack', {
    get: function() {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      return config.includeStack;
    },
    set: function(value) {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      config.includeStack = value;
    }
  });

  Object.defineProperty(Assertion, 'showDiff', {
    get: function() {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      return config.showDiff;
    },
    set: function(value) {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      config.showDiff = value;
    }
  });

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  /**
   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String|Function} message or function that returns message to display if expression fails
   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (false !== showDiff) showDiff = true;
    if (undefined === expected && undefined === _actual) showDiff = false;
    if (true !== config.showDiff) showDiff = false;

    if (!ok) {
      msg = util.getMessage(this, arguments);
      var actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var assertions = function (chai, _) {
  var Assertion = chai.Assertion
    , AssertionError = chai.AssertionError
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provided as chainable getters to improve the readability
   * of your assertions.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - which
   * - and
   * - has
   * - have
   * - with
   * - at
   * - of
   * - same
   * - but
   * - does
   *
   * @name language chains
   * @namespace BDD
   * @api public
   */

  [ 'to', 'be', 'been'
  , 'is', 'and', 'has', 'have'
  , 'with', 'that', 'which', 'at'
  , 'of', 'same', 'but', 'does' ].forEach(function (chain) {
    Assertion.addProperty(chain);
  });

  /**
   * ### .not
   *
   * Negates all assertions that follow in the chain.
   *
   *     expect(function () {}).to.not.throw();
   *     expect({a: 1}).to.not.have.property('b');
   *     expect([1, 2]).to.be.an('array').that.does.not.include(3);
   *
   * Just because you can negate any assertion with `.not` doesn't mean you
   * should. With great power comes great responsibility. It's often best to
   * assert that the one expected output was produced, rather than asserting
   * that one of countless unexpected outputs wasn't produced. See individual
   * assertions for specific guidance.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.equal(1); // Not recommended
   *
   * @name not
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property`
   * assertions that follow in the chain to use deep equality instead of strict
   * (`===`) equality. See the `deep-eql` project page for info on the deep
   * equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.keys([{a: 1}]);
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * @name deep
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .nested
   *
   * Enables dot- and bracket-notation in all `.property` and `.include`
   * assertions that follow in the chain.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *     expect({'.a': {'[b]': 'x'}}).to.nested.include({'\\.a.\\[b\\]': 'x'});
   *
   * `.nested` cannot be combined with `.own`.
   *
   * @name nested
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('nested', function () {
    flag(this, 'nested', true);
  });

  /**
   * ### .own
   *
   * Causes all `.property` and `.include` assertions that follow in the chain
   * to ignore inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.property('b').but.not.own.property('b'); 
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * `.own` cannot be combined with `.nested`.
   *
   * @name own
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('own', function () {
    flag(this, 'own', true);
  });

  /**
   * ### .ordered
   *
   * Causes all `.members` assertions that follow in the chain to require that
   * members be in the same order.
   *
   *     expect([1, 2]).to.have.ordered.members([1, 2])
   *       .but.not.have.ordered.members([2, 1]);
   *
   * When `.include` and `.ordered` are combined, the ordering begins at the
   * start of both arrays.
   *
   *     expect([1, 2, 3]).to.include.ordered.members([1, 2])
   *       .but.not.include.ordered.members([2, 3]);
   *
   * @name ordered
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ordered', function () {
    flag(this, 'ordered', true);
  });

  /**
   * ### .any
   *
   * Causes all `.keys` assertions that follow in the chain to only require that
   * the target have at least one of the given keys. This is the opposite of
   * `.all`, which requires that the target have all of the given keys.
   *
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name any
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('any', function () {
    flag(this, 'any', true);
    flag(this, 'all', false);
  });


  /**
   * ### .all
   *
   * Causes all `.keys` assertions that follow in the chain to require that the
   * target have all of the given keys. This is the opposite of `.any`, which
   * only requires that the target have at least one of the given keys.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` are
   * added earlier in the chain. However, it's often best to add `.all` anyway
   * because it improves readability.
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name all
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('all', function () {
    flag(this, 'all', true);
    flag(this, 'any', false);
  });

  /**
   * ### .a(type[, msg])
   *
   * Asserts that the target's type is equal to the given string `type`. Types
   * are case insensitive. See the `type-detect` project page for info on the
   * type detection algorithm: https://github.com/chaijs/type-detect.
   *
   *     expect('foo').to.be.a('string');
   *     expect({a: 1}).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *     expect(new Error).to.be.an('error');
   *     expect(Promise.resolve()).to.be.a('promise');
   *     expect(new Float32Array).to.be.a('float32array');
   *     expect(Symbol()).to.be.a('symbol');
   *
   * `.a` supports objects that have a custom type set via `Symbol.toStringTag`.
   *
   *     var myObj = {
   *       [Symbol.toStringTag]: 'myCustomType'
   *     };
   *
   *     expect(myObj).to.be.a('myCustomType').but.not.an('object');
   *
   * It's often best to use `.a` to check a target's type before making more
   * assertions on the same target. That way, you avoid unexpected behavior from
   * any assertion that does different things based on the target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.a`. However, it's often best to
   * assert that the target is the expected type, rather than asserting that it
   * isn't one of many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.an('array'); // Not recommended
   *
   * `.a` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     expect(1).to.be.a('string', 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.a('string');
   *
   * `.a` can also be used as a language chain to improve the readability of
   * your assertions. 
   *
   *     expect({b: 2}).to.have.a.property('b');
   *
   * The alias `.an` can be used interchangeably with `.a`.
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj).toLowerCase()
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(val[, msg])
   *
   * When the target is a string, `.include` asserts that the given string `val`
   * is a substring of the target.
   *
   *     expect('foobar').to.include('foo');
   *
   * When the target is an array, `.include` asserts that the given `val` is a
   * member of the target.
   *
   *     expect([1, 2, 3]).to.include(2);
   *
   * When the target is an object, `.include` asserts that the given object
   * `val`'s properties are a subset of the target's properties.
   *
   *     expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
   *
   * When the target is a Set or WeakSet, `.include` asserts that the given `val` is a
   * member of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Set([1, 2])).to.include(2);
   *
   * When the target is a Map, `.include` asserts that the given `val` is one of
   * the values of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.include(2);
   *
   * Because `.include` does different things based on the target's type, it's
   * important to check the target's type before using `.include`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *
   * By default, strict (`===`) equality is used to compare array members and
   * object properties. Add `.deep` earlier in the chain to use deep equality
   * instead (WeakSet targets are not supported). See the `deep-eql` project
   * page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   * By default, all of the target's properties are searched when working with
   * objects. This includes properties that are inherited and/or non-enumerable.
   * Add `.own` earlier in the chain to exclude the target's inherited
   * properties from the search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * Note that a target object is always only searched for `val`'s own
   * enumerable properties.
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({a: {b: 2}}).to.deep.own.include({a: {b: 2}});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 2}}).to.nested.include({'\\.a.\\[b\\]': 2});
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}}).to.deep.nested.include({'a.b[0]': {c: 3}});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.include`.
   *
   *     expect('foobar').to.not.include('taco');
   *     expect([1, 2, 3]).to.not.include(4);
   * 
   * However, it's dangerous to negate `.include` when the target is an object.
   * The problem is that it creates uncertain expectations by asserting that the
   * target object doesn't have all of `val`'s key/value pairs but may or may
   * not have some of them. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target object isn't even expected to have `val`'s keys, it's
   * often best to assert exactly that.
   *
   *     expect({c: 3}).to.not.have.any.keys('a', 'b'); // Recommended
   *     expect({c: 3}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * When the target object is expected to have `val`'s keys, it's often best to
   * assert that each of the properties has its expected value, rather than
   * asserting that each property doesn't have one of many unexpected values.
   *
   *     expect({a: 3, b: 4}).to.include({a: 3, b: 4}); // Recommended
   *     expect({a: 3, b: 4}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * `.include` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.include(4, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.include(4);
   *
   * `.include` can also be used as a language chain, causing all `.members` and
   * `.keys` assertions that follow in the chain to require the target to be a
   * superset of the expected set, rather than an identical set. Note that
   * `.members` ignores duplicates in the subset when `.include` is added.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * Note that adding `.any` earlier in the chain causes the `.keys` assertion
   * to ignore `.include`.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *
   * The aliases `.includes`, `.contain`, and `.contains` can be used
   * interchangeably with `.include`.
   *
   * @name include
   * @alias contain
   * @alias includes
   * @alias contains
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function SameValueZero(a, b) {
    return (_.isNaN(a) && _.isNaN(b)) || a === b;
  }

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);
    
    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate')
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , descriptor = isDeep ? 'deep ' : '';

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    var included = false;

    switch (objType) {
      case 'string':
        included = obj.indexOf(val) !== -1;
        break;

      case 'weakset':
        if (isDeep) {
          throw new AssertionError(
            flagMsg + 'unable to use .deep.include with WeakSet',
            undefined,
            ssfi
          );
        }

        included = obj.has(val);
        break;

      case 'map':
        var isEql = isDeep ? _.eql : SameValueZero;
        obj.forEach(function (item) {
          included = included || isEql(item, val);
        });
        break;

      case 'set':
        if (isDeep) {
          obj.forEach(function (item) {
            included = included || _.eql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;

      case 'array':
        if (isDeep) {
          included = obj.some(function (item) {
            return _.eql(item, val);
          });
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;

      default:
        // This block is for asserting a subset of properties in an object.
        // `_.expectTypes` isn't used here because `.include` should work with
        // objects with a custom `@@toStringTag`.
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + 'object tested must be an array, a map, an object,'
              + ' a set, a string, or a weakset, but ' + objType + ' given',
            undefined,
            ssfi
          );
        }

        var props = Object.keys(val)
          , firstErr = null
          , numErrs = 0;
  
        props.forEach(function (prop) {
          var propAssertion = new Assertion(obj);
          _.transferFlags(this, propAssertion, true);
          flag(propAssertion, 'lockSsfi', true);
  
          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }
  
          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!_.checkError.compatibleConstructor(err, AssertionError)) {
              throw err;
            }
            if (firstErr === null) firstErr = err;
            numErrs++;
          }
        }, this);
  
        // When validating .not.include with multiple properties, we only want
        // to throw an assertion error if all of the properties are included,
        // in which case we throw the first property assertion error that we
        // encountered.
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
    }

    // Assert inclusion in collection or substring in a string.
    this.assert(
      included
      , 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val)
      , 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is loosely (`==`) equal to `true`. However, it's
   * often best to assert that the target is strictly (`===`) or deeply equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.ok; // Not recommended
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.be.ok; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.ok`.
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.not.be.ok; // Not recommended
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.ok; // Not recommended
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.be.ok; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.be.ok; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.ok;
   *
   * @name ok
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is strictly (`===`) equal to `true`.
   *
   *     expect(true).to.be.true;
   *
   * Add `.not` earlier in the chain to negate `.true`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `true`.
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.true; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.true; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.true;
   *
   * @name true
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , flag(this, 'negate') ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is strictly (`===`) equal to `false`.
   *
   *     expect(false).to.be.false;
   *
   * Add `.not` earlier in the chain to negate `.false`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `false`.
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.not.be.false; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.false; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(true, 'nooo why fail??').to.be.false;
   *
   * @name false
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , flag(this, 'negate') ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is strictly (`===`) equal to `null`.
   *
   *     expect(null).to.be.null;
   *
   * Add `.not` earlier in the chain to negate `.null`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `null`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.null; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.null;
   *
   * @name null
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is strictly (`===`) equal to `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *
   * Add `.not` earlier in the chain to negate `.undefined`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `undefined`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.undefined; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.undefined;
   *
   * @name undefined
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .NaN
   *
   * Asserts that the target is exactly `NaN`.
   *
   *     expect(NaN).to.be.NaN;
   *
   * Add `.not` earlier in the chain to negate `.NaN`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `NaN`.
   *
   *     expect('foo').to.equal('foo'); // Recommended
   *     expect('foo').to.not.be.NaN; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.NaN;
   *
   * @name NaN
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('NaN', function () {
    this.assert(
        _.isNaN(flag(this, 'object'))
        , 'expected #{this} to be NaN'
        , 'expected #{this} not to be NaN'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is not strictly (`===`) equal to either `null` or
   * `undefined`. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.exist; // Not recommended
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.exist; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.exist`.
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.exist; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.exist; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(null, 'nooo why fail??').to.exist;
   *
   * @name exist
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('exist', function () {
    var val = flag(this, 'object');
    this.assert(
        val !== null && val !== undefined
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });

  /**
   * ### .empty
   *
   * When the target is a string or array, `.empty` asserts that the target's
   * `length` property is strictly (`===`) equal to `0`.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *
   * When the target is a map or set, `.empty` asserts that the target's `size`
   * property is strictly equal to `0`.
   *
   *     expect(new Set()).to.be.empty;
   *     expect(new Map()).to.be.empty;
   *
   * When the target is a non-function object, `.empty` asserts that the target
   * doesn't have any own enumerable properties. Properties with Symbol-based
   * keys are excluded from the count.
   *
   *     expect({}).to.be.empty;
   *
   * Because `.empty` does different things based on the target's type, it's
   * important to check the target's type before using `.empty`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.empty`. However, it's often
   * best to assert that the target contains its expected number of values,
   * rather than asserting that it's not empty.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.not.be.empty; // Not recommended
   *
   *     expect(new Set([1, 2, 3])).to.have.property('size', 3); // Recommended
   *     expect(new Set([1, 2, 3])).to.not.be.empty; // Not recommended
   *
   *     expect(Object.keys({a: 1})).to.have.lengthOf(1); // Recommended
   *     expect({a: 1}).to.not.be.empty; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect([1, 2, 3], 'nooo why fail??').to.be.empty;
   *
   * @name empty
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var val = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , itemsCount;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    switch (_.type(val).toLowerCase()) {
      case 'array':
      case 'string':
        itemsCount = val.length;
        break;
      case 'map':
      case 'set':
        itemsCount = val.size;
        break;
      case 'weakmap':
      case 'weakset':
        throw new AssertionError(
          flagMsg + '.empty was passed a weak collection',
          undefined,
          ssfi
        );
      case 'function':
        var msg = flagMsg + '.empty was passed a function ' + _.getName(val);
        throw new AssertionError(msg.trim(), undefined, ssfi);
      default:
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + '.empty was passed non-string primitive ' + _.inspect(val),
            undefined,
            ssfi
          );
        }
        itemsCount = Object.keys(val).length;
    }

    this.assert(
        0 === itemsCount
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an `arguments` object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   *     test();
   *
   * Add `.not` earlier in the chain to negate `.arguments`. However, it's often
   * best to assert which type the target is expected to be, rather than
   * asserting that its not an `arguments` object.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.arguments; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({}, 'nooo why fail??').to.be.arguments;
   *
   * The alias `.Arguments` can be used interchangeably with `.arguments`.
   *
   * @name arguments
   * @alias Arguments
   * @namespace BDD
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = _.type(obj);
    this.assert(
        'Arguments' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(val[, msg])
   *
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   *
   *     expect(1).to.equal(1);
   *     expect('foo').to.equal('foo');
   * 
   * Add `.deep` earlier in the chain to use deep equality instead. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) equals `[1, 2]`
   *     expect([1, 2]).to.deep.equal([1, 2]);
   *     expect([1, 2]).to.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.equal`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to one of countless unexpected values.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.equal(2); // Not recommended
   *
   * `.equal` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.equal(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.equal(2);
   *
   * The aliases `.equals` and `eq` can be used interchangeably with `.equal`.
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      return this.eql(val);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(obj[, msg])
   *
   * Asserts that the target is deeply equal to the given `obj`. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object is deeply (but not strictly) equal to {a: 1}
   *     expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
   *
   *     // Target array is deeply (but not strictly) equal to [1, 2]
   *     expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.eql`. However, it's often best
   * to assert that the target is deeply equal to its expected value, rather
   * than not deeply equal to one of countless unexpected values.
   *
   *     expect({a: 1}).to.eql({a: 1}); // Recommended
   *     expect({a: 1}).to.not.eql({b: 2}); // Not recommended
   *
   * `.eql` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect({a: 1}).to.eql({b: 2}, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.eql({b: 2});
   *
   * The alias `.eqls` can be used interchangeably with `.eql`.
   *
   * The `.deep.equal` assertion is almost identical to `.eql` but with one
   * difference: `.deep.equal` causes deep equality comparisons to also be used
   * for any other assertions that follow in the chain.
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} obj
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(n[, msg])
   *
   * Asserts that the target is a number or a date greater than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.above(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.above(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.above`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(1).to.not.be.above(2); // Not recommended
   *
   * `.above` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.above(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.above(2);
   *
   * The aliases `.gt` and `.greaterThan` can be used interchangeably with
   * `.above`.
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }
    
    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to above must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to above must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len > n
        , 'expected #{this} to have a length above #{exp} but got #{act}'
        , 'expected #{this} to not have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above #{exp}'
        , 'expected #{this} to be at most #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(n[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `n` respectively. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.at.least(1); // Not recommended
   *     expect(2).to.be.at.least(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than or equal to the given number
   * `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.least(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.least`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.at.least(2); // Not recommended
   *
   * `.least` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.at.least(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.at.least(2);
   *
   * The alias `.gte` can be used interchangeably with `.least`.
   *
   * @name least
   * @alias gte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to least must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to least must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len >= n
        , 'expected #{this} to have a length at least #{exp} but got #{act}'
        , 'expected #{this} to have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least #{exp}'
        , 'expected #{this} to be below #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(n[, msg])
   *
   * Asserts that the target is a number or a date less than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.below(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is less than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.below(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.length(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.below(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.below`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.below(1); // Not recommended
   *
   * `.below` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.below(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.below(1);
   *
   * The aliases `.lt` and `.lessThan` can be used interchangeably with
   * `.below`.
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to below must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to below must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len < n
        , 'expected #{this} to have a length below #{exp} but got #{act}'
        , 'expected #{this} to not have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below #{exp}'
        , 'expected #{this} to be at least #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(n[, msg])
   *
   * Asserts that the target is a number or a date less than or equal to the given number
   * or date `n` respectively. However, it's often best to assert that the target is equal to its
   * expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.at.most(2); // Not recommended
   *     expect(1).to.be.at.most(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is less than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.most(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.most`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.at.most(1); // Not recommended
   *
   * `.most` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.at.most(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.at.most(1);
   *
   * The alias `.lte` can be used interchangeably with `.most`.
   *
   * @name most
   * @alias lte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }
    
    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to most must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to most must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len <= n
        , 'expected #{this} to have a length at most #{exp} but got #{act}'
        , 'expected #{this} to have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most #{exp}'
        , 'expected #{this} to be above #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `start`, and less than or equal to the given number or date `finish` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.within(1, 3); // Not recommended
   *     expect(2).to.be.within(2, 3); // Not recommended
   *     expect(2).to.be.within(1, 2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than or equal to the given number
   * `start`, and less than or equal to the given number `finish`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.within(2, 4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.within(2, 4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.within`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.within(2, 4); // Not recommended
   *
   * `.within` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(4).to.be.within(1, 3, 'nooo why fail??');
   *     expect(4, 'nooo why fail??').to.be.within(1, 3);
   *
   * @name within
   * @param {Number} start lower bound inclusive
   * @param {Number} finish upper bound inclusive
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , startType = _.type(start).toLowerCase()
      , finishType = _.type(finish).toLowerCase()
      , shouldThrow = true
      , range = (startType === 'date' && finishType === 'date')
          ? start.toUTCString() + '..' + finish.toUTCString()
          : start + '..' + finish;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && (startType !== 'date' || finishType !== 'date'))) {
      errorMessage = msgPrefix + 'the arguments to within must be dates';
    } else if ((startType !== 'number' || finishType !== 'number') && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the arguments to within must be numbers';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len >= start && len <= finish
        , 'expected #{this} to have a length within ' + range
        , 'expected #{this} to not have a length within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor[, msg])
   *
   * Asserts that the target is an instance of the given `constructor`.
   *
   *     function Cat () { }
   *
   *     expect(new Cat()).to.be.an.instanceof(Cat);
   *     expect([1, 2]).to.be.an.instanceof(Array);
   *
   * Add `.not` earlier in the chain to negate `.instanceof`.
   *
   *     expect({a: 1}).to.not.be.an.instanceof(Array);
   *
   * `.instanceof` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.be.an.instanceof(Array, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.an.instanceof(Array);
   *
   * Due to limitations in ES5, `.instanceof` may not always work as expected
   * when using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing built-in object such as
   * `Array`, `Error`, and `Map`. See your transpiler's docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * The alias `.instanceOf` can be used interchangeably with `.instanceof`.
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} msg _optional_
   * @alias instanceOf
   * @namespace BDD
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);

    var target = flag(this, 'object');
    var ssfi = flag(this, 'ssfi');
    var flagMsg = flag(this, 'message');

    try {
      var isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'The instanceof assertion needs a constructor but '
            + _.type(constructor) + ' was given.',
          undefined,
          ssfi
        );
      }
      throw err;
    }

    var name = _.getName(constructor);
    if (name === null) {
      name = 'an unnamed constructor';
    }

    this.assert(
        isInstanceOf
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  }

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name[, val[, msg]])
   *
   * Asserts that the target has a property with the given key `name`.
   *
   *     expect({a: 1}).to.have.property('a');
   *
   * When `val` is provided, `.property` also asserts that the property's value
   * is equal to the given `val`.
   *
   *     expect({a: 1}).to.have.property('a', 1);
   *
   * By default, strict (`===`) equality is used. Add `.deep` earlier in the
   * chain to use deep equality instead. See the `deep-eql` project page for
   * info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * The target's enumerable and non-enumerable properties are always included
   * in the search. By default, both own and inherited properties are included.
   * Add `.own` earlier in the chain to exclude inherited properties from the
   * search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.own.property('a', 1);
   *     expect({a: 1}).to.have.property('b').but.not.own.property('b'); 
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({x: {a: 1}}).to.have.deep.own.property('x', {a: 1});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}})
   *       .to.have.deep.nested.property('a.b[0]', {c: 3});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.property`.
   *
   *     expect({a: 1}).to.not.have.property('b');
   * 
   * However, it's dangerous to negate `.property` when providing `val`. The
   * problem is that it creates uncertain expectations by asserting that the
   * target either doesn't have a property with the given key `name`, or that it
   * does have a property with the given key `name` but its value isn't equal to
   * the given `val`. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property with the given key
   * `name`, it's often best to assert exactly that.
   *
   *     expect({b: 2}).to.not.have.property('a'); // Recommended
   *     expect({b: 2}).to.not.have.property('a', 1); // Not recommended
   *
   * When the target is expected to have a property with the given key `name`,
   * it's often best to assert that the property has its expected value, rather
   * than asserting that it doesn't have one of many unexpected values.
   *
   *     expect({a: 3}).to.have.property('a', 3); // Recommended
   *     expect({a: 3}).to.not.have.property('a', 1); // Not recommended
   *
   * `.property` changes the target of any assertions that follow in the chain
   * to be the value of the property from the original target object.
   *
   *     expect({a: 1}).to.have.property('a').that.is.a('number');
   *
   * `.property` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing `val`, only use the
   * second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.property('a', 2, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.have.property('a', 2);
   *     expect({a: 1}, 'nooo why fail??').to.have.property('b');
   *
   *     // Not recommended
   *     expect({a: 1}).to.have.property('b', undefined, 'nooo why fail??');
   * 
   * The above assertion isn't the same thing as not providing `val`. Instead,
   * it's asserting that the target object has a `b` property that's equal to
   * `undefined`.
   *
   * The assertions `.ownProperty` and `.haveOwnProperty` can be used
   * interchangeably with `.own.property`.
   *
   * @name property
   * @param {String} name
   * @param {Mixed} val (optional)
   * @param {String} msg _optional_
   * @returns value of property for chaining
   * @namespace BDD
   * @api public
   */

  function assertProperty (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var isNested = flag(this, 'nested')
      , isOwn = flag(this, 'own')
      , flagMsg = flag(this, 'message')
      , obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi');

    if (isNested && isOwn) {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
        flagMsg + 'The "nested" and "own" flags cannot be combined.',
        undefined,
        ssfi
      );
    }

    if (obj === null || obj === undefined) {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
        flagMsg + 'Target cannot be null or undefined.',
        undefined,
        ssfi
      );
    }

    var isDeep = flag(this, 'deep')
      , negate = flag(this, 'negate')
      , pathInfo = isNested ? _.getPathInfo(obj, name) : null
      , value = isNested ? pathInfo.value : obj[name];

    var descriptor = '';
    if (isDeep) descriptor += 'deep ';
    if (isOwn) descriptor += 'own ';
    if (isNested) descriptor += 'nested ';
    descriptor += 'property ';

    var hasProperty;
    if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested) hasProperty = pathInfo.exists;
    else hasProperty = _.hasProperty(obj, name);

    // When performing a negated assertion for both name and val, merely having
    // a property with the given name isn't enough to cause the assertion to
    // fail. It must both have a property with the given name, and the value of
    // that property must equal the given val. Therefore, skip this assertion in
    // favor of the next.
    if (!negate || arguments.length === 1) {
      this.assert(
          hasProperty
        , 'expected #{this} to have ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (arguments.length > 1) {
      this.assert(
          hasProperty && (isDeep ? _.eql(val, value) : val === value)
        , 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  }

  Assertion.addMethod('property', assertProperty);

  function assertOwnProperty (name, value, msg) {
    flag(this, 'own', true);
    assertProperty.apply(this, arguments);
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .ownPropertyDescriptor(name[, descriptor[, msg]])
   *
   * Asserts that the target has its own property descriptor with the given key
   * `name`. Enumerable and non-enumerable properties are included in the
   * search.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a');
   *
   * When `descriptor` is provided, `.ownPropertyDescriptor` also asserts that
   * the property's descriptor is deeply equal to the given `descriptor`. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * Add `.not` earlier in the chain to negate `.ownPropertyDescriptor`.
   *
   *     expect({a: 1}).to.not.have.ownPropertyDescriptor('b');
   * 
   * However, it's dangerous to negate `.ownPropertyDescriptor` when providing
   * a `descriptor`. The problem is that it creates uncertain expectations by
   * asserting that the target either doesn't have a property descriptor with
   * the given key `name`, or that it does have a property descriptor with the
   * given key `name` but its not deeply equal to the given `descriptor`. It's
   * often best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property descriptor with the given
   * key `name`, it's often best to assert exactly that.
   *
   *     // Recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a');
   *
   *     // Not recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * When the target is expected to have a property descriptor with the given
   * key `name`, it's often best to assert that the property has its expected
   * descriptor, rather than asserting that it doesn't have one of many
   * unexpected descriptors.
   *
   *     // Recommended
   *     expect({a: 3}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 3,
   *     });
   *
   *     // Not recommended
   *     expect({a: 3}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * `.ownPropertyDescriptor` changes the target of any assertions that follow
   * in the chain to be the value of the property descriptor from the original
   * target object.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a')
   *       .that.has.property('enumerable', true);
   *
   * `.ownPropertyDescriptor` accepts an optional `msg` argument which is a
   * custom error message to show when the assertion fails. The message can also
   * be given as the second argument to `expect`. When not providing
   * `descriptor`, only use the second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     }, 'nooo why fail??');
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     });
   * 
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('b');
   *
   *     // Not recommended
   *     expect({a: 1})
   *       .to.have.ownPropertyDescriptor('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `descriptor`.
   * Instead, it's asserting that the target object has a `b` property
   * descriptor that's deeply equal to `undefined`.
   *
   * The alias `.haveOwnPropertyDescriptor` can be used interchangeably with
   * `.ownPropertyDescriptor`.
   *
   * @name ownPropertyDescriptor
   * @alias haveOwnPropertyDescriptor
   * @param {String} name
   * @param {Object} descriptor _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertOwnPropertyDescriptor (name, descriptor, msg) {
    if (typeof descriptor === 'string') {
      msg = descriptor;
      descriptor = null;
    }
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    if (actualDescriptor && descriptor) {
      this.assert(
          _.eql(descriptor, actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
        , descriptor
        , actualDescriptor
        , true
      );
    } else {
      this.assert(
          actualDescriptor
        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
      );
    }
    flag(this, 'object', actualDescriptor);
  }

  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

  /**
   * ### .lengthOf(n[, msg])
   *
   * Asserts that the target's `length` property is equal to the given number
   * `n`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *     expect('foo').to.have.lengthOf(3);
   *
   * Add `.not` earlier in the chain to negate `.lengthOf`. However, it's often
   * best to assert that the target's `length` property is equal to its expected
   * value, rather than not equal to one of many unexpected values.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.not.have.lengthOf(4); // Not recommended
   *
   * `.lengthOf` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(2, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(2);
   *
   * `.lengthOf` can also be used as a language chain, causing all `.above`,
   * `.below`, `.least`, `.most`, and `.within` assertions that follow in the
   * chain to use the target's `length` property as the target. However, it's
   * often best to assert that the target's `length` property is equal to its
   * expected length, rather than asserting that its `length` property falls
   * within some range of values.
   *
   *     // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *
   *     // Not recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2);
   *     expect([1, 2, 3]).to.have.lengthOf.below(4);
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(3);
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(3);
   *     expect([1, 2, 3]).to.have.lengthOf.within(2,4);
   *
   * Due to a compatibility issue, the alias `.length` can't be chained directly
   * off of an uninvoked method such as `.a`. Therefore, `.length` can't be used
   * interchangeably with `.lengthOf` in every situation. It's recommended to
   * always use `.lengthOf` instead of `.length`.
   *
   *     expect([1, 2, 3]).to.have.a.length(3); // incompatible; throws error
   *     expect([1, 2, 3]).to.have.a.lengthOf(3);  // passes as expected
   *
   * @name lengthOf
   * @alias length
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    var len = obj.length;

    this.assert(
        len == n
      , 'expected #{this} to have a length of #{exp} but got #{act}'
      , 'expected #{this} to not have a length of #{act}'
      , n
      , len
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(re[, msg])
   *
   * Asserts that the target matches the given regular expression `re`.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * Add `.not` earlier in the chain to negate `.match`.
   *
   *     expect('foobar').to.not.match(/taco/);
   *
   * `.match` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect('foobar').to.match(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.match(/taco/);
   *
   * The alias `.matches` can be used interchangeably with `.match`.
   *
   * @name match
   * @alias matches
   * @param {RegExp} re
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */
  function assertMatch(re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  }

  Assertion.addMethod('match', assertMatch);
  Assertion.addMethod('matches', assertMatch);

  /**
   * ### .string(str[, msg])
   *
   * Asserts that the target string contains the given substring `str`.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * Add `.not` earlier in the chain to negate `.string`.
   *
   *     expect('foobar').to.not.have.string('taco');
   *
   * `.string` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect('foobar').to.have.string(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.have.string(/taco/);
   *
   * @name string
   * @param {String} str
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });

  /**
   * ### .keys(key1[, key2[, ...]])
   *
   * Asserts that the target object, array, map, or set has the given keys. Only
   * the target's own inherited properties are included in the search. 
   *
   * When the target is an object or array, keys can be provided as one or more
   * string arguments, a single array argument, or a single object argument. In
   * the latter case, only the keys in the given object matter; the values are
   * ignored.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *     expect(['x', 'y']).to.have.all.keys(0, 1);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
   *     expect(['x', 'y']).to.have.all.keys([0, 1]);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
   *     expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
   *
   * When the target is a map or set, each key must be provided as a separate
   * argument.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');
   *     expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
   *
   * Because `.keys` does different things based on the target's type, it's
   * important to check the target's type before using `.keys`. See the `.a` doc
   * for info on testing a target's type.
   *
   *     expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b');
   *
   * By default, strict (`===`) equality is used to compare keys of maps and
   * sets. Add `.deep` earlier in the chain to use deep equality instead. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.all.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.all.keys([{a: 1}]);
   *
   * By default, the target must have all of the given keys and no more. Add
   * `.any` earlier in the chain to only require that the target have at least
   * one of the given keys. Also, add `.not` earlier in the chain to negate
   * `.keys`. It's often best to add `.any` when negating `.keys`, and to use
   * `.all` when asserting `.keys` without negation.
   *
   * When negating `.keys`, `.any` is preferred because `.not.any.keys` asserts
   * exactly what's expected of the output, whereas `.not.all.keys` creates
   * uncertain expectations.
   *
   *     // Recommended; asserts that target doesn't have any of the given keys
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   *     // Not recommended; asserts that target doesn't have all of the given
   *     // keys but may or may not have some of them
   *     expect({a: 1, b: 2}).to.not.have.all.keys('c', 'd');
   *
   * When asserting `.keys` without negation, `.all` is preferred because
   * `.all.keys` asserts exactly what's expected of the output, whereas
   * `.any.keys` creates uncertain expectations.
   *
   *     // Recommended; asserts that target has all the given keys
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   *     // Not recommended; asserts that target has at least one of the given
   *     // keys but may or may not have more of them
   *     expect({a: 1, b: 2}).to.have.any.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` appear
   * earlier in the chain. However, it's often best to add `.all` anyway because
   * it improves readability.
   *
   *     // Both assertions are identical
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b'); // Recommended
   *     expect({a: 1, b: 2}).to.have.keys('a', 'b'); // Not recommended
   *
   * Add `.include` earlier in the chain to require that the target's keys be a
   * superset of the expected keys, rather than identical sets.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   * However, if `.any` and `.include` are combined, only the `.any` takes
   * effect. The `.include` is ignored in this case.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.have.key('b');
   *
   * The alias `.key` can be used interchangeably with `.keys`.
   *
   * @name keys
   * @alias key
   * @param {...String|Array|Object} keys
   * @namespace BDD
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , objType = _.type(obj)
      , keysType = _.type(keys)
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , str
      , deepStr = ''
      , ok = true
      , flagMsg = flag(this, 'message');

    flagMsg = flagMsg ? flagMsg + ': ' : '';
    var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';

    if (objType === 'Map' || objType === 'Set') {
      deepStr = isDeep ? 'deeply ' : '';
      actual = [];

      // Map and Set '.keys' aren't supported in IE 11. Therefore, use .forEach.
      obj.forEach(function (val, key) { actual.push(key); });

      if (keysType !== 'Array') {
        keys = Array.prototype.slice.call(arguments);
      }

    } else {
      actual = _.getOwnEnumerableProperties(obj);

      switch (keysType) {
        case 'Array':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          break;
        case 'Object':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }

      // Only stringify non-Symbols because Symbols would become "Symbol()"
      keys = keys.map(function (val) {
        return typeof val === 'symbol' ? val : String(val);
      });
    }

    if (!keys.length) {
      throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
    }

    var len = keys.length
      , any = flag(this, 'any')
      , all = flag(this, 'all')
      , expected = keys
      , actual;

    if (!any && !all) {
      all = true;
    }

    // Has any
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
    }

    // Has all
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });

      if (!flag(this, 'contains')) {
        ok = ok && keys.length == actual.length;
      }
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      if (all) {
        str = keys.join(', ') + ', and ' + last;
      }
      if (any) {
        str = keys.join(', ') + ', or ' + last;
      }
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + deepStr + str
      , 'expected #{this} to not ' + deepStr + str
      , expected.slice(0).sort(_.compareByInspect)
      , actual.sort(_.compareByInspect)
      , true
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw([errorLike], [errMsgMatcher], [msg])
   *
   * When no arguments are provided, `.throw` invokes the target function and
   * asserts that an error is thrown.
   * 
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw();
   *
   * When one argument is provided, and it's an error constructor, `.throw`
   * invokes the target function and asserts that an error is thrown that's an
   * instance of that error constructor.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError);
   *
   * When one argument is provided, and it's an error instance, `.throw` invokes
   * the target function and asserts that an error is thrown that's strictly
   * (`===`) equal to that error instance.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(err);
   *
   * When one argument is provided, and it's a string, `.throw` invokes the
   * target function and asserts that an error is thrown with a message that
   * contains that string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw('salmon');
   *
   * When one argument is provided, and it's a regular expression, `.throw`
   * invokes the target function and asserts that an error is thrown with a
   * message that matches that regular expression.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(/salmon/);
   *
   * When two arguments are provided, and the first is an error instance or
   * constructor, and the second is a string or regular expression, `.throw`
   * invokes the function and asserts that an error is thrown that fulfills both
   * conditions as described above.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon');
   *     expect(badFn).to.throw(TypeError, /salmon/);
   *     expect(badFn).to.throw(err, 'salmon');
   *     expect(badFn).to.throw(err, /salmon/);
   *
   * Add `.not` earlier in the chain to negate `.throw`.
   *     
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw();
   * 
   * However, it's dangerous to negate `.throw` when providing any arguments.
   * The problem is that it creates uncertain expectations by asserting that the
   * target either doesn't throw an error, or that it throws an error but of a
   * different type than the given type, or that it throws an error of the given
   * type but with a message that doesn't include the given string. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to throw an error, it's often best to assert
   * exactly that.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw(); // Recommended
   *     expect(goodFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * When the target is expected to throw an error, it's often best to assert
   * that the error is of its expected type, and has a message that includes an
   * expected string, rather than asserting that it doesn't have one of many
   * unexpected types, and doesn't have a message that includes some string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon'); // Recommended
   *     expect(badFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * `.throw` changes the target of any assertions that follow in the chain to
   * be the error object that's thrown.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     err.code = 42;
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError).with.property('code', 42);
   *
   * `.throw` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`. When not providing two arguments, always use
   * the second form.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.throw(TypeError, 'x', 'nooo why fail??');
   *     expect(goodFn, 'nooo why fail??').to.throw();
   *
   * Due to limitations in ES5, `.throw` may not always work as expected when
   * using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing the built-in `Error` object and
   * then passing the subclassed constructor to `.throw`. See your transpiler's
   * docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * Beware of some common mistakes when using the `throw` assertion. One common
   * mistake is to accidentally invoke the function yourself instead of letting
   * the `throw` assertion invoke the function for you. For example, when
   * testing if a function named `fn` throws, provide `fn` instead of `fn()` as
   * the target for the assertion.
   *
   *     expect(fn).to.throw();     // Good! Tests `fn` as desired
   *     expect(fn()).to.throw();   // Bad! Tests result of `fn()`, not `fn`
   *
   * If you need to assert that your function `fn` throws when passed certain
   * arguments, then wrap a call to `fn` inside of another function.
   *
   *     expect(function () { fn(42); }).to.throw();  // Function expression
   *     expect(() => fn(42)).to.throw();             // ES6 arrow function
   *
   * Another common mistake is to provide an object method (or any stand-alone
   * function that relies on `this`) as the target of the assertion. Doing so is
   * problematic because the `this` context will be lost when the function is
   * invoked by `.throw`; there's no way for it to know what `this` is supposed
   * to be. There are two ways around this problem. One solution is to wrap the
   * method or function call inside of another function. Another solution is to
   * use `bind`.
   *
   *     expect(function () { cat.meow(); }).to.throw();  // Function expression
   *     expect(() => cat.meow()).to.throw();             // ES6 arrow function
   *     expect(cat.meow.bind(cat)).to.throw();           // Bind
   *
   * Finally, it's worth mentioning that it's a best practice in JavaScript to
   * only throw `Error` and derivatives of `Error` such as `ReferenceError`,
   * `TypeError`, and user-defined objects that extend `Error`. No other type of
   * value will generate a stack trace when initialized. With that said, the
   * `throw` assertion does technically support any type of value being thrown,
   * not just `Error` and its derivatives.
   *
   * The aliases `.throws` and `.Throw` can be used interchangeably with
   * `.throw`.
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {Error|ErrorConstructor} errorLike
   * @param {String|RegExp} errMsgMatcher error message
   * @param {String} msg _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @returns error for chaining (null if no error)
   * @namespace BDD
   * @api public
   */

  function assertThrows (errorLike, errMsgMatcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate') || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a('function');

    if (errorLike instanceof RegExp || typeof errorLike === 'string') {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var caughtErr;
    try {
      obj();
    } catch (err) {
      caughtErr = err;
    }

    // If we have the negate flag enabled and at least one valid argument it means we do expect an error
    // but we want it to match a given set of criteria
    var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;

    // If we've got the negate flag enabled and both args, we should only fail if both aren't compatible
    // See Issue #551 and PR #683@GitHub
    var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    var errorLikeFail = false;
    var errMsgMatcherFail = false;

    // Checking if error was thrown
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      // We need this to display results correctly according to their types
      var errorLikeString = 'an error';
      if (errorLike instanceof Error) {
        errorLikeString = '#{exp}';
      } else if (errorLike) {
        errorLikeString = _.checkError.getConstructorName(errorLike);
      }

      this.assert(
          caughtErr
        , 'expected #{this} to throw ' + errorLikeString
        , 'expected #{this} to not throw an error but #{act} was thrown'
        , errorLike && errorLike.toString()
        , (caughtErr instanceof Error ?
            caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr &&
                                    _.checkError.getConstructorName(caughtErr)))
      );
    }

    if (errorLike && caughtErr) {
      // We should compare instances only if `errorLike` is an instance of `Error`
      if (errorLike instanceof Error) {
        var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);

        if (isCompatibleInstance === negate) {
          // These checks were created to ensure we won't fail too soon when we've got both args and a negate
          // See Issue #551 and PR #683@GitHub
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(
                negate
              , 'expected #{this} to throw #{exp} but #{act} was thrown'
              , 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : '')
              , errorLike.toString()
              , caughtErr.toString()
            );
          }
        }
      }

      var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
            errorLikeFail = true;
        } else {
          this.assert(
              negate
            , 'expected #{this} to throw #{exp} but #{act} was thrown'
            , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
            , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
            , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
          );
        }
      }
    }

    if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
      // Here we check compatible messages
      var placeholder = 'including';
      if (errMsgMatcher instanceof RegExp) {
        placeholder = 'matching';
      }

      var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
            errMsgMatcherFail = true;
        } else {
          this.assert(
            negate
            , 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}'
            , 'expected #{this} to throw error not ' + placeholder + ' #{exp}'
            ,  errMsgMatcher
            ,  _.checkError.getMessage(caughtErr)
          );
        }
      }
    }

    // If both assertions failed and both should've matched we throw an error
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(
        negate
        , 'expected #{this} to throw #{exp} but #{act} was thrown'
        , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
        , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
        , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
      );
    }

    flag(this, 'object', caughtErr);
  }

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method[, msg])
   *
   * When the target is a non-function object, `.respondTo` asserts that the
   * target has a method with the given name `method`. The method can be own or
   * inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.respondTo('meow');
   *
   * When the target is a function, `.respondTo` asserts that the target's
   * `prototype` property has a method with the given name `method`. Again, the
   * method can be own or inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(Cat).to.respondTo('meow');
   *
   * Add `.itself` earlier in the chain to force `.respondTo` to treat the
   * target as a non-function object, even if it's a function. Thus, it asserts
   * that the target has a method with the given name `method`, rather than
   * asserting that the target's `prototype` property has a method with the
   * given name `method`.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * When not adding `.itself`, it's important to check the target's type before
   * using `.respondTo`. See the `.a` doc for info on checking a target's type.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.be.an('object').that.respondsTo('meow');
   *
   * Add `.not` earlier in the chain to negate `.respondTo`.
   *
   *     function Dog () {}
   *     Dog.prototype.bark = function () {};
   *
   *     expect(new Dog()).to.not.respondTo('meow');
   *
   * `.respondTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect({}).to.respondTo('meow', 'nooo why fail??');
   *     expect({}, 'nooo why fail??').to.respondTo('meow');
   *
   * The alias `.respondsTo` can be used interchangeably with `.respondTo`.
   *
   * @name respondTo
   * @alias respondsTo
   * @param {String} method
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function respondTo (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === typeof obj && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  }

  Assertion.addMethod('respondTo', respondTo);
  Assertion.addMethod('respondsTo', respondTo);

  /**
   * ### .itself
   *
   * Forces all `.respondTo` assertions that follow in the chain to behave as if
   * the target is a non-function object, even if it's a function. Thus, it
   * causes `.respondTo` to assert that the target has a method with the given
   * name, rather than asserting that the target's `prototype` property has a
   * method with the given name.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * @name itself
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(matcher[, msg])
   *
   * Invokes the given `matcher` function with the target being passed as the
   * first argument, and asserts that the value returned is truthy.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 0; 
   *     });
   *
   * Add `.not` earlier in the chain to negate `.satisfy`.
   *
   *     expect(1).to.not.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * `.satisfy` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 2;
   *     }, 'nooo why fail??');
   *
   *     expect(1, 'nooo why fail??').to.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * The alias `.satisfies` can be used interchangeably with `.satisfy`.
   *
   * @name satisfy
   * @alias satisfies
   * @param {Function} matcher
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function satisfy (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var result = matcher(obj);
    this.assert(
        result
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , flag(this, 'negate') ? false : true
      , result
    );
  }

  Assertion.addMethod('satisfy', satisfy);
  Assertion.addMethod('satisfies', satisfy);

  /**
   * ### .closeTo(expected, delta[, msg])
   *
   * Asserts that the target is a number that's within a given +/- `delta` range
   * of the given number `expected`. However, it's often best to assert that the
   * target is equal to its expected value.
   *
   *     // Recommended
   *     expect(1.5).to.equal(1.5);
   *
   *     // Not recommended
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *     expect(1.5).to.be.closeTo(2, 0.5);
   *     expect(1.5).to.be.closeTo(1, 1);
   *
   * Add `.not` earlier in the chain to negate `.closeTo`.
   *
   *     expect(1.5).to.equal(1.5); // Recommended
   *     expect(1.5).to.not.be.closeTo(3, 1); // Not recommended
   *
   * `.closeTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
   *     expect(1.5, 'nooo why fail??').to.be.closeTo(3, 1);
   *
   * The alias `.approximately` can be used interchangeably with `.closeTo`.
   *
   * @name closeTo
   * @alias approximately
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function closeTo(expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).is.a('number');
    if (typeof expected !== 'number' || typeof delta !== 'number') {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
          flagMsg + 'the arguments to closeTo or approximately must be numbers',
          undefined,
          ssfi
      );
    }

    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  }

  Assertion.addMethod('closeTo', closeTo);
  Assertion.addMethod('approximately', closeTo);

  // Note: Duplicates are ignored if testing for inclusion instead of sameness.
  function isSubsetOf(subset, superset, cmp, contains, ordered) {
    if (!contains) {
      if (subset.length !== superset.length) return false;
      superset = superset.slice();
    }

    return subset.every(function(elem, idx) {
      if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];

      if (!cmp) {
        var matchIdx = superset.indexOf(elem);
        if (matchIdx === -1) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      }

      return superset.some(function(elem2, matchIdx) {
        if (!cmp(elem, elem2)) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      });
    });
  }

  /**
   * ### .members(set[, msg])
   *
   * Asserts that the target array has the same members as the given array
   * `set`.
   *
   *     expect([1, 2, 3]).to.have.members([2, 1, 3]);
   *     expect([1, 2, 2]).to.have.members([2, 1, 2]);
   *
   * By default, members are compared using strict (`===`) equality. Add `.deep`
   * earlier in the chain to use deep equality instead. See the `deep-eql`
   * project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   * By default, order doesn't matter. Add `.ordered` earlier in the chain to
   * require that members appear in the same order.
   *
   *     expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
   *     expect([1, 2, 3]).to.have.members([2, 1, 3])
   *       .but.not.ordered.members([2, 1, 3]);
   *
   * By default, both arrays must be the same size. Add `.include` earlier in
   * the chain to require that the target's members be a superset of the
   * expected members. Note that duplicates are ignored in the subset when
   * `.include` is added.
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * `.deep`, `.ordered`, and `.include` can all be combined. However, if
   * `.include` and `.ordered` are combined, the ordering begins at the start of
   * both arrays.
   *
   *     expect([{a: 1}, {b: 2}, {c: 3}])
   *       .to.include.deep.ordered.members([{a: 1}, {b: 2}])
   *       .but.not.include.deep.ordered.members([{b: 2}, {c: 3}]);
   *
   * Add `.not` earlier in the chain to negate `.members`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the target array doesn't have all of the same members as
   * the given array `set` but may or may not have some of them. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     expect([1, 2]).to.not.include(3).and.not.include(4); // Recommended
   *     expect([1, 2]).to.not.have.members([3, 4]); // Not recommended
   *
   * `.members` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2]).to.have.members([1, 2, 3], 'nooo why fail??');
   *     expect([1, 2], 'nooo why fail??').to.have.members([1, 2, 3]);
   *
   * @name members
   * @param {Array} set
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).to.be.an('array');
    new Assertion(subset, flagMsg, ssfi, true).to.be.an('array');

    var contains = flag(this, 'contains');
    var ordered = flag(this, 'ordered');

    var subject, failMsg, failNegateMsg;

    if (contains) {
      subject = ordered ? 'an ordered superset' : 'a superset';
      failMsg = 'expected #{this} to be ' + subject + ' of #{exp}';
      failNegateMsg = 'expected #{this} to not be ' + subject + ' of #{exp}';
    } else {
      subject = ordered ? 'ordered members' : 'members';
      failMsg = 'expected #{this} to have the same ' + subject + ' as #{exp}';
      failNegateMsg = 'expected #{this} to not have the same ' + subject + ' as #{exp}';
    }

    var cmp = flag(this, 'deep') ? _.eql : undefined;

    this.assert(
        isSubsetOf(subset, obj, cmp, contains, ordered)
      , failMsg
      , failNegateMsg
      , subset
      , obj
      , true
    );
  });

  /**
   * ### .oneOf(list[, msg])
   *
   * Asserts that the target is a member of the given array `list`. However,
   * it's often best to assert that the target is equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.oneOf([1, 2, 3]); // Not recommended
   *
   * Comparisons are performed using strict (`===`) equality.
   *
   * Add `.not` earlier in the chain to negate `.oneOf`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.oneOf([2, 3, 4]); // Not recommended
   *
   * `.oneOf` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.oneOf([2, 3, 4], 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.oneOf([2, 3, 4]);
   *
   * @name oneOf
   * @param {Array<*>} list
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function oneOf (list, msg) {
    if (msg) flag(this, 'message', msg);
    var expected = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(list, flagMsg, ssfi, true).to.be.an('array');

    this.assert(
        list.indexOf(expected) > -1
      , 'expected #{this} to be one of #{exp}'
      , 'expected #{this} to not be one of #{exp}'
      , list
      , expected
    );
  }

  Assertion.addMethod('oneOf', oneOf);


  /**
   * ### .change(subject[, prop[, msg]])
   *
   * When one argument is provided, `.change` asserts that the given function
   * `subject` returns a different value when it's invoked before the target
   * function compared to when it's invoked afterward. However, it's often best
   * to assert that `subject` is equal to its expected value.
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     // Recommended
   *     expect(getDots()).to.equal('');
   *     addDot();
   *     expect(getDots()).to.equal('.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(getDots);
   *
   * When two arguments are provided, `.change` asserts that the value of the
   * given object `subject`'s `prop` property is different before invoking the
   * target function compared to afterward.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     // Recommended
   *     expect(myObj).to.have.property('dots', '');
   *     addDot();
   *     expect(myObj).to.have.property('dots', '.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(myObj, 'dots');
   *
   * Strict (`===`) equality is used to compare before and after values.
   *
   * Add `.not` earlier in the chain to negate `.change`.
   *
   *     var dots = ''
   *       , noop = function () {}
   *       , getDots = function () { return dots; };
   *
   *     expect(noop).to.not.change(getDots);
   *
   *     var myObj = {dots: ''}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'dots');
   *
   * `.change` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     expect(addDot).to.not.change(myObj, 'dots', 'nooo why fail??');
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     expect(addDot, 'nooo why fail??').to.not.change(getDots);
   *
   * `.change` also causes all `.by` assertions that follow in the chain to
   * assert how much a numeric subject was increased or decreased by. However,
   * it's dangerous to use `.change.by`. The problem is that it creates
   * uncertain expectations by asserting that the subject either increases by
   * the given delta, or that it decreases by the given delta. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * The alias `.changes` can be used interchangeably with `.change`.
   *
   * @name change
   * @alias changes
   * @param {String} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertChanges (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    // This gets flagged because of the .by(delta) assertion
    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'change');
    flag(this, 'realDelta', final !== initial);

    this.assert(
      initial !== final
      , 'expected ' + msgObj + ' to change'
      , 'expected ' + msgObj + ' to not change'
    );
  }

  Assertion.addMethod('change', assertChanges);
  Assertion.addMethod('changes', assertChanges);

  /**
   * ### .increase(subject[, prop[, msg]])
   *
   * When one argument is provided, `.increase` asserts that the given function
   * `subject` returns a greater number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.increase` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * greater of a number is returned. It's often best to assert that the return
   * value increased by the expected amount, rather than asserting it increased
   * by any amount.
   *
   *     var val = 1
   *       , addTwo = function () { val += 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(addTwo).to.increase(getVal).by(2); // Recommended
   *     expect(addTwo).to.increase(getVal); // Not recommended
   *
   * When two arguments are provided, `.increase` asserts that the value of the
   * given object `subject`'s `prop` property is greater after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.increase(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.increase`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either decreases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to decrease, it's often best to assert that it
   * decreased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.not.increase(myObj, 'val'); // Not recommended
   * 
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.increase(myObj, 'val'); // Not recommended
   *
   * `.increase` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.increase(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.increase(getVal);
   *
   * The alias `.increases` can be used interchangeably with `.increase`.
   *
   * @name increase
   * @alias increases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertIncreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'increase');
    flag(this, 'realDelta', final - initial);

    this.assert(
      final - initial > 0
      , 'expected ' + msgObj + ' to increase'
      , 'expected ' + msgObj + ' to not increase'
    );
  }

  Assertion.addMethod('increase', assertIncreases);
  Assertion.addMethod('increases', assertIncreases);

  /**
   * ### .decrease(subject[, prop[, msg]])
   *
   * When one argument is provided, `.decrease` asserts that the given function
   * `subject` returns a lesser number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.decrease` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * lesser of a number is returned. It's often best to assert that the return
   * value decreased by the expected amount, rather than asserting it decreased
   * by any amount.
   *
   *     var val = 1
   *       , subtractTwo = function () { val -= 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
   *     expect(subtractTwo).to.decrease(getVal); // Not recommended
   *
   * When two arguments are provided, `.decrease` asserts that the value of the
   * given object `subject`'s `prop` property is lesser after invoking the
   * target function compared to beforehand. 
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.decrease(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.decrease`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either increases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to increase, it's often best to assert that it
   * increased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.not.decrease(myObj, 'val'); // Not recommended
   * 
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * `.decrease` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.decrease(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.decrease(getVal);
   *
   * The alias `.decreases` can be used interchangeably with `.decrease`.
   *
   * @name decrease
   * @alias decreases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDecreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'decrease');
    flag(this, 'realDelta', initial - final);

    this.assert(
      final - initial < 0
      , 'expected ' + msgObj + ' to decrease'
      , 'expected ' + msgObj + ' to not decrease'
    );
  }

  Assertion.addMethod('decrease', assertDecreases);
  Assertion.addMethod('decreases', assertDecreases);

  /**
   * ### .by(delta[, msg])
   *
   * When following an `.increase` assertion in the chain, `.by` asserts that
   * the subject of the `.increase` assertion increased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   * When following a `.decrease` assertion in the chain, `.by` asserts that the
   * subject of the `.decrease` assertion decreased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2);
   *
   * When following a `.change` assertion in the chain, `.by` asserts that the
   * subject of the `.change` assertion either increased or decreased by the
   * given `delta`. However, it's dangerous to use `.change.by`. The problem is
   * that it creates uncertain expectations. It's often best to identify the
   * exact output that's expected, and then write an assertion that only accepts
   * that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.by`. However, it's often best
   * to assert that the subject changed by its expected delta, rather than
   * asserting that it didn't change by one of countless unexpected deltas.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     // Recommended
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   *     // Not recommended
   *     expect(addTwo).to.increase(myObj, 'val').but.not.by(3);
   *
   * `.by` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(3, 'nooo why fail??');
   *     expect(addTwo, 'nooo why fail??').to.increase(myObj, 'val').by(3);
   *
   * @name by
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDelta(delta, msg) {
    if (msg) flag(this, 'message', msg);

    var msgObj = flag(this, 'deltaMsgObj');
    var initial = flag(this, 'initialDeltaValue');
    var final = flag(this, 'finalDeltaValue');
    var behavior = flag(this, 'deltaBehavior');
    var realDelta = flag(this, 'realDelta');

    var expression;
    if (behavior === 'change') {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }

    this.assert(
      expression
      , 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta
      , 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta
    );
  }

  Assertion.addMethod('by', assertDelta);

  /**
   * ### .extensible
   *
   * Asserts that the target is extensible, which means that new properties can
   * be added to it. Primitives are never extensible.
   *
   *     expect({a: 1}).to.be.extensible;
   *
   * Add `.not` earlier in the chain to negate `.extensible`.
   *
   *     var nonExtensibleObject = Object.preventExtensions({})
   *       , sealedObject = Object.seal({})
   *       , frozenObject = Object.freeze({});
   *
   *     expect(nonExtensibleObject).to.not.be.extensible;
   *     expect(sealedObject).to.not.be.extensible;
   *     expect(frozenObject).to.not.be.extensible;
   *     expect(1).to.not.be.extensible;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(1, 'nooo why fail??').to.be.extensible;
   *
   * @name extensible
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('extensible', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
    // The following provides ES6 behavior for ES5 environments.

    var isExtensible = obj === Object(obj) && Object.isExtensible(obj);

    this.assert(
      isExtensible
      , 'expected #{this} to be extensible'
      , 'expected #{this} to not be extensible'
    );
  });

  /**
   * ### .sealed
   *
   * Asserts that the target is sealed, which means that new properties can't be
   * added to it, and its existing properties can't be reconfigured or deleted.
   * However, it's possible that its existing properties can still be reassigned
   * to different values. Primitives are always sealed.
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     expect(sealedObject).to.be.sealed;
   *     expect(frozenObject).to.be.sealed;
   *     expect(1).to.be.sealed;
   *
   * Add `.not` earlier in the chain to negate `.sealed`.
   *
   *     expect({a: 1}).to.not.be.sealed;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.sealed;
   *
   * @name sealed
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('sealed', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
    // The following provides ES6 behavior for ES5 environments.

    var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;

    this.assert(
      isSealed
      , 'expected #{this} to be sealed'
      , 'expected #{this} to not be sealed'
    );
  });

  /**
   * ### .frozen
   *
   * Asserts that the target is frozen, which means that new properties can't be
   * added to it, and its existing properties can't be reassigned to different
   * values, reconfigured, or deleted. Primitives are always frozen.
   *
   *     var frozenObject = Object.freeze({});
   *
   *     expect(frozenObject).to.be.frozen;
   *     expect(1).to.be.frozen;
   *
   * Add `.not` earlier in the chain to negate `.frozen`.
   *
   *     expect({a: 1}).to.not.be.frozen;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.frozen;
   *
   * @name frozen
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('frozen', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
    // The following provides ES6 behavior for ES5 environments.

    var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;

    this.assert(
      isFrozen
      , 'expected #{this} to be frozen'
      , 'expected #{this} to not be frozen'
    );
  });

  /**
   * ### .finite
   *
   * Asserts that the target is a number, and isn't `NaN` or positive/negative
   * `Infinity`.
   *
   *     expect(1).to.be.finite;
   *
   * Add `.not` earlier in the chain to negate `.finite`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either isn't a number, or that it's `NaN`, or
   * that it's positive `Infinity`, or that it's negative `Infinity`. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to be a number, it's often best to assert
   * that it's the expected type, rather than asserting that it isn't one of
   * many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.finite; // Not recommended
   *
   * When the target is expected to be `NaN`, it's often best to assert exactly
   * that.
   *
   *     expect(NaN).to.be.NaN; // Recommended
   *     expect(NaN).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be positive infinity, it's often best to
   * assert exactly that.
   *
   *     expect(Infinity).to.equal(Infinity); // Recommended
   *     expect(Infinity).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be negative infinity, it's often best to
   * assert exactly that.
   *
   *     expect(-Infinity).to.equal(-Infinity); // Recommended
   *     expect(-Infinity).to.not.be.finite; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect('foo', 'nooo why fail??').to.be.finite;
   *
   * @name finite
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('finite', function(msg) {
    var obj = flag(this, 'object');

    this.assert(
        typeof obj === "number" && isFinite(obj)
      , 'expected #{this} to be a finite number'
      , 'expected #{this} to not be a finite number'
    );
  });
};

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var expect = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace BDD
   * @api public
   */

  chai.expect.fail = function (actual, expected, message, operator) {
    message = message || 'expect.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, chai.expect.fail);
  };
};

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var should = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // explicitly define this method as function as to have it's name to include as `ssfi`
    function shouldGetter() {
      if (this instanceof String
          || this instanceof Number
          || this instanceof Boolean
          || typeof Symbol === 'function' && this instanceof Symbol) {
        return new Assertion(this.valueOf(), null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      // See https://github.com/chaijs/chai/issues/86: this makes
      // `whatever.should = someValue` actually set `someValue`, which is
      // especially useful for `global.should = require('chai').should()`.
      //
      // Note that we have to use [[DefineProperty]] instead of [[Put]]
      // since otherwise we would trigger this very setter!
      Object.defineProperty(this, 'should', {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should', {
      set: shouldSetter
      , get: shouldGetter
      , configurable: true
    });

    var should = {};

    /**
     * ### .fail(actual, expected, [message], [operator])
     *
     * Throw a failure.
     *
     * @name fail
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @param {String} operator
     * @namespace BDD
     * @api public
     */

    should.fail = function (actual, expected, message, operator) {
      message = message || 'should.fail()';
      throw new chai.AssertionError(message, {
          actual: actual
        , expected: expected
        , operator: operator
      }, should.fail);
    };

    /**
     * ### .equal(actual, expected, [message])
     *
     * Asserts non-strict equality (`==`) of `actual` and `expected`.
     *
     *     should.equal(3, '3', '== coerces values to strings');
     *
     * @name equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
     *
     * Asserts that `function` will throw an error that is an instance of
     * `constructor`, or alternately that it will throw an error with message
     * matching `regexp`.
     *
     *     should.throw(fn, 'function throws a reference error');
     *     should.throw(fn, /function throws a reference error/);
     *     should.throw(fn, ReferenceError);
     *     should.throw(fn, ReferenceError, 'function throws a reference error');
     *     should.throw(fn, ReferenceError, /function throws a reference error/);
     *
     * @name throw
     * @alias Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    /**
     * ### .exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var foo = 'hi';
     *
     *     should.exist(foo, 'foo exists');
     *
     * @name exist
     * @namespace Should
     * @api public
     */

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    };

    // negation
    should.not = {};

    /**
     * ### .not.equal(actual, expected, [message])
     *
     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
     *
     *     should.not.equal(3, 4, 'these numbers are not equal');
     *
     * @name not.equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/regexp], [message])
     *
     * Asserts that `function` will _not_ throw an error that is an instance of
     * `constructor`, or alternately that it will not throw an error with message
     * matching `regexp`.
     *
     *     should.not.throw(fn, Error, 'function does not throw');
     *
     * @name not.throw
     * @alias not.Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    /**
     * ### .not.exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var bar = null;
     *
     *     should.not.exist(bar, 'bar does not exist');
     *
     * @name not.exist
     * @namespace Should
     * @api public
     */

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    };

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  }

  chai.should = loadShould;
  chai.Should = loadShould;
};

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


var assert = function (chai, util) {

  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @namespace Assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null, null, chai.assert, true);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace Assert
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, assert.fail);
  };

  /**
   * ### .isOk(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.isOk('everything', 'everything is ok');
   *     assert.isOk(false, 'this will fail');
   *
   * @name isOk
   * @alias ok
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isOk = function (val, msg) {
    new Assertion(val, msg, assert.isOk, true).is.ok;
  };

  /**
   * ### .isNotOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.isNotOk('everything', 'this will fail');
   *     assert.isNotOk(false, 'this will pass');
   *
   * @name isNotOk
   * @alias notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotOk = function (val, msg) {
    new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.equal, true);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.notEqual, true);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @alias deepStrictEqual
   * @namespace Assert
   * @api public
   */

  assert.deepEqual = assert.deepStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
  };

   /**
   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
   *
   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
   *
   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
   *
   * @name isAbove
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAbove
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAbove = function (val, abv, msg) {
    new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
  };

   /**
   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
   *
   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
   *
   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
   *
   * @name isAtLeast
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtLeast
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtLeast = function (val, atlst, msg) {
    new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
  };

   /**
   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
   *
   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
   *
   *     assert.isBelow(3, 6, '3 is strictly less than 6');
   *
   * @name isBelow
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeBelow
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBelow = function (val, blw, msg) {
    new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
  };

   /**
   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
   *
   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
   *
   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
   *
   * @name isAtMost
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtMost
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtMost = function (val, atmst, msg) {
    new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg, assert.isTrue, true).is['true'];
  };

  /**
   * ### .isNotTrue(value, [message])
   *
   * Asserts that `value` is not true.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotTrue(tea, 'great, time for tea!');
   *
   * @name isNotTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotTrue = function (val, msg) {
    new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg, assert.isFalse, true).is['false'];
  };

  /**
   * ### .isNotFalse(value, [message])
   *
   * Asserts that `value` is not false.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotFalse(tea, 'great, time for tea!');
   *
   * @name isNotFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFalse = function (val, msg) {
    new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg, assert.isNull, true).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
  };

  /**
   * ### .isNaN
   *
   * Asserts that value is NaN.
   *
   *     assert.isNaN(NaN, 'NaN is NaN');
   *
   * @name isNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
  };

  /**
   * ### .isNotNaN
   *
   * Asserts that value is not NaN.
   *
   *     assert.isNotNaN(4, '4 is not NaN');
   *
   * @name isNotNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */
  assert.isNotNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNotNaN, true).not.to.be.NaN;
  };

  /**
   * ### .exists
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi';
   *
   *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
   *
   * @name exists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.exists = function (val, msg) {
    new Assertion(val, msg, assert.exists, true).to.exist;
  };

  /**
   * ### .notExists
   *
   * Asserts that the target is either `null` or `undefined`.
   *
   *     var bar = null
   *       , baz;
   *
   *     assert.notExists(bar);
   *     assert.notExists(baz, 'baz is either null or undefined');
   *
   * @name notExists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notExists = function (val, msg) {
    new Assertion(val, msg, assert.notExists, true).to.not.exist;
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg, assert.isUndefined, true).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg, assert.isDefined, true).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg, assert.isFunction, true).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg, assert.isNotFunction, true).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
   * _The assertion does not match subclassed objects._
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg, assert.isObject, true).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
   *
   *     var selection = 'chai'
   *     assert.isNotObject(selection, 'tea selection is not an object');
   *     assert.isNotObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg, assert.isNotObject, true).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg, assert.isArray, true).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg, assert.isNotArray, true).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg, assert.isString, true).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg, assert.isNotString, true).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNumber, true).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
  };

   /**
   * ### .isFinite(value, [message])
   *
   * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
   *
   *     var cups = 2;
   *     assert.isFinite(cups, 'how many cups');
   *
   *     assert.isFinite(NaN); // throws
   *
   * @name isFinite
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFinite = function (val, msg) {
    new Assertion(val, msg, assert.isFinite, true).to.be.finite;
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isBoolean, true).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.typeOf, true).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notTypeOf, true).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notInstanceOf, true)
      .to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.include([1,2,3], 2, 'array contains value');
   *     assert.include('foobar', 'foo', 'string contains substring');
   *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
   *
   * Strict equality (===) is used. When asserting the inclusion of a value in
   * an array, the array is searched for an element that's strictly equal to the
   * given value. When asserting a subset of properties in an object, the object
   * is searched for the given property keys, checking that each one is present
   * and stricty equal to the given property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.include([obj1, obj2], obj1);
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.include, true).include(inc);
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.notInclude([1,2,3], 4, 'array doesn't contain value');
   *     assert.notInclude('foobar', 'baz', 'string doesn't contain substring');
   *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
   *
   * Strict equality (===) is used. When asserting the absence of a value in an
   * array, the array is searched to confirm the absence of an element that's
   * strictly equal to the given value. When asserting a subset of properties in
   * an object, the object is searched to confirm that at least one of the given
   * property keys is either not present or not strictly equal to the given
   * property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notInclude([obj1, obj2], {a: 1});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
  };

  /**
   * ### .deepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.deepInclude([obj1, obj2], {a: 1});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
   *
   * @name deepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
  };

  /**
   * ### .notDeepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notDeepInclude([obj1, obj2], {a: 9});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
   *
   * @name notDeepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
  };

  /**
   * ### .nestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'. 
   * Can be used to assert the inclusion of a subset of properties in an 
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.[b]': 'x'});
   *     assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
   * 
   * @name nestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */ 

  assert.nestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
  };

  /**
   * ### .notNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' does not include 'needle'. 
   * Can be used to assert the absence of a subset of properties in an 
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties. 
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
   *     assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
   * 
   * @name notNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */ 

  assert.notNestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notNestedInclude, true)
      .not.nested.include(inc);
  };

  /**
   * ### .deepNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
   *     assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
   *    
   * @name deepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */

  assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepNestedInclude, true)
      .deep.nested.include(inc);
  };

  /**
   * ### .notDeepNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
   *     assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
   *    
   * @name notDeepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */

  assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepNestedInclude, true)
      .not.deep.nested.include(inc);
  };

  /**
   * ### .ownInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while ignoring inherited properties.
   * 
   *     assert.ownInclude({ a: 1 }, { a: 1 });
   * 
   * @name ownInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
  };

  /**
   * ### .notOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while ignoring inherited properties.
   * 
   *     Object.prototype.b = 2;
   * 
   *     assert.notOwnInclude({ a: 1 }, { b: 2 });
   * 
   * @name notOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
  };

  /**
   * ### .deepOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while ignoring inherited properties and checking for deep equality.
   * 
   *      assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
   *      
   * @name deepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepOwnInclude, true)
      .deep.own.include(inc);
  };

   /**
   * ### .notDeepOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while ignoring inherited properties and checking for deep equality.
   * 
   *      assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
   *      
   * @name notDeepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepOwnInclude, true)
      .not.deep.own.include(inc);
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg, assert.match, true).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *     assert.property({ tea: { green: 'matcha' }}, 'toString');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.property, true).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notProperty, true)
      .to.not.have.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.propertyVal, true)
      .to.have.property(prop, val);
  };

  /**
   * ### .notPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
   *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
   *
   * @name notPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notPropertyVal, true)
      .to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a deep equality check.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepPropertyVal, true)
      .to.have.deep.property(prop, val);
  };

  /**
   * ### .notDeepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a deep equality check.
   *
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *
   * @name notDeepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepPropertyVal, true)
      .to.not.have.deep.property(prop, val);
  };

  /**
   * ### .ownProperty(object, property, [message])
   *
   * Asserts that `object` has a direct property named by `property`. Inherited
   * properties aren't checked.
   *
   *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name ownProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.ownProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.ownProperty, true)
      .to.have.own.property(prop);
  };

  /**
   * ### .notOwnProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by
   * `property`. Inherited properties aren't checked.
   *
   *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
   *     assert.notOwnProperty({}, 'toString');
   *
   * @name notOwnProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notOwnProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notOwnProperty, true)
      .to.not.have.own.property(prop);
  };

  /**
   * ### .ownPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a strict equality check (===).
   * Inherited properties aren't checked.
   *
   *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
   *
   * @name ownPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.ownPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.ownPropertyVal, true)
      .to.have.own.property(prop, value);
  };

  /**
   * ### .notOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a strict equality check
   * (===). Inherited properties aren't checked.
   *
   *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
   *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notOwnPropertyVal, true)
      .to.not.have.own.property(prop, value);
  };

  /**
   * ### .deepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a deep equality check. Inherited
   * properties aren't checked.
   *
   *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.deepOwnPropertyVal, true)
      .to.have.deep.own.property(prop, value);
  };

  /**
   * ### .notDeepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a deep equality check.
   * Inherited properties aren't checked.
   *
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notDeepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notDeepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true)
      .to.not.have.deep.own.property(prop, value);
  };

  /**
   * ### .nestedProperty(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`, which can be a string using dot- and bracket-notation for
   * nested reference.
   *
   *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name nestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.nestedProperty, true)
      .to.have.nested.property(prop);
  };

  /**
   * ### .notNestedProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for nested reference. The
   * property cannot exist on the object nor anywhere in its prototype chain.
   *
   *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notNestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notNestedProperty, true)
      .to.not.have.nested.property(prop);
  };

  /**
   * ### .nestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a strict equality check (===).
   *
   *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name nestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.nestedPropertyVal, true)
      .to.have.nested.property(prop, val);
  };

  /**
   * ### .notNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a strict equality check (===).
   *
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
   *
   * @name notNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notNestedPropertyVal, true)
      .to.not.have.nested.property(prop, val);
  };

  /**
   * ### .deepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with a value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a deep equality check.
   *
   *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
   *
   * @name deepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepNestedPropertyVal, true)
      .to.have.deep.nested.property(prop, val);
  };

  /**
   * ### .notDeepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a deep equality check.
   *
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
   *
   * @name notDeepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true)
      .to.not.have.deep.nested.property(prop, val);
  };

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` property with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 6, 'string has length of 6');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
  };

  /**
   * ### .hasAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
   *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAnyKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
  };

  /**
   * ### .hasAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
   *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
  };

  /**
   * ### .containsAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name containsAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllKeys, true)
      .to.contain.all.keys(keys);
  };

  /**
   * ### .doesNotHaveAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAnyKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true)
      .to.not.have.any.keys(keys);
  };

  /**
   * ### .doesNotHaveAllKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllKeys, true)
      .to.not.have.all.keys(keys);
  };

  /**
   * ### .hasAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyDeepKeys, true)
      .to.have.any.deep.keys(keys);
  };

 /**
   * ### .hasAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name hasAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllDeepKeys, true)
      .to.have.all.deep.keys(keys);
  };

 /**
   * ### .containsAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` contains all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name containsAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllDeepKeys, true)
      .to.contain.all.deep.keys(keys);
  };

 /**
   * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAnyDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true)
      .to.not.have.any.deep.keys(keys);
  };

 /**
   * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true)
      .to.not.have.all.deep.keys(keys);
  };

 /**
   * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
   * message matching `errMsgMatcher`.
   *
   *     assert.throws(fn, 'function throws a reference error');
   *     assert.throws(fn, /function throws a reference error/);
   *     assert.throws(fn, ReferenceError);
   *     assert.throws(fn, errorInstance);
   *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg');
   *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg');
   *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
   *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} fn
   * @param {ErrorConstructor|Error} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.throws = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var assertErr = new Assertion(fn, msg, assert.throws, true)
      .to.throw(errorLike, errMsgMatcher);
    return flag(assertErr, 'object');
  };

  /**
   * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
   * message matching `errMsgMatcher`.
   *
   *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
   *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
   *     assert.doesNotThrow(fn, Error);
   *     assert.doesNotThrow(fn, errorInstance);
   *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
   *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
   *     assert.doesNotThrow(fn, Error, /Error must not match this/);
   *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
   *
   * @name doesNotThrow
   * @param {Function} fn
   * @param {ErrorConstructor} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.doesNotThrow = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    new Assertion(fn, msg, assert.doesNotThrow, true)
      .to.not.throw(errorLike, errMsgMatcher);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    var ok;
    switch(operator) {
      case '==':
        ok = val == val2;
        break;
      case '===':
        ok = val === val2;
        break;
      case '>':
        ok = val > val2;
        break;
      case '>=':
        ok = val >= val2;
        break;
      case '<':
        ok = val < val2;
        break;
      case '<=':
        ok = val <= val2;
        break;
      case '!=':
        ok = val != val2;
        break;
      case '!==':
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ': ' : msg;
        throw new chai.AssertionError(
          msg + 'Invalid operator "' + operator + '"',
          undefined,
          assert.operator
        );
    }
    var test = new Assertion(ok, msg, assert.operator, true);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
  };

  /**
   * ### .approximately(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
   *
   * @name approximately
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.approximately = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.approximately, true)
      .to.be.approximately(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * strict equality check (===).
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameMembers, true)
      .to.have.same.members(set2);
  };

  /**
   * ### .notSameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a strict equality check (===).
   *
   *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
   *
   * @name notSameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameMembers, true)
      .to.not.have.same.members(set2);
  };

  /**
   * ### .sameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * deep equality check.
   *
   *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
   *
   * @name sameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepMembers, true)
      .to.have.same.deep.members(set2);
  };

  /**
   * ### .notSameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a deep equality check.
   *
   *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
   *
   * @name notSameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepMembers, true)
      .to.not.have.same.deep.members(set2);
  };

  /**
   * ### .sameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a strict equality check (===).
   *
   *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
   *
   * @name sameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameOrderedMembers, true)
      .to.have.same.ordered.members(set2);
  };

  /**
   * ### .notSameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a strict equality check (===).
   *
   *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
   *
   * @name notSameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameOrderedMembers, true)
      .to.not.have.same.ordered.members(set2);
  };

  /**
   * ### .sameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a deep equality check.
   *
   * assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
   *
   * @name sameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepOrderedMembers, true)
      .to.have.same.deep.ordered.members(set2);
  };

  /**
   * ### .notSameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a deep equality check.
   *
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
   *
   * @name notSameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true)
      .to.not.have.same.deep.ordered.members(set2);
  };

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeMembers, true)
      .to.include.members(subset);
  };

  /**
   * ### .notIncludeMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
   *
   * @name notIncludeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeMembers, true)
      .to.not.include.members(subset);
  };

  /**
   * ### .includeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a deep
   * equality check. Duplicates are ignored.
   *
   *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
   *
   * @name includeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepMembers, true)
      .to.include.deep.members(subset);
  };

  /**
   * ### .notIncludeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * deep equality check. Duplicates are ignored.
   *
   *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
   *
   * @name notIncludeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepMembers, true)
      .to.not.include.deep.members(subset);
  };

  /**
   * ### .includeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
   *
   * @name includeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeOrderedMembers, true)
      .to.include.ordered.members(subset);
  };

  /**
   * ### .notIncludeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
   *
   * @name notIncludeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeOrderedMembers, true)
      .to.not.include.ordered.members(subset);
  };

  /**
   * ### .includeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
   *
   * @name includeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepOrderedMembers, true)
      .to.include.deep.ordered.members(subset);
  };

  /**
   * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
   *
   * @name notIncludeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true)
      .to.not.include.deep.ordered.members(subset);
  };

  /**
   * ### .oneOf(inList, list, [message])
   *
   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
   *
   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
   *
   * @name oneOf
   * @param {*} inList
   * @param {Array<*>} list
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.oneOf = function (inList, list, msg) {
    new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
  };

  /**
   * ### .changes(function, object, property, [message])
   *
   * Asserts that a function changes the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 22 };
   *     assert.changes(fn, obj, 'val');
   *
   * @name changes
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changes = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
  };

   /**
   * ### .changesBy(function, object, property, delta, [message])
   *
   * Asserts that a function changes the value of a property by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 2 };
   *     assert.changesBy(fn, obj, 'val', 2);
   *
   * @name changesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesBy, true)
      .to.change(obj, prop).by(delta);
  };

   /**
   * ### .doesNotChange(function, object, property, [message])
   *
   * Asserts that a function does not change the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { console.log('foo'); };
   *     assert.doesNotChange(fn, obj, 'val');
   *
   * @name doesNotChange
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotChange = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotChange, true)
      .to.not.change(obj, prop);
  };

  /**
   * ### .changesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not change the value of a property or of a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.changesButNotBy(fn, obj, 'val', 5);
   *
   * @name changesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesButNotBy, true)
      .to.change(obj, prop).but.not.by(delta);
  };

  /**
   * ### .increases(function, object, property, [message])
   *
   * Asserts that a function increases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 13 };
   *     assert.increases(fn, obj, 'val');
   *
   * @name increases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.increases, true)
      .to.increase(obj, prop);
  };

  /**
   * ### .increasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function increases a numeric object property or a function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.increasesBy(fn, obj, 'val', 10);
   *
   * @name increasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesBy, true)
      .to.increase(obj, prop).by(delta);
  };

  /**
   * ### .doesNotIncrease(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 8 };
   *     assert.doesNotIncrease(fn, obj, 'val');
   *
   * @name doesNotIncrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotIncrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotIncrease, true)
      .to.not.increase(obj, prop);
  };

  /**
   * ### .increasesButNotBy(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property or function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.increasesButNotBy(fn, obj, 'val', 10);
   *
   * @name increasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesButNotBy, true)
      .to.increase(obj, prop).but.not.by(delta);
  };

  /**
   * ### .decreases(function, object, property, [message])
   *
   * Asserts that a function decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreases(fn, obj, 'val');
   *
   * @name decreases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.decreases, true)
      .to.decrease(obj, prop);
  };

  /**
   * ### .decreasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val -= 5 };
   *     assert.decreasesBy(fn, obj, 'val', 5);
   *
   * @name decreasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesBy, true)
      .to.decrease(obj, prop).by(delta);
  };

  /**
   * ### .doesNotDecrease(function, object, property, [message])
   *
   * Asserts that a function does not decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.doesNotDecrease(fn, obj, 'val');
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecrease, true)
      .to.not.decrease(obj, prop);
  };

  /**
   * ### .doesNotDecreaseBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.doesNotDecreaseBy(fn, obj, 'val', 1);
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecreaseBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecreaseBy, true)
      .to.not.decrease(obj, prop).by(delta);
  };

  /**
   * ### .decreasesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreasesButNotBy(fn, obj, 'val', 1);
   *
   * @name decreasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesButNotBy, true)
      .to.decrease(obj, prop).but.not.by(delta);
  };

  /*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */

  assert.ifError = function (val) {
    if (val) {
      throw(val);
    }
  };

  /**
   * ### .isExtensible(object)
   *
   * Asserts that `object` is extensible (can have new properties added to it).
   *
   *     assert.isExtensible({});
   *
   * @name isExtensible
   * @alias extensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
  };

  /**
   * ### .isNotExtensible(object)
   *
   * Asserts that `object` is _not_ extensible.
   *
   *     var nonExtensibleObject = Object.preventExtensions({});
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     assert.isNotExtensible(nonExtensibleObject);
   *     assert.isNotExtensible(sealedObject);
   *     assert.isNotExtensible(frozenObject);
   *
   * @name isNotExtensible
   * @alias notExtensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
  };

  /**
   * ### .isSealed(object)
   *
   * Asserts that `object` is sealed (cannot have new properties added to it
   * and its existing properties cannot be removed).
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.seal({});
   *
   *     assert.isSealed(sealedObject);
   *     assert.isSealed(frozenObject);
   *
   * @name isSealed
   * @alias sealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
  };

  /**
   * ### .isNotSealed(object)
   *
   * Asserts that `object` is _not_ sealed.
   *
   *     assert.isNotSealed({});
   *
   * @name isNotSealed
   * @alias notSealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
  };

  /**
   * ### .isFrozen(object)
   *
   * Asserts that `object` is frozen (cannot have new properties added to it
   * and its existing properties cannot be modified).
   *
   *     var frozenObject = Object.freeze({});
   *     assert.frozen(frozenObject);
   *
   * @name isFrozen
   * @alias frozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
  };

  /**
   * ### .isNotFrozen(object)
   *
   * Asserts that `object` is _not_ frozen.
   *
   *     assert.isNotFrozen({});
   *
   * @name isNotFrozen
   * @alias notFrozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
  };

  /**
   * ### .isEmpty(target)
   *
   * Asserts that the target does not contain any values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isEmpty([]);
   *     assert.isEmpty('');
   *     assert.isEmpty(new Map);
   *     assert.isEmpty({});
   *
   * @name isEmpty
   * @alias empty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
  };

  /**
   * ### .isNotEmpty(target)
   *
   * Asserts that the target contains values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isNotEmpty([1, 2]);
   *     assert.isNotEmpty('34');
   *     assert.isNotEmpty(new Set([5, 6]));
   *     assert.isNotEmpty({ key: 7 });
   *
   * @name isNotEmpty
   * @alias notEmpty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('isOk', 'ok')
  ('isNotOk', 'notOk')
  ('throws', 'throw')
  ('throws', 'Throw')
  ('isExtensible', 'extensible')
  ('isNotExtensible', 'notExtensible')
  ('isSealed', 'sealed')
  ('isNotSealed', 'notSealed')
  ('isFrozen', 'frozen')
  ('isNotFrozen', 'notFrozen')
  ('isEmpty', 'empty')
  ('isNotEmpty', 'notEmpty');
};

var chai$2 = createCommonjsModule(function (module, exports) {
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];

/*!
 * Chai version
 */

exports.version = '4.1.2';

/*!
 * Assertion Error
 */

exports.AssertionError = assertionError;

/*!
 * Utils for plugins (not exported)
 */



/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(exports, utils);
    used.push(fn);
  }

  return exports;
};

/*!
 * Utility Functions
 */

exports.util = utils;

/*!
 * Configuration
 */


exports.config = config;

/*!
 * Primary `Assertion` prototype
 */


exports.use(assertion);

/*!
 * Core Assertions
 */


exports.use(assertions);

/*!
 * Expect interface
 */


exports.use(expect);

/*!
 * Should interface
 */


exports.use(should);

/*!
 * Assert interface
 */


exports.use(assert);
});

var chai = chai$2;

var chai_1 = chai.expect;

var M = {
    num: 1,
    nul: null,
    undef: void 0,
    obj: { hi: 'there' },
    fun: function () { },
    arr: [],
    fwd: function (arr) { arr.push("M"); },
    bck: function (arr) { arr.push("M"); }
};
var C = (function () {
    function C() {
    }
    C.prototype.b = function () { };
    C.prototype.fwd = function (arr) { arr.push("C"); };
    C.prototype.bck = function (arr) { arr.push("C"); };
    C.a = 1;
    return C;
}());
describe("Forward declarations", function () {
    it('@predefine calls onExtend hook', function () {
        var called = 0;
        var X = (function () {
            function X() {
            }
            X.onExtend = function (BaseClass) {
                chai_1(BaseClass).to.eql(Object);
                called++;
            };
            X = __decorate([
                predefine
            ], X);
            return X;
        }());
        chai_1(called).to.eql(1);
    });
});
describe("@define decorator", function () {
    it('@define makes plain class mixable', function () {
        var X = (function () {
            function X() {
            }
            X = __decorate([
                define
            ], X);
            return X;
        }());
        chai_1(X.define).to.exist;
    });
    it('@define calls onDefine hook', function () {
        var called = 0;
        var X = (function () {
            function X() {
            }
            X.onDefine = function (spec, BaseClass) {
                called++;
                chai_1(spec).to.eql({});
                chai_1(BaseClass).to.eql(Object);
            };
            X = __decorate([
                define({ a: 1 })
            ], X);
            return X;
        }());
        chai_1(X.define).to.exist;
        chai_1(called).to.eql(1);
    });
    it('@define does nothing when extend mixable', function () {
        var X = (function (_super) {
            __extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X = __decorate([
                define
            ], X);
            return X;
        }(Mixable));
        chai_1(X.__super__).to.eql(Mixable.prototype);
    });
    it('@define( props ) assign members to class proto', function () {
        var X = (function () {
            function X() {
            }
            X.prototype.a = function () { };
            X = __decorate([
                define({
                    a: 1,
                    b: 2
                })
            ], X);
            return X;
        }());
        chai_1(X.prototype.b).to.eql(2);
        chai_1(X.prototype.a).to.eql(1);
    });
    it('Mixable.extend creates the subclass', function () {
        var X = Mixable.extend({ a: 5 });
        var x = new X();
        chai_1(x.a).to.eql(5);
        chai_1(x).to.be.instanceof(Mixable);
    });
    it('allows toString() and valueOf() override', function () {
        var Base = (function (_super) {
            __extends(Base, _super);
            function Base() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Base.prototype.toString = function () { return "base"; };
            Base.prototype.valueOf = function () { return 'base'; };
            Base = __decorate([
                define
            ], Base);
            return Base;
        }(Mixable));
        var Sub = (function (_super) {
            __extends(Sub, _super);
            function Sub() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Sub.prototype.toString = function () { return "sub"; };
            Sub.prototype.valueOf = function () { return 'sub'; };
            Sub = __decorate([
                define
            ], Sub);
            return Sub;
        }(Base));
        var base = new Base(), sub = new Sub();
        chai_1(base.toString()).to.eql('base');
        chai_1(base.valueOf()).to.eql('base');
        chai_1(sub.toString()).to.eql('sub');
        chai_1(sub.valueOf()).to.eql('sub');
    });
    it('allows toString() and valueOf() override with .extend()', function () {
        var Base = Mixable.extend({
            toString: function () { return "base"; },
            valueOf: function () { return 'base'; }
        });
        var Sub = Base.extend({
            toString: function () { return "sub"; },
            valueOf: function () { return 'sub'; }
        });
        var base = new Base(), sub = new Sub();
        chai_1(base.toString()).to.eql('base');
        chai_1(base.valueOf()).to.eql('base');
        chai_1(sub.toString()).to.eql('sub');
        chai_1(sub.valueOf()).to.eql('sub');
    });
    it("gives priority to the class definition", function () {
        var X = (function (_super) {
            __extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X.prototype.nul = function () { };
            X = __decorate([
                define({
                    undef: 1
                }),
                mixins(M)
            ], X);
            return X;
        }(Mixable));
        chai_1(X.prototype.nul).to.be.instanceof(Function);
        chai_1(X.prototype.undef).to.be.eql(1);
    });
});
describe('@mixins', function () {
    it("merges in the plain objects", function () {
        var X = (function (_super) {
            __extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X = __decorate([
                define,
                mixins(M)
            ], X);
            return X;
        }(Mixable));
        chai_1(X.prototype).to.contain(M);
    });
    it("don't merge same mixin twice", function () {
        var X = (function (_super) {
            __extends(X, _super);
            function X() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            X = __decorate([
                define,
                mixins(M, M)
            ], X);
            return X;
        }(Mixable));
        chai_1(X.mixins.appliedMixins.length).to.equal(1);
        var Y = (function (_super) {
            __extends(Y, _super);
            function Y() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Y = __decorate([
                define, mixins(M)
            ], Y);
            return Y;
        }(X));
        chai_1(Y.mixins.appliedMixins.length).to.equal(1);
    });
    it("mix in classes", function () {
        var X = (function () {
            function X() {
            }
            X = __decorate([
                define, mixins(C)
            ], X);
            return X;
        }());
        var x = new X();
        chai_1(X.a).to.eql(1);
        chai_1(x.b).to.be.instanceof(Function);
    });
    it("mix in sequence", function () {
        var A = { a: 1, b: 1 }, B = { a: 2 };
        var X = (function () {
            function X() {
            }
            X = __decorate([
                define, mixins(B, A)
            ], X);
            return X;
        }());
        var x = new X();
        chai_1(x.a).to.eql(2);
        chai_1(x.b).to.eql(1);
    });
    it('merge methods from mixin if they are not locally defined', function () {
        var Base = (function () {
            function Base() {
            }
            Base.prototype.first = function () { };
            Base = __decorate([
                define
            ], Base);
            return Base;
        }());
        var Mix = {
            first: function () { },
            second: function () { }
        };
        var Y = (function (_super) {
            __extends(Y, _super);
            function Y() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Y.prototype.second = function () { };
            Y = __decorate([
                define, mixins(Mix)
            ], Y);
            return Y;
        }(Base));
        chai_1(Y.prototype.second).to.not.eql(Mix.second);
        chai_1(Y.prototype.first).to.eql(Mix.first);
    });
});
describe('mixin rules', function () {
    var X = (function () {
        function X() {
        }
        X = __decorate([
            define,
            mixins(M, C),
            mixinRules({
                fwd: mixinRules.classFirst,
                bck: mixinRules.classLast
            })
        ], X);
        return X;
    }());
    it('chains functions when merge rules are defined', function () {
        var x = new X();
        var fwda = [], bcka = [];
        x.fwd(fwda);
        chai_1(fwda).to.have.ordered.members(["M", "C"]);
        x.bck(bcka);
        chai_1(bcka).to.have.ordered.members(["C", "M"]);
    });
    it('chains function on inheritance', function () {
        var Y = (function (_super) {
            __extends(Y, _super);
            function Y() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Y.prototype.fwd = function (arr) { arr.push('Y'); };
            Y.prototype.bck = function (arr) { arr.push('Y'); };
            Y = __decorate([
                define,
                mixins({
                    fwd: function (arr) { arr.push('Z'); },
                    bck: function (arr) { arr.push('Z'); }
                })
            ], Y);
            return Y;
        }(X));
        var y = new Y();
        var fwda = [], bcka = [];
        y.fwd(fwda);
        chai_1(fwda).to.have.ordered.members(["Y", "Z", "M", "C"]);
        y.bck(bcka);
        chai_1(bcka).to.have.ordered.members(["C", "M", "Z", "Y"]);
    });
});
describe('@definitions', function () {
    it('extract definitions from statics', function () {
        var Y = (function () {
            function Y() {
            }
            Y.onDefine = function (spec) {
                chai_1(spec).to.deep.equal({ a: 'a', b: { a: 1 } });
                this.prototype.zzz = 'Hurrah!';
            };
            Y.a = 'a';
            Y.b = { a: 1 };
            Y = __decorate([
                define,
                definitions({
                    a: mixinRules.value,
                    b: mixinRules.merge
                })
            ], Y);
            return Y;
        }());
    });
    it('extract definitions from @define parameter', function () {
        var Y = (function () {
            function Y() {
            }
            Y.onDefine = function (spec) {
                chai_1(spec).to.deep.equal({ a: 'a', b: { a: 1 } });
                this.prototype.zzz = 'Hurrah!';
            };
            Y = __decorate([
                define({
                    a: 'a',
                    b: { a: 1 }
                }),
                definitions({
                    a: mixinRules.value,
                    b: mixinRules.merge
                })
            ], Y);
            return Y;
        }());
    });
    it('extract definitions from mixins', function () {
        var Y = (function () {
            function Y() {
            }
            Y.onDefine = function (spec) {
                chai_1(spec).to.deep.equal({ a: 'a', b: { a: 1, b: 1, c: 1 } });
                this.prototype.zzz = 'Hurrah!';
            };
            Y.b = { c: 1 };
            Y = __decorate([
                define({
                    a: 'a',
                    b: { a: 1 }
                }),
                mixins({
                    a: 'no',
                    b: { b: 1, a: 2 }
                }),
                definitions({
                    a: mixinRules.value,
                    b: mixinRules.merge
                })
            ], Y);
            return Y;
        }());
    });
});

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect$1;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Symbol support
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var HashMap;
    (function (HashMap) {
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        HashMap.create = supportsCreate
            ? function () { return MakeDictionary(Object.create(null)); }
            : supportsProto
                ? function () { return MakeDictionary({ __proto__: null }); }
                : function () { return MakeDictionary({}); };
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param propertyKey (Optional) The property key to decorate.
      * @param attributes (Optional) The property descriptor for the target key.
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                throw new TypeError();
            if (IsNull(attributes))
                attributes = undefined;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param propertyKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
            if (!Create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
            if (!Create)
                return undefined;
            metadataMap = new _Map();
            targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
    }
    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
    }
    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        return ToBoolean(metadataMap.has(MetadataKey));
    }
    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        return undefined;
    }
    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return undefined;
        return metadataMap.get(MetadataKey);
    }
    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
    function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
                keys.length = k;
                return keys;
            }
            var nextValue = IteratorValue(next);
            try {
                keys[k] = nextValue;
            }
            catch (e) {
                try {
                    IteratorClose(iterator);
                }
                finally {
                    throw e;
                }
            }
            k++;
        }
    }
    // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
    function Type(x) {
        if (x === null)
            return 1 /* Null */;
        switch (typeof x) {
            case "undefined": return 0 /* Undefined */;
            case "boolean": return 2 /* Boolean */;
            case "string": return 3 /* String */;
            case "symbol": return 4 /* Symbol */;
            case "number": return 5 /* Number */;
            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
            default: return 6 /* Object */;
        }
    }
    // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
    function IsNull(x) {
        return x === null;
    }
    // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive
    function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
            case 0 /* Undefined */: return input;
            case 1 /* Null */: return input;
            case 2 /* Boolean */: return input;
            case 3 /* String */: return input;
            case 4 /* Symbol */: return input;
            case 5 /* Number */: return input;
        }
        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
                throw new TypeError();
            return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
    function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
                var result = toString_1.call(O);
                if (!IsObject(result))
                    return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
                var result = toString_2.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        throw new TypeError();
    }
    // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean
    function ToBoolean(argument) {
        return !!argument;
    }
    // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring
    function ToString(argument) {
        return "" + argument;
    }
    // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey
    function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3 /* String */);
        if (IsSymbol(key))
            return key;
        return ToString(key);
    }
    // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray
    function IsArray(argument) {
        return Array.isArray
            ? Array.isArray(argument)
            : argument instanceof Object
                ? argument instanceof Array
                : Object.prototype.toString.call(argument) === "[object Array]";
    }
    // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable
    function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return typeof argument === "function";
    }
    // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor
    function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return typeof argument === "function";
    }
    // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey
    function IsPropertyKey(argument) {
        switch (Type(argument)) {
            case 3 /* String */: return true;
            case 4 /* Symbol */: return true;
            default: return false;
        }
    }
    // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod
    function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null)
            return undefined;
        if (!IsCallable(func))
            throw new TypeError();
        return func;
    }
    // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
    function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
            throw new TypeError(); // from Call
        var iterator = method.call(obj);
        if (!IsObject(iterator))
            throw new TypeError();
        return iterator;
    }
    // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
    function IteratorValue(iterResult) {
        return iterResult.value;
    }
    // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
    }
    // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
    function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (function () {
            function MapIterator(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
            }
            MapIterator.prototype["@@iterator"] = function () { return this; };
            MapIterator.prototype[iteratorSymbol] = function () { return this; };
            MapIterator.prototype.next = function () {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    else {
                        this._index++;
                    }
                    return { value: result, done: false };
                }
                return { value: undefined, done: true };
            };
            MapIterator.prototype.throw = function (error) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                throw error;
            };
            MapIterator.prototype.return = function (value) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                return { value: value, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (key === this._cacheKey) {
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
            Map.prototype["@@iterator"] = function () { return this.entries(); };
            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey !== key) {
                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                }
                if (this._cacheIndex < 0 && insert) {
                    this._cacheIndex = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheIndex;
            };
            return Map;
        }());
        function getKey(key, _) {
            return key;
        }
        function getValue(_, value) {
            return value;
        }
        function getEntry(key, value) {
            return [key, value];
        }
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            Set.prototype["@@iterator"] = function () { return this.keys(); };
            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
            return Set;
        }());
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        }());
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
        typeof self !== "undefined" ? self :
            Function("return this;")());
})(Reflect$1 || (Reflect$1 = {}));

describe('Record', function () {
    it("can be instantiated", function () {
        new Record();
    });
    describe('Subclass', function () {
        it("attaches properties to prototype", function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = __decorate([
                    define({
                        a: 'a'
                    })
                ], M);
                return M;
            }(Record));
            chai_1(M.prototype.a).to.eql('a');
        });
    });
    describe("Attribute spec", function () {
        describe('...as constructors', function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    attr(String),
                    __metadata("design:type", Object)
                ], M.prototype, "s", void 0);
                __decorate([
                    attr(Number),
                    __metadata("design:type", Object)
                ], M.prototype, "n", void 0);
                __decorate([
                    attr(Boolean),
                    __metadata("design:type", Object)
                ], M.prototype, "b", void 0);
                __decorate([
                    attr(Object),
                    __metadata("design:type", Object)
                ], M.prototype, "o", void 0);
                __decorate([
                    attr(Array),
                    __metadata("design:type", Object)
                ], M.prototype, "a", void 0);
                __decorate([
                    attr,
                    __metadata("design:type", Date)
                ], M.prototype, "d", void 0);
                M = __decorate([
                    define
                ], M);
                return M;
            }(Record));
            it("invokes constructor to create defaults", function () {
                var m = new M();
                chai_1(m.s).to.equal('');
                chai_1(m.n).to.equal(0);
                chai_1(m.b).to.equal(false);
                chai_1(m.o).to.eql({});
                chai_1(m.a).to.eql([]);
                chai_1(m.d).to.be.instanceof(Date);
            });
            it("convert values to defined type in 'new'", function () {
                var m = new M({
                    s: 55,
                    n: "1",
                    b: 'not bool',
                    o: "not an object",
                    a: "not an array",
                    d: 678678678
                });
                chai_1(m.s).to.equal('55');
                chai_1(m.n).to.equal(1);
                chai_1(m.b).to.equal(true);
                chai_1(m.o).to.be.an.instanceOf(Object);
                chai_1(m.a).to.eql([]);
                chai_1(m.d).to.be.instanceof(Date);
            });
            it("convert values to defined types on assignment", function () {
                var m = new M();
                m.s = 55;
                m.n = "1";
                m.b = 'not bool';
                m.o = "not an object";
                m.a = "not an array";
                m.d = 678678678;
                chai_1(m.s).to.equal('55');
                chai_1(m.n).to.equal(1);
                chai_1(m.b).to.equal(true);
                chai_1(m.o).to.be.an.instanceOf(Object);
                chai_1(m.a).to.eql([]);
                chai_1(m.d).to.be.instanceof(Date);
            });
            it("convert values to defined types on set", function () {
                var m = new M();
                m.set({
                    s: 55,
                    n: "1",
                    b: 'not bool',
                    o: "not an object",
                    a: "not an array",
                    d: 678678678
                });
                chai_1(m.s).to.equal('55');
                chai_1(m.n).to.equal(1);
                chai_1(m.b).to.equal(true);
                chai_1(m.o).to.be.an.instanceOf(Object);
                chai_1(m.a).to.eql([]);
                chai_1(m.d).to.be.instanceof(Date);
            });
        });
        describe('...as default values', function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.s = 'b';
                    _this.n = 1;
                    _this.b = true;
                    _this.o = {};
                    _this.a = [];
                    return _this;
                }
                __decorate([
                    attr,
                    __metadata("design:type", String)
                ], M.prototype, "s", void 0);
                __decorate([
                    attr,
                    __metadata("design:type", Number)
                ], M.prototype, "n", void 0);
                __decorate([
                    attr,
                    __metadata("design:type", Boolean)
                ], M.prototype, "b", void 0);
                __decorate([
                    attr,
                    __metadata("design:type", Object)
                ], M.prototype, "o", void 0);
                __decorate([
                    attr,
                    __metadata("design:type", Array)
                ], M.prototype, "a", void 0);
                __decorate([
                    attr,
                    __metadata("design:type", Date)
                ], M.prototype, "d", void 0);
                M = __decorate([
                    define
                ], M);
                return M;
            }(Record));
            it("accepts values as type spec", function () {
                var m = new M();
                chai_1(m.s).to.equal('b');
                chai_1(m.n).to.equal(1);
                chai_1(m.b).to.equal(true);
                chai_1(m.o).to.not.equal({});
                chai_1(m.o).to.be.an.instanceOf(Object);
                chai_1(m.a).to.not.equal([]);
                chai_1(m.a).to.eql([]);
                chai_1(m.d).to.be.instanceof(Date);
            });
            it("infers types from values", function () {
                var m = new M(), _attributes = m._attributes;
                chai_1(_attributes.s.type).to.equal(String);
                chai_1(_attributes.n.type).to.equal(Number);
                chai_1(_attributes.b.type).to.equal(Boolean);
                chai_1(_attributes.o.type).to.equal(Object);
                chai_1(_attributes.a.type).to.equal(Array);
                chai_1(_attributes.d.type).to.equal(Date);
            });
        });
        describe('...as constructors with values', function () {
            it("converts default values to defined types", function () {
                var M = (function (_super) {
                    __extends(M, _super);
                    function M() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    M = __decorate([
                        define({
                            attributes: {
                                s: String.value(55),
                                n: Number.value("1"),
                                b: Boolean.value("some"),
                                o: Object.value("not an object"),
                                a: Array.value("not an array"),
                                d: Date.value(22222)
                            }
                        })
                    ], M);
                    return M;
                }(Record));
                var m = new M();
                chai_1(m.s).to.equal('55');
                chai_1(m.n).to.equal(1);
                chai_1(m.b).to.equal(true);
                chai_1(m.o).to.be.an.instanceOf(Object);
                chai_1(m.a).to.eql([]);
                chai_1(m.d).to.be.instanceof(Date);
            });
            it("accepts null as default value", function () {
                var M = (function (_super) {
                    __extends(M, _super);
                    function M() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    M = __decorate([
                        define({
                            attributes: {
                                s: String.value(null),
                                n: Number.value(null),
                                b: Boolean.value(null),
                                o: Object.value(null),
                                a: Array.value(null),
                                d: Date.value(null)
                            }
                        })
                    ], M);
                    return M;
                }(Record));
                var m = new M();
                chai_1(m.s).to.equal(null);
                chai_1(m.n).to.equal(null);
                chai_1(m.b).to.equal(null);
                chai_1(m.o).to.eql(null);
                chai_1(m.a).to.eql(null);
                chai_1(m.d).to.eql(null);
            });
        });
    });
    describe("Record's collection", function () {
        it("is defined in the base Record", function () {
            chai_1(Record.Collection).to.be.a('function');
            chai_1(Record.Collection.prototype.model).to.eql(Record);
        });
        it("is created on Record's extension", function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = __decorate([
                    define
                ], M);
                return M;
            }(Record));
            var prototype = M.Collection.prototype;
            chai_1(prototype).to.be.instanceof(Record.Collection);
            chai_1(prototype.model).to.eql(M);
        });
        it("takes properties from .collection", function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = __decorate([
                    define({
                        collection: {
                            a: 'a'
                        }
                    })
                ], M);
                return M;
            }(Record));
            chai_1(M.Collection.prototype.a).to.eql('a');
        });
        it("can be defined separately", function () {
            var C = (function (_super) {
                __extends(C, _super);
                function C() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                C = __decorate([
                    define({
                        a: 'a'
                    })
                ], C);
                return C;
            }(Collection));
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M.Collection = C;
                M = __decorate([
                    define
                ], M);
                return M;
            }(Record));
            chai_1(M.Collection).to.equal(C);
            var prototype = M.Collection.prototype;
            chai_1(prototype).to.be.instanceof(Record.Collection);
            chai_1(prototype.a).to.eql('a');
            chai_1(prototype.model).to.eql(M);
        });
    });
    describe('Attribute types', function () {
        var Test = (function (_super) {
            __extends(Test, _super);
            function Test() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
                attr(Function.value(null)),
                __metadata("design:type", Function)
            ], Test.prototype, "fun", void 0);
            Test = __decorate([
                define
            ], Test);
            return Test;
        }(Record));
        it('Supports function type', function () {
            var t = new Test();
            var t2 = t.clone();
            console.log('!!!', t._attributes);
            chai_1(t.fun).to.eql(t2.fun);
        });
    });
    describe('Record pre-definition', function () {
        var M1 = (function (_super) {
            __extends(M1, _super);
            function M1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            M1 = __decorate([
                define
            ], M1);
            return M1;
        }(Record));
        var M2 = (function (_super) {
            __extends(M2, _super);
            function M2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            M2 = __decorate([
                predefine
            ], M2);
            return M2;
        }(Record));
        M2.define();
        it('predefine collection types', function () {
            chai_1(M1.Collection).to.be.instanceOf(Function);
            chai_1(M2.Collection).to.be.instanceOf(Function);
        });
        it("can't be instantiated", function () {
            new M1();
        });
        it('support forward declaration', function () {
            var M = (function (_super) {
                __extends(M, _super);
                function M() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                M = __decorate([
                    define
                ], M);
                return M;
            }(Record));
            chai_1(M.Collection).to.be.a('function');
            chai_1(M.Collection.prototype.model).to.eql(M);
            M.define({
                a: 'a'
            });
            chai_1(M.prototype.a).to.eql('a');
        });
        it('can be defined', function () {
            M1.define({
                a: 'first',
                collection: {
                    b: 'second'
                }
            });
            M2.define({
                a: 'first'
            });
            M2.Collection.define({
                b: 'second'
            });
        });
    });
});

var SecondsInterval = Record.extend({
    units: [
        'seconds',
        'minutes',
        'hours',
        'days',
        'weeks',
        'months',
        'years'
    ],
    defaults: {
        value: 1,
        interval: String.value('months')
    },
    properties: {
        seconds: function () { return this.getUnitValue(1); },
        minutes: function () { return this.getUnitValue(60); },
        hours: function () { return this.getUnitValue(3600); },
        days: function () { return this.getUnitValue(86400); },
        weeks: function () { return this.getUnitValue(604800); },
        months: function () { return this.getUnitValue(2628000); },
        years: function () { return this.getUnitValue(31536000); }
    },
    getUnitValue: function (value$$1) {
        return value$$1;
    },
    parse: function (data) {
        var res = {
            value: 1,
            interval: 'months'
        };
        data = typeof data === 'object' ? 0 : data;
        for (var i = this.units.length; i > 0; i--) {
            var l = this.units[i - 1];
            if (data % this[l] == 0) {
                res.value = Math.floor(data / this[l]);
                res.interval = l;
                return res;
            }
        }
        return res;
    },
    toInteger: function () {
        return this.value * this[this.interval];
    },
    toJSON: function () {
        return this.toInteger();
    },
    getUnits: function () {
        var _this = this;
        var units = {};
        Object.keys(this.units).forEach(function (name) {
            units[name] = _this[name];
        });
        return units;
    }
});
var MinutesInterval = SecondsInterval.extend({
    units: [
        'minutes',
        'hours',
        'days',
        'weeks',
        'months',
        'years'
    ],
    getUnitValue: function (value$$1) {
        return value$$1 / 60;
    },
});

describe('Bugs from Volicon Observer', function () {
    describe('Attribute change watcher', function () {
        it('works in base class and subclass', function () {
            var calls = [];
            var Base = (function (_super) {
                __extends(Base, _super);
                function Base() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    attr(String.has.watcher(function (x) { return calls.push('inherited'); })),
                    __metadata("design:type", String)
                ], Base.prototype, "inherited", void 0);
                __decorate([
                    attr(String.has.watcher('onNamedWatcher')),
                    __metadata("design:type", String)
                ], Base.prototype, "namedWatcher", void 0);
                __decorate([
                    attr(String.has.watcher(function (x) { return calls.push('base'); })),
                    __metadata("design:type", String)
                ], Base.prototype, "overriden", void 0);
                Base = __decorate([
                    define
                ], Base);
                return Base;
            }(Record));
            var Subclass = (function (_super) {
                __extends(Subclass, _super);
                function Subclass() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Subclass.prototype.onNamedWatcher = function () {
                    calls.push('named');
                };
                __decorate([
                    attr(String.has.watcher(function (x) { return calls.push('added'); })),
                    __metadata("design:type", String)
                ], Subclass.prototype, "added", void 0);
                __decorate([
                    attr(String.has.watcher(function (x) { return calls.push('subclass'); })),
                    __metadata("design:type", String)
                ], Subclass.prototype, "overriden", void 0);
                Subclass = __decorate([
                    define
                ], Subclass);
                return Subclass;
            }(Base));
            var subclass = new Subclass();
            subclass.inherited = "a";
            subclass.added = "b";
            subclass.overriden = "b";
            subclass.namedWatcher = "t";
            chai_1(calls).to.eql(['inherited', 'added', 'subclass', 'base', 'named']);
        });
    });
    describe('Validation', function () {
        it('performs validation if collection item is changed', function () {
            var BitrateModel = Record.extend({
                defaults: {
                    bitrate: Number.value(512)
                },
                properties: {
                    bitrates: function () {
                        var available_bitrate = [128, 256, 384, 450, 512, 768, 896, 1000, 1500, 2000, 2500, 3000, 4500, 6000, 6500, 9000, 12000, 15000];
                        if (available_bitrate.indexOf(this.bitrate) === -1) {
                            available_bitrate.push(this.bitrate);
                        }
                        return available_bitrate.sort(function (a, b) {
                            return a - b;
                        });
                    }
                },
                initialize: function (options) {
                    Record.prototype.initialize.apply(this, arguments);
                },
                parse: function (data) {
                    return { bitrate: data / 1000 };
                },
                toJSON: function () {
                    var json = Record.prototype.toJSON.apply(this, arguments), bitrate = json.bitrate * 1000;
                    return bitrate;
                }
            });
            var SubEncoder = Record.extend({
                defaults: {
                    Bitrate: BitrateModel,
                    HistoryDepth: MinutesInterval.has.value(43800),
                    BitrateAsString: null,
                    ResolutionHeight: Number,
                    ResolutionWidth: Number,
                    resolution: String.has.toJSON(false)
                },
                collection: {
                    get: function (a) {
                        return Collection.prototype.get.apply(this, arguments) || this.models[a];
                    },
                    comparator: function (model1, model2) {
                        if (model1.Bitrate.bitrate > model2.Bitrate.bitrate) {
                            return 1;
                        }
                        else if (model1.Bitrate.bitrate < model2.Bitrate.bitrate) {
                            return -1;
                        }
                        else {
                            if (model1.ResolutionWidth > model2.ResolutionWidth) {
                                return 1;
                            }
                            else if (model1.ResolutionWidth < model2.ResolutionWidth) {
                                return -1;
                            }
                            else {
                                if (model1.ResolutionHeight > model2.ResolutionHeight) {
                                    return 1;
                                }
                                else if (model1.ResolutionHeight < model2.ResolutionHeight) {
                                    return -1;
                                }
                                else {
                                    return 0;
                                }
                            }
                        }
                    },
                    localEvents: {
                        change: function () {
                            this.sort();
                        }
                    }
                }
            });
            var Placeholder = Record.extend({
                attributes: {
                    subEncoders: SubEncoder.Collection.has.check(function (x) {
                        console.log('SubEncoders', this, x);
                        return x.length > 0;
                    }, 'ccccc')
                }
            });
            var p = new Placeholder(), subEncoders = p.subEncoders;
            chai_1(p.isValid()).to.be.false;
            chai_1(subEncoders.isValid()).to.be.true;
            subEncoders.add({});
            chai_1(p._validationError).to.be.undefined;
            chai_1(p.isValid()).to.be.true;
            subEncoders.first().HistoryDepth.value = 2;
            chai_1(p._validationError).to.be.undefined;
            chai_1(p.isValid()).to.be.true;
            chai_1(subEncoders.isValid()).to.be.true;
            chai_1(p._validationError).not.to.be.undefined;
        });
    });
    describe('assignFrom', function () {
        it('copy the value if the target is null', function () {
            var Inner = (function (_super) {
                __extends(Inner, _super);
                function Inner() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    attr,
                    __metadata("design:type", String)
                ], Inner.prototype, "name", void 0);
                Inner = __decorate([
                    define
                ], Inner);
                return Inner;
            }(Record));
            var Test = (function (_super) {
                __extends(Test, _super);
                function Test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                    attr(Inner.value(null)),
                    __metadata("design:type", Inner)
                ], Test.prototype, "inner", void 0);
                Test = __decorate([
                    define
                ], Test);
                return Test;
            }(Record));
            var target = new Test(), source = new Test({ inner: { name: "ron" } });
            chai_1(target.inner).to.be.null;
            target.assignFrom(source);
            chai_1(target.inner !== source.inner).to.be.true;
            console.log(target.inner.cid, source.inner.cid);
        });
    });
});

function create(init, delay) {
    if (init === void 0) { init = []; }
    if (delay === void 0) { delay = 50; }
    return new MemoryEndpoint(init, delay);
}
var MemoryEndpoint = (function () {
    function MemoryEndpoint(init, delay) {
        this.delay = delay;
        this.index = [0];
        this.items = {};
        for (var _i = 0, init_1 = init; _i < init_1.length; _i++) {
            var obj = init_1[_i];
            this.create(obj, {});
        }
    }
    MemoryEndpoint.prototype.resolve = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return resolve(value); }, _this.delay);
        });
    };
    MemoryEndpoint.prototype.reject = function (value) {
        var _this = this;
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return reject(value); }, _this.delay);
        });
    };
    MemoryEndpoint.prototype.generateId = function () {
        return String(this.index[0]++);
    };
    MemoryEndpoint.prototype.create = function (json, options) {
        var id = json.id = this.generateId();
        this.index.push(id);
        this.items[id] = json;
        return this.resolve({ id: id });
    };
    MemoryEndpoint.prototype.update = function (id, json, options) {
        var existing = this.items[id];
        if (existing) {
            this.items[id] = json;
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    MemoryEndpoint.prototype.read = function (id, options) {
        var existing = this.items[id];
        return existing ?
            this.resolve(existing) :
            this.reject("Not found");
    };
    MemoryEndpoint.prototype.destroy = function (id, options) {
        var existing = this.items[id];
        if (existing) {
            delete this.items[id];
            this.index = this.index.filter(function (x) { return x !== id; });
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    MemoryEndpoint.prototype.list = function (options) {
        var _this = this;
        return this.resolve(this.index.slice(1).map(function (id) { return _this.items[id]; }));
    };
    MemoryEndpoint.prototype.subscribe = function (events) { };
    MemoryEndpoint.prototype.unsubscribe = function (events) { };
    return MemoryEndpoint;
}());

function create$1(key) {
    return new LocalStorageEndpoint(key);
}
var LocalStorageEndpoint = (function () {
    function LocalStorageEndpoint(key) {
        this.key = key;
    }
    LocalStorageEndpoint.prototype.resolve = function (value) {
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () {
                resolve(value);
            }, 0);
        });
    };
    LocalStorageEndpoint.prototype.reject = function (value) {
        return createIOPromise(function (resolve, reject) {
            setTimeout(function () { return reject(value); }, 0);
        });
    };
    LocalStorageEndpoint.prototype.create = function (json, options) {
        var index = this.index;
        index.push(json.id = String(index[0]++));
        this.index = index;
        this.set(json);
        return this.resolve({ id: json.id });
    };
    LocalStorageEndpoint.prototype.set = function (json) {
        localStorage.setItem(this.key + '#' + json.id, JSON.stringify(json));
    };
    LocalStorageEndpoint.prototype.get = function (id) {
        return JSON.parse(localStorage.getItem(this.key + '#' + id));
    };
    LocalStorageEndpoint.prototype.update = function (id, json, options) {
        var existing = this.get(id);
        if (existing) {
            json.id = id;
            this.set(json);
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    LocalStorageEndpoint.prototype.read = function (id, options) {
        var existing = this.get(id);
        return existing ?
            this.resolve(existing) :
            this.reject("Not found");
    };
    LocalStorageEndpoint.prototype.destroy = function (id, options) {
        var existing = this.get(id);
        if (existing) {
            localStorage.removeItem(this.key + '#' + id);
            this.index = this.index.filter(function (x) { return x !== id; });
            return this.resolve({});
        }
        else {
            return this.reject("Not found");
        }
    };
    Object.defineProperty(LocalStorageEndpoint.prototype, "index", {
        get: function () {
            return JSON.parse(localStorage.getItem(this.key)) || [0];
        },
        set: function (x) {
            localStorage.setItem(this.key, JSON.stringify(x));
        },
        enumerable: true,
        configurable: true
    });
    LocalStorageEndpoint.prototype.list = function (options) {
        var _this = this;
        return this.resolve(this.index.slice(1).map(function (id) { return _this.get(id); }));
    };
    LocalStorageEndpoint.prototype.subscribe = function (events) { };
    LocalStorageEndpoint.prototype.unsubscribe = function (events) { };
    return LocalStorageEndpoint;
}());

describe('IO', function () {
    describe('memory endpoint', function () {
        var testData = [
            { name: "John" }
        ];
        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            User.endpoint = create(testData);
            __decorate([
                attr,
                __metadata("design:type", String)
            ], User.prototype, "name", void 0);
            User = __decorate([
                define
            ], User);
            return User;
        }(Record));
        it('loads the test data', function (done) {
            var users = new User.Collection();
            users.fetch()
                .then(function () {
                chai_1(users.length).to.eql(1);
                chai_1(users.first().name).to.eql('John');
                done();
            });
        });
        it('create', function (done) {
            var x = new User({ name: "test" });
            x.save().then(function () {
                chai_1(x.id).to.eql("1");
                done();
            });
        });
        it('read', function (done) {
            var x = new User({ id: "1" });
            x.fetch().then(function () {
                chai_1(x.name).to.eql("test");
                done();
            });
        });
        it('update', function (done) {
            var x = new User({ id: "1" });
            x.fetch()
                .then(function () {
                x.name = "Mike";
                return x.save();
            })
                .then(function () {
                var y = new User({ id: "1" });
                return y.fetch();
            })
                .then(function (y) {
                chai_1(y.name).to.eql('Mike');
                done();
            });
        });
        it('list', function (done) {
            var users = new User.Collection();
            users.fetch()
                .then(function () {
                chai_1(users.length).to.eql(2);
                chai_1(users.first().name).to.eql("John");
                chai_1(users.last().name).to.eql("Mike");
                done();
            });
        });
        it("destroy", function (done) {
            var x = new User({ id: "1" });
            x.destroy()
                .then(function () {
                var users = new User.Collection();
                return users.fetch();
            })
                .then(function (users) {
                chai_1(users.length).to.eql(1);
                chai_1(users.first().name).to.eql("John");
                done();
            });
        });
    });
    if (typeof localStorage !== 'undefined')
        describe('localStorage endpoint', testEndpoint(create$1("/test")));
});
function testEndpoint(endpoint) {
    return function () {
        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            User.endpoint = endpoint;
            __decorate([
                attr,
                __metadata("design:type", String)
            ], User.prototype, "name", void 0);
            User = __decorate([
                define
            ], User);
            return User;
        }(Record));
        var generatedId;
        it('create', function (done) {
            var x = new User({ name: "test" });
            x.save().then(function () {
                generatedId = x.id;
                chai_1(x.id).to.be.not.empty;
                done();
            });
        });
        it('read', function (done) {
            var x = new User({ id: generatedId });
            x.fetch().then(function () {
                chai_1(x.name).to.eql("test");
                done();
            });
        });
        it('update', function (done) {
            var x = new User({ id: generatedId });
            x.fetch()
                .then(function () {
                x.name = "Mike";
                return x.save();
            })
                .then(function () {
                var y = new User({ id: generatedId });
                return y.fetch();
            })
                .then(function (y) {
                chai_1(y.name).to.eql('Mike');
                done();
            });
        });
        it('list', function (done) {
            var users = new User.Collection();
            users.fetch()
                .then(function () {
                chai_1(users.length).to.eql(1);
                chai_1(users.last().name).to.eql("Mike");
                done();
            });
        });
        it("destroy", function (done) {
            var x = new User({ id: generatedId });
            x.destroy()
                .then(function () {
                var users = new User.Collection();
                return users.fetch();
            })
                .then(function (users) {
                chai_1(users.length).to.eql(0);
                done();
            });
        });
    };
}

})));
//# sourceMappingURL=index.js.map