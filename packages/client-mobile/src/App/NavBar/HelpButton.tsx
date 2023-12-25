import React from "react";
import { Button } from "react-native";

type Props = {
  onPress: () => void;
};

const HelpButton = ({ onPress }: Props) => {
  return <Button onPress={onPress} title="Help" />;
};

export default HelpButton;
