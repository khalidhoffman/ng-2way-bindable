import { EventEmitter, Input, Output } from "@angular/core";
import set = Reflect.set;

export const BindableInput = function () {
  return function (target: any, paramKey: string) {
    const paramSafeKey = `_${paramKey}_bindable`;
    const paramEmitterKey = `${paramKey}Change`;
    const store: { [key: string]: any } = {};
    const ngSet = function (val) {
      store[paramSafeKey] = val;
      store[paramEmitterKey].emit(store[paramSafeKey]);
    };

    const ngGet = function () {
      return store[paramSafeKey];
    };

    console.warn('initializing emitter');
    store[paramEmitterKey] = new EventEmitter<string>();

    const targetPropertyMeta = {
      enumerable: true,
      configurable: true
    };

    const targetPropertyAccessors = {
      set: function (val: any) {
        if (!store.done) {
          console.warn('binding set accessor');
          this[paramEmitterKey] = store[paramEmitterKey];
          this[set [paramKey]] = ngSet;
          store.done = true;
        }
        console.log(`setting/emitting ${val}, %o`, this);
        ngSet(val);
      },
      get: ngGet
    };

    Object.defineProperty(target, paramKey, Object.assign(targetPropertyMeta, targetPropertyAccessors));
    Object.defineProperty(target, paramEmitterKey, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: store[paramEmitterKey]
    });
    Input().apply(this, arguments);
    Output().apply(this, [target, paramEmitterKey]);
  }
};
