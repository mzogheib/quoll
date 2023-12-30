import RNDatePicker from "react-native-date-picker";
import { useState } from "react";

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
    onDone(newValue);
  };

  return (
    <RNDatePicker
      open
      modal
      onCancel={onCancel}
      onConfirm={handleChange}
      date={value}
      mode="date"
      androidVariant="nativeAndroid"
      onDateChange={handleChange}
      maximumDate={today}
    />
  );
};
