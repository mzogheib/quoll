/**
 * @format
 */

import { AppRegistry } from "react-native";
import AppRoot from "./src/AppRoot";
import { name } from "./app.json";

AppRegistry.registerComponent(name, () => AppRoot);

// trigger deploy
