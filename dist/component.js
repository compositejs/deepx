"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var Hje = require("hje");
var DataSense = require("datasense");
/**
 * Disposable instance.
 */
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    /**
     * Initializes a new instance of the BaseComponent class.
     * @param element The element.
     * @param options The options.
     */
    function BaseComponent(element, options) {
        var _this = _super.call(this, element, options) || this;
        _this._inner2 = {
            evKeys: [],
            obj: new DataSense.PropsController(),
            ev: new DataSense.EventController()
        };
        _this.disposableStore.push(_this._inner2.obj, _this._inner2.ev, {
            dispose: function () {
                while (this._inner2.evKeys.length)
                    this._inner2.evKeys.pop();
            }
        });
        _this._inner2.obj.onPropsChanged(function (ev) {
            var obj = {};
            ev.changes.forEach(function (ele) {
                obj[ele.key] = ele.value;
            });
            _super.prototype.prop.call(_this, obj);
        });
        return _this;
    }
    /**
     * Gets or sets a property.
     * @param key The property key.
     * @param value The optional value of the property if need set.
     */
    BaseComponent.prototype.prop = function (key, value) {
        if (!key)
            return undefined;
        if (typeof key === "object") {
            this._inner2.obj.setProps(key);
            return Object.keys(key);
        }
        if (arguments.length > 1)
            this._inner2.obj.setProp(key, value);
        return this._inner2.obj.getProp(key);
    };
    /**
     * Gets all property keys.
     */
    BaseComponent.prototype.getKeys = function () {
        return this._inner2.obj.getKeys();
    };
    /**
     * Checks if the specific key is existed.
     * @param key  The property key.
     */
    BaseComponent.prototype.hasProp = function (key) {
        return this._inner2.obj.hasProp(key);
    };
    /**
     * Gets a value of the specific key.
     * @param key  The property key.
     */
    BaseComponent.prototype.getProp = function (key) {
        return this._inner2.obj.getProp(key);
    };
    /**
     * Sets a value of the specific key.
     * @param key  The property key.
     * @param value  The value of the property to set.
     * @param message  A message for the setting event.
     */
    BaseComponent.prototype.setProp = function (key, value, message) {
        return this._inner2.obj.setProp(key, value, message);
    };
    /**
     * Sets a value of the specific key. A status and further information will be returned.
     * @param key  The property key.
     * @param value  The value of the property to set.
     * @param message  A message for the setting event.
     */
    BaseComponent.prototype.setPropForDetails = function (key, value, message) {
        return this._inner2.obj.setPropForDetails(key, value, message);
    };
    /**
     * Sets a value of the specific key by a Promise.
     * @param key  The property key.
     * @param value  A Promise of the property to set.
     * @param compatible  true if the value can also be a non-Promise; otherwise, false.
     * @param message  A message for the setting event.
     */
    BaseComponent.prototype.setPromiseProp = function (key, value, compatible, message) {
        return this._inner2.obj.setPromiseProp(key, value, compatible, message);
    };
    /**
     * Sets a value of the specific key by an observable which can be subscribed.
     * @param key  The property key.
     * @param value  A Promise of the property to set.
     * @param message  A message for the setting event.
     * @param callbackfn  A function will be called on subscribed.
     */
    BaseComponent.prototype.setSubscribeProp = function (key, value, message, callbackfn, thisArg) {
        return this._inner2.obj.setSubscribeProp(key, value, message, callbackfn, thisArg);
    };
    /**
     * Removes a property.
     * @param key  The property key.
     * @param message  A message for the setting event.
     */
    BaseComponent.prototype.removeProp = function (key, message) {
        return this._inner2.obj.removeProp(key, message);
    };
    /**
     * Batch sets properties.
     * @param obj  The data with properties to override current ones.
     * @param message  A message for the setting event.
     */
    BaseComponent.prototype.setProps = function (obj, message) {
        return this._inner2.obj.setProps(obj, message);
    };
    /**
     * Registers an event listener on the speicific property has been changed.
     * @param key  The property key.
     * @param h  The handler or handlers of the event listener.
     * @param thisArg  this arg.
     * @param options  The event listener options.
     * @param disposableArray  An additional disposable array instance for push current event handler.
     */
    BaseComponent.prototype.onPropChanged = function (key, h, thisArg, options, disposableArray) {
        return this._inner2.obj.onPropChanged(key, h, thisArg, options, disposableArray);
    };
    /**
     * Creates a client for props.
     */
    BaseComponent.prototype.createPropsClient = function () {
        return this._inner2.obj.createClient();
    };
    /**
     * Creates a client for a property.
     * @param key  The property key.
     */
    BaseComponent.prototype.createPropClient = function (key) {
        return this._inner2.obj.createPropClient(key);
    };
    /**
     * Adds an event listener.
     * @param key The event key.
     * @param handler The handler of the event to add.
     */
    BaseComponent.prototype.on = function (key, handler, thisArg, options, disposableArray) {
        var _this = this;
        if (this._inner2.evKeys.indexOf(key) < 0)
            _super.prototype.on.call(this, key, function (ev) {
                _this._inner2.ev.fire(key, ev);
            });
        return this._inner2.ev.on(key, handler, thisArg, options, disposableArray);
    };
    /**
     * Creates an observable instance so that any event listeners and subscribers will be disposed automatically when that instance is disposed.
     */
    BaseComponent.prototype.createEventListeners = function () {
        return this._inner2.ev.createObservable();
    };
    /**
     * Creates a single event observable.
     * @param key  The event key.
     */
    BaseComponent.prototype.createEventListener = function (key) {
        this._inner2.ev.createSingleObservable(key);
    };
    /**
     * Disposeses this instance and remove the element from the tree.
     */
    BaseComponent.prototype.dispose = function () {
        this._inner2.obj.dispose();
        this._inner2.ev.dispose();
        _super.prototype.dispose.call(this);
        while (this._inner2.evKeys.length)
            this._inner2.evKeys.pop();
    };
    return BaseComponent;
}(Hje.BaseComponent));
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=component.js.map