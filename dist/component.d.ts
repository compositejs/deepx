import * as Hje from "hje";
import * as DataSense from "datasense";
/**
 * Disposable instance.
 */
export declare class BaseComponent extends Hje.BaseComponent {
    private _inner2;
    /**
     * Initializes a new instance of the BaseComponent class.
     * @param element The element.
     * @param options The options.
     */
    constructor(element: any, options?: Hje.ComponentOptionsContract);
    /**
     * Gets or sets a property.
     * @param key The property key.
     * @param value The optional value of the property if need set.
     */
    prop<T = any>(key: string | any, value?: T | any): any;
    /**
     * Gets all property keys.
     */
    getKeys(): string[];
    /**
     * Checks if the specific key is existed.
     * @param key  The property key.
     */
    hasProp(key: string): boolean;
    /**
     * Gets a value of the specific key.
     * @param key  The property key.
     */
    getProp(key: string): any;
    /**
     * Sets a value of the specific key.
     * @param key  The property key.
     * @param value  The value of the property to set.
     * @param message  A message for the setting event.
     */
    setProp(key: string, value: any, message?: DataSense.FireInfoContract | string): boolean;
    /**
     * Sets a value of the specific key. A status and further information will be returned.
     * @param key  The property key.
     * @param value  The value of the property to set.
     * @param message  A message for the setting event.
     */
    setPropForDetails<T>(key: string, value: T, message?: DataSense.FireInfoContract | string): DataSense.ChangedInfo<T>;
    /**
     * Sets a value of the specific key by a Promise.
     * @param key  The property key.
     * @param value  A Promise of the property to set.
     * @param compatible  true if the value can also be a non-Promise; otherwise, false.
     * @param message  A message for the setting event.
     */
    setPromiseProp<T>(key: string, value: Promise<T>, compatible?: boolean, message?: DataSense.FireInfoContract | string): Promise<T>;
    /**
     * Sets a value of the specific key by an observable which can be subscribed.
     * @param key  The property key.
     * @param value  A Promise of the property to set.
     * @param message  A message for the setting event.
     * @param callbackfn  A function will be called on subscribed.
     */
    setSubscribeProp<T>(key: string, value: DataSense.SubscriberContract<T>, message?: DataSense.FireInfoContract | string, callbackfn?: (ev: DataSense.ChangedInfo<T>, message: DataSense.FireInfoContract) => void, thisArg?: any): DataSense.SubscriberResultContract;
    /**
     * Removes a property.
     * @param key  The property key.
     * @param message  A message for the setting event.
     */
    removeProp(key: string | string[], message?: DataSense.FireInfoContract | string): number;
    /**
     * Batch sets properties.
     * @param obj  The data with properties to override current ones.
     * @param message  A message for the setting event.
     */
    setProps(obj: any | DataSense.PropUpdateActionContract<any>[], message?: DataSense.FireInfoContract | string): void;
    /**
     * Registers an event listener on the speicific property has been changed.
     * @param key  The property key.
     * @param h  The handler or handlers of the event listener.
     * @param thisArg  this arg.
     * @param options  The event listener options.
     * @param disposableArray  An additional disposable array instance for push current event handler.
     */
    onPropChanged<T>(key: string, h: DataSense.EventHandlerContract<DataSense.ChangedInfo<T>> | DataSense.EventHandlerContract<DataSense.ChangedInfo<T>>[], thisArg?: any, options?: DataSense.EventOptionsContract, disposableArray?: DataSense.DisposableArrayContract): DataSense.EventRegisterResultContract<DataSense.ChangedInfo<T>>;
    /**
     * Creates a client for props.
     */
    createPropsClient(): DataSense.PropsClient;
    /**
     * Creates a client for a property.
     * @param key  The property key.
     */
    createPropClient(key: string): DataSense.ValueClient<unknown>;
    /**
     * Adds an event listener.
     * @param key The event key.
     * @param handler The handler of the event to add.
     */
    on(key: string, handler: any, thisArg?: any, options?: DataSense.EventOptionsContract, disposableArray?: DataSense.DisposableArrayContract): DataSense.EventRegisterResultContract<unknown>;
    /**
     * Creates an observable instance so that any event listeners and subscribers will be disposed automatically when that instance is disposed.
     */
    createEventListeners(): DataSense.EventObservable;
    /**
     * Creates a single event observable.
     * @param key  The event key.
     */
    createEventListener(key: string): void;
    /**
     * Disposeses this instance and remove the element from the tree.
     */
    dispose(): void;
}
