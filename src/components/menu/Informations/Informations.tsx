import React from "react";
import css from "./Informations.module.css";
import { Algorithms } from "../../../algorithms/const";

interface InformationsProps {
  algorithm: string;
}

const Informations: React.FC<InformationsProps> = ({ algorithm }) => {
  const information = Algorithms.find((alg) => alg.value === algorithm);

  return information ? (
    <div className={css.wrapper}>
      <h1>Description</h1>
      <p>{information.description}</p>
      <h1>Complexity</h1>
      <div className={css.complexity}>
        <div>
          <h3>Worst</h3>
          <p>{information.complexityWorst}</p>
        </div>
        <div>
          <h3>Average</h3>
          <p>{information.complexityAverage}</p>
        </div>
        <div>
          <h3>Best</h3>
          <p>{information.complexityBest}</p>
        </div>
      </div>
      <a href={information.source}>More information</a>
    </div>
  ) : (
    <div>No information found</div>
  );
};

export default Informations;
