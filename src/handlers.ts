import { renderItems } from "./render-utils";

import { AddItem, IState, RemoveItem, Store } from "./store";

export function initHandlers(store: Store) {
    const stopLogEl = document.querySelector(".stop-log") as HTMLButtonElement;
    const inputEl = document.querySelector(".view-stub__input") as HTMLInputElement;
    const applyEl = document.querySelector(".view-stub__apply") as HTMLButtonElement;
    const labelEl = document.querySelector(".view-stub__label") as HTMLParagraphElement;
    const formEl = document.querySelector(".view-stub__input-block") as HTMLFormElement;
    const logEl = document.querySelector(".log") as HTMLDivElement;

    applyEl.addEventListener("click", () => {
        if (!inputEl.value.trim()) {
            return;
        }
        const item = { label: inputEl.value };
        store.dispatch(new AddItem(item));
        inputEl.value = "";
    });

    store.subscribe((state: IState) => {
      renderItems(state.items.data);
    });

    labelEl.addEventListener("click", (event) => {
      const target = event.target as HTMLButtonElement;
      if (target.nodeName.toLowerCase() !== "button") {
        return;
      }
      const listItem = target.closest("li");
      if (listItem === null) {
          return;
      }
      const item = JSON.parse(listItem.getAttribute("data-item") as any);
      store.dispatch(new RemoveItem(item));
    });

    formEl.addEventListener("submit", (evt: Event) => {
      evt.preventDefault();
      return false;
    });
    labelEl.textContent = "";
    logEl.textContent = "";

    store.subscribe((state: IState) => console.log(state.items.data));
    const unsubscribe = store.subscribe((state: IState) => {
        logEl.innerHTML += (logEl.innerHTML ? `<br>` : ``) + JSON.stringify(state);
    });

    stopLogEl.addEventListener("click", () => {
        unsubscribe();
    });
}
