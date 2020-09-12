import React, { useState } from "react";
import Menu from "../menu/Menu";
import Graph from "../graph/Graph";
import { Algorithms } from "../../algorithms/const";
import { ISettings } from "../../types/shared.model";

const INITIAL_SETTINGS: ISettings = {
  numberOfBars: 20,
  stepDuration: 200,
  sortDuration: 5000,
};

const Wrapper: React.FC<any> = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    Algorithms[0].value
  );
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  return (
    <main>
      <Menu
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        settings={settings}
        setSettings={setSettings}
      />
      <Graph settings={settings} selectedAlgorithm={selectedAlgorithm} />
    </main>
  );
};

export default Wrapper;
