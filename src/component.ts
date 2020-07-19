import Hje from "hje";
import DataSense from "datasense";

/**
 * Disposable instance.
 */
export class BaseComponent extends Hje.BaseComponent {
    private _inner2 = {
        evKeys: [] as string[],
        obj: new DataSense.PropsController(),
        ev: new DataSense.EventController()
    };

    /**
     * Initializes a new instance of the BaseComponent class.
     * @param element The element.
     * @param options The options.
     */
    constructor(element: any, options?: Hje.ComponentOptionsContract) {
        super(element, options);
        super.disposableStore.push(this._inner2.obj, this._inner2.ev, {
            dispose() {
                while (this._inner2.evKeys.length) this._inner2.evKeys.pop();
            }
        });
        this._inner2.obj.onPropsChanged(ev => {
            let obj = {};
            ev.changes.forEach(ele => {
                obj[ele.key] = ele.value;
            });
            super.prop(obj);
        });
    }

    /**
     * Gets or sets a property.
     * @param key The property key.
     * @param value The optional value of the property if need set.
     */
    prop<T = any>(key: string | any, value?: T | any) {
        if (!key) return undefined;
        if (typeof key === "object") {
            this._inner2.obj.setProps(key);
            return Object.keys(key);
        }

        if (arguments.length > 1) this._inner2.obj.setProp(key, value);
        return this._inner2.obj.getProp(key);
    }

    /**
     * Gets all property keys.
     */
    public getKeys() {
        return this._inner2.obj.getKeys();
    }

    /**
     * Checks if the specific key is existed.
     * @param key  The property key.
     */
    public hasProp(key: string) {
        return this._inner2.obj.hasProp(key);
    }

    /**
     * Gets a value of the specific key.
     * @param key  The property key.
     */
    public getProp(key: string) {
        return this._inner2.obj.getProp(key);
    }

    /**
     * Sets a value of the specific key.
     * @param key  The property key.
     * @param value  The value of the property to set.
     * @param message  A message for the setting event.
     */
    public setProp(key: string, value: any, message?: DataSense.FireInfoContract | string) {
        return this._inner2.obj.setProp(key, value, message);
    }

    /**
     * Sets a value of the specific key. A status and further information will be returned.
     * @param key  The property key.
     * @param value  The value of the property to set.
     * @param message  A message for the setting event.
     */
    public setPropForDetails<T>(key: string, value: T, message?: DataSense.FireInfoContract | string): DataSense.ChangedInfo<T> {
        return this._inner2.obj.setPropForDetails(key, value, message);
    }

    /**
     * Sets a value of the specific key by a Promise.
     * @param key  The property key.
     * @param value  A Promise of the property to set.
     * @param compatible  true if the value can also be a non-Promise; otherwise, false.
     * @param message  A message for the setting event.
     */
    public setPromiseProp<T>(key: string, value: Promise<T>, compatible?: boolean, message?: DataSense.FireInfoContract | string): Promise<T> {
        return this._inner2.obj.setPromiseProp(key, value, compatible, message);
    }

    /**
     * Sets a value of the specific key by an observable which can be subscribed.
     * @param key  The property key.
     * @param value  A Promise of the property to set.
     * @param message  A message for the setting event.
     * @param callbackfn  A function will be called on subscribed.
     */
    public setSubscribeProp<T>(key: string, value: DataSense.SubscriberContract<T>, message?: DataSense.FireInfoContract | string, callbackfn?: (ev: DataSense.ChangedInfo<T>, message: DataSense.FireInfoContract) => void, thisArg?: any) {
        return this._inner2.obj.setSubscribeProp(key, value, message, callbackfn, thisArg);
    }

    /**
     * Removes a property.
     * @param key  The property key.
     * @param message  A message for the setting event.
     */
    public removeProp(key: string | string[], message?: DataSense.FireInfoContract | string) {
        return this._inner2.obj.removeProp(key, message);
    }

    /**
     * Batch sets properties.
     * @param obj  The data with properties to override current ones.
     * @param message  A message for the setting event.
     */
    public setProps(obj: any | DataSense.PropUpdateActionContract<any>[], message?: DataSense.FireInfoContract | string) {
        return this._inner2.obj.setProps(obj, message);
    }

    /**
     * Registers an event listener on the speicific property has been changed.
     * @param key  The property key.
     * @param h  The handler or handlers of the event listener.
     * @param thisArg  this arg.
     * @param options  The event listener options.
     * @param disposableArray  An additional disposable array instance for push current event handler.
     */
    public onPropChanged<T>(
        key: string,
        h: DataSense.EventHandlerContract<DataSense.ChangedInfo<T>> | DataSense.EventHandlerContract<DataSense.ChangedInfo<T>>[],
        thisArg?: any,
        options?: DataSense.EventOptionsContract,
        disposableArray?: DataSense.DisposableArrayContract
    ) {
        return this._inner2.obj.onPropChanged(key, h, thisArg, options, disposableArray);
    }

    /**
     * Creates a client for props.
     */
    public createPropsClient() {
        return this._inner2.obj.createClient();
    }

    /**
     * Creates a client for a property.
     * @param key  The property key.
     */
    public createPropClient(key: string) {
        return this._inner2.obj.createPropClient(key);
    }

    /**
     * Adds an event listener.
     * @param key The event key.
     * @param handler The handler of the event to add.
     */
    public on(key: string, handler: any, thisArg?: any, options?: DataSense.EventOptionsContract, disposableArray?: DataSense.DisposableArrayContract) {
        if (this._inner2.evKeys.indexOf(key) < 0) super.on(key, (ev: any) => {
            this._inner2.ev.fire(key, ev);
        });
        return this._inner2.ev.on(key, handler, thisArg, options, disposableArray);
    }

    /**
     * Creates an observable instance so that any event listeners and subscribers will be disposed automatically when that instance is disposed.
     */
    public createEventListeners() {
        return this._inner2.ev.createObservable();
    }

    /**
     * Creates a single event observable.
     * @param key  The event key.
     */
    public createEventListener(key: string) {
        this._inner2.ev.createSingleObservable(key);
    }
    
    /**
     * Disposeses this instance and remove the element from the tree.
     */
    dispose() {
        this._inner2.obj.dispose();
        this._inner2.ev.dispose();
        super.dispose();
        while (this._inner2.evKeys.length) this._inner2.evKeys.pop();
    }
}
