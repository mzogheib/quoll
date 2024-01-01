import React from "react";

import TouchableIcon from "../../TouchableIcon";
import { colorPalette } from "../../ui-primitives";

type Props = {
  onPress: () => void;
};

const HelpButton = ({ onPress }: Props) => {
  return (
    <TouchableIcon
      onPress={onPress}
      name="help"
      color={colorPalette.mediumAquamarine}
    />
  );
};

export default HelpButton;
