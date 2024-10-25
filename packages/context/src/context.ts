import { getAsyncStoreInstance } from './store.js';

export interface GlobalContext extends Record<string, unknown> {}

export const createContextProxy = (target: GlobalContext): GlobalContext => {
  return new Proxy(target, {
    get: (_target, property: string) => {
      const store = getAsyncStoreInstance().getStore();
      const ctx = store?.get('context') || {};
      return ctx[property];
    },
    set: (_target, property: string, newVal) => {
      const store = getAsyncStoreInstance().getStore();
      const ctx = store?.get('context') || {};
      ctx[property] = newVal;
      store?.set('context', ctx);
      return true;
    },
  });
};

export let context: GlobalContext = createContextProxy({});

export const setContext = (newContext: GlobalContext): GlobalContext => {
  context = createContextProxy(newContext);

  const store = getAsyncStoreInstance().getStore();
  store?.set('context', newContext);

  return context;
};
