import {
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import set = Reflect.set;

interface BindableInputCache {
  [key: string]: any
}

export const BindableInput = function () {
  return function (target: any, paramKey: string) {
    const paramEmitterKey = `${paramKey}Change`;
    const store: BindableInputCache = { [paramEmitterKey]: new EventEmitter<string>() };
    const targetPropertyMeta = { enumerable: true, configurable: true };
    const targetPropertyEmitterMeta = {
      enumerable: true,
      configurable: true,
      writable: true,
      value: store[paramEmitterKey]
    };
    const ngSet = function (val) {
      store[paramKey] = val;
      store[paramEmitterKey].emit(store[paramKey]);
    };

    const targetPropertyAccessors = {
      get: function () {
        return store[paramKey];
      },
      set: function (val: any) {
        if (!store[paramEmitterKey].instance) {
          this[paramEmitterKey] = store[paramEmitterKey];
          this[set [paramKey]] = ngSet;
          store[paramEmitterKey].instance = this;
        }
        ngSet(val);
      }
    };

    Object.assign(targetPropertyMeta, targetPropertyAccessors);
    Object.defineProperty(target, paramKey, targetPropertyMeta);
    Object.defineProperty(target, paramEmitterKey, targetPropertyEmitterMeta);

    Input().apply(this, [target, paramKey]);
    Output().apply(this, [target, paramEmitterKey]);
  }
};
