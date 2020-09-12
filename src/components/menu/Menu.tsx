import React from "react";
import css from "./Menu.module.css";

import { Select, Popover, Button } from "antd";
import { Algorithms } from "../../algorithms/const";
import { SettingOutlined, InfoOutlined } from "@ant-design/icons";
import { ISettings } from "../../types/shared.model";
import Settings from "./Settings/Settings";
import Informations from "./Informations/Informations";

const { Option } = Select;

interface MenuProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: any;
  settings: ISettings;
  setSettings: any;
}

const Menu: React.FC<MenuProps> = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
  settings,
  setSettings,
}) => {
  return (
    <div className={css.wrapper}>
      <span>
        <Select
          defaultValue={selectedAlgorithm}
          showSearch
          placeholder="Select a sorting algorithm"
          optionFilterProp="children"
          onChange={setSelectedAlgorithm}
          filterOption={(input, option) =>
            option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {Algorithms.map((algo) => (
            <Option key={algo.value} value={algo.value}>
              {algo.name}
            </Option>
          ))}
        </Select>
      </span>
      <span>
        <Popover
          content={<Settings settings={settings} setSettings={setSettings} />}
          title="Settings"
          trigger="click"
        >
          <Button shape="circle" icon={<SettingOutlined />} />
        </Popover>
      </span>
      <span>
        <Popover
          content={<Informations algorithm={selectedAlgorithm} />}
          trigger="click"
        >
          <Button shape="circle" icon={<InfoOutlined />} />
        </Popover>
      </span>
    </div>
  );
};

export default Menu;
