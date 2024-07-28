import { Storage } from "@quoll/client-lib";

const prefix = "quoll";

const makeKey = (key: string) => `${prefix}-${key}`;

export const makeStorage = <Data extends object>(
  key: string,
): Storage<Data> => {
  const getData: Storage<Data>["getData"] = () => {
    const data = sessionStorage.getItem(makeKey(key));

    if (!data) return null;

    try {
      // TODO is this properly typed? The parsed data could be anything.
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const setProperty: Storage<Data>["setProperty"] = (name, value) => {
    const data = getData();
    const newData = { ...data, [name]: value };
    sessionStorage.setItem(makeKey(key), JSON.stringify(newData));
  };

  const clear = () => {
    sessionStorage.removeItem(makeKey(key));
  };

  return {
    getData,
    setProperty,
    clear,
  };
};
