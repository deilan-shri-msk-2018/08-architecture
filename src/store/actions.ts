import { Item } from "../models/item";

export const INITIAL = "";
export const ADD_ITEM = "[Item] Add Item";
export const REMOVE_ITEM = "[Item] Remove Item";

export interface IAction {
  type: string;
  payload?: any;
}

export class InitialAction implements IAction {
  public readonly type: string = INITIAL;
}

export class AddItem implements IAction {
  public readonly type: string = ADD_ITEM;
  constructor(public readonly payload: Item) {}
}

export class RemoveItem implements IAction  {
  public readonly type: string = REMOVE_ITEM;
  constructor(public readonly payload: Item) {}
}

export type ItemAction = AddItem | RemoveItem;
