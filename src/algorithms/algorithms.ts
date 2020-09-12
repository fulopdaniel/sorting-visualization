import { step as bubbleSortStep, bubbleSort } from "./bubbleSort/bubbleSort";
import { AlgorithmImplementation } from "../types/shared.model";
import {
  step as selectionSortStep,
  selectionSort,
} from "./selectionSort/selectionSort";

export const algorithms = {
  bubbleSort: {
    step: bubbleSortStep,
    sort: bubbleSort,
  } as AlgorithmImplementation,
  selectionSort: {
    step: selectionSortStep,
    sort: selectionSort,
  } as AlgorithmImplementation,
};
