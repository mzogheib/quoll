import React from "react";
import { TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { useNavigate } from "../../screens/navigation";
import { screenConfigMap } from "../../screens/config";
import { ScreenName } from "../../screens/types";

type Props = {
  name: ScreenName;
};

const GoToScreenButton = ({ name }: Props) => {
  const navigate = useNavigate();

  return (
    <TouchableHighlight onPress={() => navigate(name)}>
      <Icon name={screenConfigMap[name].icon} size={30} />
    </TouchableHighlight>
  );
};

export default GoToScreenButton;
