import { Item } from "../../types/shared.model";
import * as _ from "lodash";

export const step = (items: Item[], ...args: number[]) => {
  const clone = _.cloneDeep(items).map((x) => ({ ...x, isSelected: false }));
  const temp = clone[args[0]].index;
  clone[args[0]].index = clone[args[1]].index;
  clone[args[1]].index = temp;
  clone[args[1]].isSelected = true;
  clone[args[0]].isSelected = true;

  return clone;
};

export const selectionSort = (items: Item[]): any[] => {
  let sortedArray = _.cloneDeep(items);
  const queue = [];

  for (let i = 0; i < sortedArray.length; i++) {
    const firstItem = sortedArray.find((x) => x.index === i);
    const firstItemIndex = sortedArray.findIndex((x) => x.index === i);
    const notSortedArray = sortedArray.filter((x) => x.index > i);
    if (firstItem) {
      let minimumValue = firstItem.value;
      const minimumIndex = notSortedArray.reduce((acc, curr) => {
        if (curr.value < minimumValue) {
          minimumValue = curr.value;
          return curr.index;
        }
        return acc;
      }, firstItem.index);

      const secondItem = sortedArray.find((x) => x.index === minimumIndex);
      const secondItemIndex = sortedArray.findIndex(
        (x) => x.index === minimumIndex
      );
      if (secondItem && secondItem.value !== firstItem.value) {
        sortedArray = step(sortedArray, firstItemIndex, secondItemIndex);
        queue.push([firstItemIndex, secondItemIndex]);
      }
    }
  }

  return queue;
};
