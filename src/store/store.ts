import { IAction, InitialAction } from "./actions";
import { IReducerMap } from "./reducers";

export interface IState {
    [key: string]: any;
}

export class Store {
  private subscribers: Array<(state: IState) => void>;
  private reducers: IReducerMap;
  private state: IState;

  constructor(reducers: IReducerMap = {}, initialState: IState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, new InitialAction());
  }

  public subscribe(fn: (state: IState) => void) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== fn);
    };
  }

  public dispatch(action: IAction): void {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify(): void {
    this.subscribers.forEach((fn) => fn(this.state));
  }

  private reduce(state: IState, action: IAction): IState {
    const newState: IState = { };
    for (const prop of Object.keys(this.reducers)) {
      const reducer = this.reducers[prop];
      newState[prop] = reducer(state[prop], action);
    }
    return newState;
  }
}
