import React from "react";

import TouchableIcon from "../../TouchableIcon";

type Props = {
  onPress: () => void;
};

const HelpButton = ({ onPress }: Props) => {
  return <TouchableIcon onPress={onPress} name="help" />;
};

export default HelpButton;
