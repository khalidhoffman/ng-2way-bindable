import {
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import set = Reflect.set;

export const BindableInput = function () {
  return function (target: any, paramKey: string) {
    const paramEmitterKey = `${paramKey}Change`;
    const store: { [key: string]: any } = { [paramEmitterKey]: new EventEmitter<string>() };
    const targetPropertyMeta = {
      enumerable: true,
      configurable: true
    };
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

    const ngGet = function () {
      return store[paramKey];
    };

    const targetPropertyAccessors = {
      set: function (val: any) {
        if (!store[paramEmitterKey].instance) {
          this[paramEmitterKey] = store[paramEmitterKey];
          this[set [paramKey]] = ngSet;
          store[paramEmitterKey].instance = this;
        }
        ngSet(val);
      }, get: ngGet
    };

    Object.assign(targetPropertyMeta, targetPropertyAccessors);
    Object.defineProperty(target, paramKey, targetPropertyMeta);
    Object.defineProperty(target, paramEmitterKey, targetPropertyEmitterMeta);

    Input().apply(this, [target, paramKey]);
    Output().apply(this, [target, paramEmitterKey]);
  }
};
