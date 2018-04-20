import { Item } from "../models/item";
import * as fromActions from "./actions";
import { IAction, ItemAction } from "./actions";

export interface ItemsState {
    data: Item[];
}

export interface IReducerMap {
  [key: string]: (state: any, action: any) => any;
}

export const initialState: ItemsState = {
  data: [],
};

export function itemReducer(
  state: ItemsState = initialState,
  action: ItemAction,
): ItemsState {
  switch (action.type) {
    case fromActions.ADD_ITEM: {
      const item = action.payload;
      const data = [...state.data, item];
      return {
        ...state,
        data,
      };
    }
    case fromActions.REMOVE_ITEM: {
      const data = state.data.filter(
        (item: Item) => item.label !== action.payload.label,
      );
      return {
        ...state,
        data,
      };
    }
  }
  return state;
}
