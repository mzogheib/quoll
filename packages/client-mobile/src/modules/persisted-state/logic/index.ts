import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

/**
 * Returns a stateful value and a function to update it. Perists the value
 * between app launches.
 *
 * @param key a unique key for the persisted value
 * @param initialValue the initial value
 * @returns a tuple of the value and update function
 */
export const usePersistedState = <V>(
  key: string,
  initialValue: V,
): [V, (newValue: V) => void] => {
  const [value, setValue] = useMMKVStorage(key, MMKV, initialValue);

  return [value, setValue];
};
