import { Storage } from "@quoll/client-lib/storage";
import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

/**
 * Creates a store that is persisted between app launches.
 *
 * @param key a unique key for the store
 * @returns functions to get and set the store state
 */
export const makeStorage = <Data extends object>(
  key: string,
): Storage<Data> => {
  const getData: Storage<Data>["getData"] = () => MMKV.getMap<Data | null>(key);

  const setProperty: Storage<Data>["setProperty"] = (name, value) => {
    const newValue = { ...getData(), [name]: value };
    MMKV.setMap(key, newValue);
  };

  const clear: Storage<Data>["clear"] = () => {
    MMKV.removeItem(key);
  };

  return {
    getData,
    setProperty,
    clear,
  };
};
