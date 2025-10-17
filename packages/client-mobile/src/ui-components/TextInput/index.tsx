import React from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

type Props = Omit<TextInputProps, "style">;

export const TextInput = (props: Props) => (
  <RNTextInput {...props} style={styles.base} />
);
