import { useState } from "react";
import { View, TouchableHighlight, Text } from "react-native";
import DatePicker from "react-native-date-picker";
import { getEndOfDay, getOffsetDate } from "@quoll/lib/modules";

import styles from "./styles";

import TouchableIcon from "@components/TouchableIcon";

type Props = {
  isDisabled?: boolean;
  date: Date;
  onDateChange: (date: Date) => void;
};

export const DateBar = ({ isDisabled, date, onDateChange }: Props) => {
  const now = new Date();

  const [isDPVisible, setIsDPVisible] = useState(false);

  const showDatePicker = () => setIsDPVisible(true);
  const hideDatePicker = () => setIsDPVisible(false);

  const handlePrev = () => {
    const newDate = getOffsetDate(date, -1);
    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = getOffsetDate(date, 1);
    onDateChange(newDate);
  };

  const handleDateChange = (newDate: Date) => {
    hideDatePicker();
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
