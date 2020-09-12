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

export const bubbleSort = (items: Item[]): any[] => {
  let arrayModified = true;
  let sortedArray = _.cloneDeep(items);
  const queue = [];

  while (arrayModified) {
    arrayModified = false;
    for (let i = 0; i < sortedArray.length; i++) {
      const current = sortedArray.findIndex((x) => x.index === i);
      const next = sortedArray.findIndex((x) => x.index === i + 1);
      if (
        sortedArray[current] !== undefined &&
        sortedArray[next] !== undefined &&
        sortedArray[next].value < sortedArray[current].value
      ) {
        sortedArray = step(sortedArray, current, next);
        queue.push([current, next]);
        arrayModified = true;
      }
    }
  }
  return queue;
};
