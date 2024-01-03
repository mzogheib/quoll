import React from "react";
import { colorPalette } from "@quoll/ui-primitives";
import TouchableIcon from "@components/TouchableIcon";

type Props = {
  onPress: () => void;
};

const HelpButton = ({ onPress }: Props) => {
  return (
    <TouchableIcon
      hitBox="max"
      onPress={onPress}
      name="help"
      color={colorPalette.mediumAquamarine}
      size={40}
    />
  );
};

export default HelpButton;
