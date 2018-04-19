import { Item } from "../models/item";

export const INITIAL = '';
export const ADD_ITEM = '[Item] Add Item';
export const REMOVE_ITEM = '[Item] Remove Item';

export interface Action {
  type: string;
}

export class InitialAction implements Action {
  public readonly type = INITIAL;
}

export class AddItem implements Action {
  public readonly type = ADD_ITEM;
  constructor(public readonly payload: Item) {}
}

export class RemoveItem implements Action  {
  public readonly type = REMOVE_ITEM;
  constructor(public readonly payload: Item) {}
}


export type ItemAction =
  | AddItem
  | RemoveItem;