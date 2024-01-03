import React from "react";
import { Text } from "react-native";

import useStyles from "./styles";

import { Props } from "./types";

const Logo = (props: Props) => {
  const styles = useStyles(props);

  // Add space either side because when this component is centered within a
  // flex container (alignItems: "center") the ends get clipped.
  // TODO: work out why
  return <Text style={styles.wrapper}>&nbsp;Quoll&nbsp;</Text>;
};

export default Logo;
