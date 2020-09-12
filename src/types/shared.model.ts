export interface Algorithm {
  value: string;
  name: string;
  complexityWorst: string;
  complexityAverage: string;
  complexityBest: string;
  description: string;
  source: string;
}

export interface Item {
  value: number;
  index: number;
  isSelected?: boolean;
}

export interface AlgorithmImplementation {
  step: (...args: any[]) => any;
  sort: (...args: any[]) => any;
}

export interface ISettings {
  numberOfBars: number;
  stepDuration: number;
  sortDuration: number;
}
