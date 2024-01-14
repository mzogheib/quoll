import { Alert, Linking } from "react-native";

export const promptAllowAccess = (message: string) => {
  Alert.alert("Allow access", message, [
    {
      text: "Go to settings",
      isPreferred: true,
      onPress: () => Linking.openSettings(),
    },
    { text: "Cancel" },
  ]);
};
