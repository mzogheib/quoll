import { Storage } from "@quoll/client-lib";
import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

/**
 * Creates a store that is persisted between app launches.
 *
 * @param key a unique key for the store
 * @returns functions to get and set the store state
 */
export const makeStorage = <State extends object>(
  key: string,
): Storage<State> => {
  const getState: Storage<State>["getState"] = () =>
    MMKV.getMap<State | null>(key);

  const setProperty: Storage<State>["setProperty"] = (name, value) => {
    const newValue = { ...getState(), [name]: value };
    MMKV.setMap(key, newValue);
  };

  return {
    getState,
    setProperty,
  };
};
