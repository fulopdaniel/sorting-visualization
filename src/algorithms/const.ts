import { Algorithm } from "../types/shared.model";

export const Algorithms: Algorithm[] = [
  {
    value: "bubbleSort",
    name: "Bubble Sort",
    complexityWorst: "O(n^2)",
    complexityAverage: "O(n^2)",
    complexityBest: "O(n)",
    description:
      "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",
    source: "https://www.geeksforgeeks.org/bubble-sort/",
  },
  {
    value: "selectionSort",
    name: "Selection Sort",
    complexityWorst: "O(n^2)",
    complexityAverage: "O(n^2)",
    complexityBest: "O(n^2)",
    description:
      "The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.",
    source: "https://www.geeksforgeeks.org/selection-sort/",
  },
];
