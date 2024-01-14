import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

export const usePersistedState = <V>(
  key: string,
  defaultValue: V,
): [V, (newValue: V) => void] => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);

  return [value, setValue];
};
