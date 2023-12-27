import { useState } from "react";
import { View, Button } from "react-native";

import styles from "./styles";

import { getEndOfDay, getOffsetDate } from "../../logic";
import { DatePicker } from "../DatePicker";

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
      {isDPVisible && (
        <DatePicker
          initialValue={date}
          onDone={handleDateChange}
          onCancel={hideDatePicker}
        />
      )}

      <View style={styles.actions}>
        <Button
          title="Prev"
          onPress={handlePrev}
          disabled={areButtonsDisabled}
        />
        <Button
          title={formattedDate}
          onPress={showDatePicker}
          disabled={areButtonsDisabled}
        />
        <Button
          title="Next"
          onPress={handleNext}
          disabled={areButtonsDisabled || isToday}
        />
      </View>
    </View>
  );
};
