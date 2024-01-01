import { useState } from "react";
import { View, Button, TouchableHighlight, Text } from "react-native";
import DatePicker from "react-native-date-picker";

import styles from "./styles";

import { getEndOfDay, getOffsetDate } from "../../logic";
import TouchableIcon from "../../../TouchableIcon";

type Props = {
  isDisabled?: boolean;
  onDateChange: (date: Date) => void;
};

export const DateBar = ({ isDisabled, onDateChange }: Props) => {
  const now = new Date();

  const [date, setDate] = useState(now);
  const [isDPVisible, setIsDPVisible] = useState(false);

  const showDatePicker = () => setIsDPVisible(true);
  const hideDatePicker = () => setIsDPVisible(false);

  const handlePrev = () => {
    const newDate = getOffsetDate(date, -1);
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = getOffsetDate(date, 1);
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleDateChange = (newDate: Date) => {
    hideDatePicker();
    setDate(newDate);
    onDateChange(newDate);
  };

  const formattedDate = date.toDateString();

  const areButtonsDisabled = isDPVisible || isDisabled;

  const isToday =
    getEndOfDay(now).toDateString() === getEndOfDay(date).toDateString();

  return (
    <View>
      <DatePicker
        modal
        open={isDPVisible}
        onCancel={hideDatePicker}
        onConfirm={handleDateChange}
        date={date}
        mode="date"
        androidVariant="nativeAndroid"
        maximumDate={now}
      />

      <View style={styles.actions}>
        <TouchableIcon
          onPress={handlePrev}
          disabled={areButtonsDisabled}
          name="navigate-before"
        />
        <TouchableHighlight
          onPress={showDatePicker}
          disabled={areButtonsDisabled}
        >
          <Text>{formattedDate}</Text>
        </TouchableHighlight>
        <TouchableIcon
          onPress={handleNext}
          disabled={areButtonsDisabled || isToday}
          name="navigate-next"
        />
      </View>
    </View>
  );
};
