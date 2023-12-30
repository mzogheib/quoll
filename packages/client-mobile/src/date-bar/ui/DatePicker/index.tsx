import RNDatePicker from "react-native-date-picker";
import { useState } from "react";
import { Button, View } from "react-native";

import styles from "./styles";

type Props = {
  initialValue: Date;
  onCancel: () => void;
  onDone: (date: Date) => void;
};

export const DatePicker = ({ initialValue, onCancel, onDone }: Props) => {
  const today = new Date();

  const [value, setValue] = useState(initialValue);

  const handleChange = async (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <View>
      <View style={styles.actions}>
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Done" onPress={() => onDone(value)} />
      </View>
      <View style={styles.datePicker}>
        <RNDatePicker
          textColor="black"
          date={value}
          mode="date"
          androidVariant="nativeAndroid"
          onDateChange={handleChange}
          maximumDate={today}
        />
      </View>
    </View>
  );
};
