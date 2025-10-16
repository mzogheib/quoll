import React from "react";
import { Pressable, Text } from "react-native";

import { makeStyles } from "./styles";

import { ButtonVariant } from "./types";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  variant = "default",
}: ButtonProps) => {
  const styles = makeStyles(variant, disabled);

  return (
    <Pressable
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};
