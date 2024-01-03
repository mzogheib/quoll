import React from "react";
import { Text } from "react-native";

import useStyles from "./styles";

import { Props } from "./types";

const Logo = (props: Props) => {
  const styles = useStyles(props);

  return <Text style={styles.wrapper}>Quoll</Text>;
};

export default Logo;
