import { Item } from "./models/item";

const label = document.querySelector('.view-stub__label') as HTMLParagraphElement;

export function renderItems(items: Item[]) {
  const fragment = document.createDocumentFragment();
  const list = document.createElement('ul');
  for (const item of items) {
    const listItem = document.createElement('li');
    listItem.dataset.item = JSON.stringify(item);
    listItem.textContent = item.label;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
  }
  fragment.appendChild(list);
  label.innerHTML = '';
  label.appendChild(fragment);
}
