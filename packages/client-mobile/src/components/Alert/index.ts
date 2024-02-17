import { Alert, Linking } from "react-native";

/**
 * Displays an alert to prompt the user to allow access to a resource via the
 * device settings. The primary button will open the app's settings page.
 *
 * @param message the message to display in the alert.
 */
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
