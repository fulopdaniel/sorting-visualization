import React from "react";
import css from "./Settings.module.css";
import { ISettings } from "../../../types/shared.model";
import { Slider, InputNumber } from "antd";

interface SettingsProps {
  settings: ISettings;
  setSettings: any;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  return (
    <div className={css.wrapper}>
      <h3>Number of bars</h3>
      <div className={css.sliderWrapper}>
        <Slider
          min={3}
          max={50}
          className={css.slider}
          onChange={(x: number) =>
            setSettings({ ...settings, numberOfBars: +x })
          }
          value={settings.numberOfBars}
        />
        <InputNumber
          min={3}
          max={50}
          value={settings.numberOfBars}
          onChange={(x) =>
            setSettings({ ...settings, numberOfBars: x === undefined ? 2 : +x })
          }
        />
      </div>

      <h3>Duration of a step (in ms)</h3>
      <div className={css.sliderWrapper}>
        <Slider
          min={1}
          max={1000}
          className={css.slider}
          onChange={(x: number) =>
            setSettings({ ...settings, stepDuration: +x })
          }
          value={settings.stepDuration}
        />
        <InputNumber
          min={1}
          max={1000}
          value={settings.stepDuration}
          onChange={(x) =>
            setSettings({ ...settings, stepDuration: x === undefined ? 0 : +x })
          }
        />
      </div>
    </div>
  );
};

export default Settings;
