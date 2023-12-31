import React from "react";

import { useNavigate } from "../../screens/navigation";
import { screenConfigMap } from "../../screens/config";
import { ScreenName } from "../../screens/types";
import TouchableIcon from "../../TouchableIcon";

type Props = {
  name: ScreenName;
};

const GoToScreenButton = ({ name }: Props) => {
  const navigate = useNavigate();

  return (
    <TouchableIcon
      onPress={() => navigate(name)}
      name={screenConfigMap[name].icon}
    />
  );
};

export default GoToScreenButton;
