import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
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

  const handleChange = async (_: DateTimePickerEvent, newValue?: Date) => {
    if (!newValue) {
      onCancel();
      return;
    }

    setValue(newValue);
  };

  return (
    <View>
      <View style={styles.actions}>
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Done" onPress={() => onDone(value)} />
      </View>
      <DateTimePicker
        value={value}
        onChange={handleChange}
        maximumDate={today}
        display="spinner"
      />
    </View>
  );
};
