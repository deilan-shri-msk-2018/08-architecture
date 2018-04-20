import { IReducerMap, itemReducer, Store } from "./store";

import { initHandlers } from "./handlers";

const reducers = {
  items: itemReducer,
};

const store = new Store(reducers);

initHandlers(store);
