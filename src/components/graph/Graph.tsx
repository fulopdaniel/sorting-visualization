import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import Bar from "../bar/Bar";
import css from "./Graph.module.css";
import {
  Item,
  AlgorithmImplementation,
  ISettings,
} from "../../types/shared.model";
import { algorithms } from "../../algorithms/algorithms";
import { Button } from "antd";
import {
  SyncOutlined,
  CaretRightOutlined,
  RightOutlined,
  LeftOutlined,
  PauseOutlined,
} from "@ant-design/icons";

interface GraphProps {
  selectedAlgorithm: string;
  settings: ISettings;
}

const getInitialItems = (numberOfBars: number) => {
  const items = [];
  for (let i = 1; i <= numberOfBars; i++) {
    items.push({ value: i, index: i - 1 });
  }
  const randomOrder = _.shuffle(items.map((x) => x.index));
  return items.map((x, i) => ({ ...x, index: randomOrder[i] }));
};

const Graph: React.FC<GraphProps> = ({ selectedAlgorithm, settings }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [queue, setQueue] = useState<any>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortQueue, setSortQueue] = useState<NodeJS.Timeout[]>([]);
  const [algorithm, setAlgorithm] = useState<AlgorithmImplementation>(
    algorithms[selectedAlgorithm as keyof typeof algorithms]
  );

  useEffect(() => {
    const initialItems = getInitialItems(settings.numberOfBars);
    const _algorithm = algorithms[selectedAlgorithm as keyof typeof algorithms];
    setAlgorithm(_algorithm);
    setItems(initialItems);
    setQueue(_algorithm.sort(initialItems));
    setCurrentStep(0);
    clearSortQueue();
  }, [selectedAlgorithm, settings.numberOfBars]);

  useEffect(() => {
    clearSortQueue();
  }, [settings.stepDuration]);

  const clearSortQueue = () => {
    sortQueue.forEach((x) => clearTimeout(x));
    setSortQueue([]);
  };

  const shuffle = () => {
    const randomOrder = _.shuffle(items.map((x) => x.index));
    const newItems = items.map((x, i) => ({
      ...x,
      index: randomOrder[i],
      isSelected: false,
    }));
    setQueue(algorithm.sort(newItems));
    setCurrentStep(0);
    setItems(newItems);
    clearSortQueue();
  };

  const sort = () => {
    let sortedArray = items;
    const _sortQueue = [];
    for (let i = currentStep; i < queue.length; i++) {
      const timeout = setTimeout(() => {
        sortedArray = algorithm.step(sortedArray, ...queue[i]);
        setItems(sortedArray);
        setCurrentStep(i + 1);
        if (i === queue.length - 1) {
          setSortQueue([]);
        }
      }, (i - currentStep) * settings.stepDuration);
      _sortQueue.push(timeout);
    }
    setSortQueue(_sortQueue);
  };

  const manualStep = (direction: number) => {
    const queueModifier = direction === -1 ? -1 : 0;
    if (queue[currentStep + queueModifier]) {
      let sortedArray = items;

      sortedArray = algorithm.step(
        sortedArray,
        ...queue[currentStep + queueModifier]
      );
      setCurrentStep(currentStep + direction);
      setItems(sortedArray);
    }
  };

  const pause = () => {
    clearSortQueue();
  };

  const next = () => {
    manualStep(1);
  };

  const back = () => {
    manualStep(-1);
  };

  return (
    <>
      <div className={css.graph}>
        {items.map((item) => (
          <Bar
            index={item.index}
            value={item.value}
            itemsLength={items.length}
            isSelected={!!item.isSelected}
            stepDuration={settings.stepDuration}
            key={item.value.toString()}
          />
        ))}
      </div>
      <div className={css.buttonsWrapper}>
        <div className={css.buttonLine}>
          <div className={css.buttonLeft}>
            <Button size="large" onClick={shuffle} icon={<SyncOutlined />}>
              Shuffle
            </Button>
          </div>
          <div className={css.buttonRight}>
            {sortQueue.length ? (
              <Button
                onClick={pause}
                type="primary"
                danger
                size="large"
                icon={<PauseOutlined />}
              >
                Pause
              </Button>
            ) : (
              <Button
                size="large"
                onClick={sort}
                type="primary"
                icon={<CaretRightOutlined />}
              >
                Sort
              </Button>
            )}
          </div>
        </div>
        <div className={css.buttonLine}>
          <div className={css.buttonLeft}>
            <Button onClick={back} icon={<LeftOutlined />}>
              Undo last swap
            </Button>
          </div>
          <div className={css.buttonRight}>
            <Button onClick={next}>
              Swap one
              <RightOutlined />
            </Button>
          </div>
        </div>
      </div>
      <div className={css.stepsLeft}>
        <span>Swaps left: {queue.length - currentStep}</span>
      </div>
    </>
  );
};

export default Graph;
