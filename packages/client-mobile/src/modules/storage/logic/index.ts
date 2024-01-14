import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

export const useStorage = <V>(key: string, defaultValue: V) => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);

  return { value, setValue };
};
