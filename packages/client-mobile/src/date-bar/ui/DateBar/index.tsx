import { useState } from "react";
import { View, Button } from "react-native";
import DatePicker from "react-native-date-picker";
import { TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

import { getEndOfDay, getOffsetDate } from "../../logic";

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
        <TouchableHighlight onPress={handlePrev} disabled={areButtonsDisabled}>
          <Icon name="navigate-before" size={30} />
        </TouchableHighlight>
        <Button
          title={formattedDate}
          onPress={showDatePicker}
          disabled={areButtonsDisabled}
        />
        <TouchableHighlight
          onPress={handleNext}
          disabled={areButtonsDisabled || isToday}
        >
          <Icon name="navigate-next" size={30} />
        </TouchableHighlight>
      </View>
    </View>
  );
};
