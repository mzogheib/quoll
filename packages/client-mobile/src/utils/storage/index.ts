import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().initialize();

/**
 * Creates a hook through which to set and access a store that is persisted
 * between app launches.
 *
 * @param key a unique key for the persisted value
 * @param initialValue the initial value
 * @returns a hook to access the persisted store
 */
export const makeStorage =
  <State extends object>(key: string, initialState: State) =>
  () => {
    const [state, setState] = useMMKVStorage(key, MMKV, initialState);

    const setProperty = <Name extends keyof State>(
      name: Name,
      value: State[Name],
    ) => {
      setState({ ...state, [name]: value });
    };

    return {
      state,
      setProperty,
    };
  };
