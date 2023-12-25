import React from "react";
import { Button } from "react-native";

import { useNavigate } from "../../screens/navigation";
import { screenConfigMap } from "../../screens/config";
import { ScreenName } from "../../screens/types";

type Props = {
  name: ScreenName;
};

const GoToScreenButton = ({ name }: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      onPress={() => navigate(name)}
      title={screenConfigMap[name].title}
    />
  );
};

export default GoToScreenButton;
