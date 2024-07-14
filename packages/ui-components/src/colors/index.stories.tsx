import React from "react";

import { themes } from "../themes";
import ColorBlock from "./ColorBlock";

export default { title: "colors" };

const allColors = Object.entries(themes.default.colors);

export const Default = () => {
  return (
    <div>
      {allColors.map(([colorName, colorValue]) => (
        <ColorBlock
          key={colorName}
          colorName={colorName}
          colorValue={colorValue}
        />
      ))}
    </div>
  );
};
