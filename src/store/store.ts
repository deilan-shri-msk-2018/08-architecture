import { Action, InitialAction } from "./actions";
import { ReducerMap } from "./reducers";

export interface State {
    [key: string]: any;
}

export class Store {
  private subscribers: Function[];
  private reducers: ReducerMap;
  private state: State;

  constructor(reducers: ReducerMap = {}, initialState: State = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, new InitialAction());
  }

  public subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  public dispatch(action: Action): void {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify(): void {
    this.subscribers.forEach(fn => fn(this.state));
  }

  private reduce(state: State, action: Action): State {
    const newState: State = { };
    for (const prop in this.reducers) {
      const reducer = this.reducers[prop];
      newState[prop] = reducer(state[prop], action);
    }
    return newState;
  }
}
