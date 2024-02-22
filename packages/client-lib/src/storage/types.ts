/**
 * A store for persisting data on the client side between app launches.
 */
export type Storage<Data extends object> = {
  /**
   * Returns the stored data.
   */
  getData: () => Data | null;
  /**
   * Set the value of an individual stored data property.
   * @param name the property name
   * @param value the new value for the property
   */
  setProperty: <Name extends keyof Data>(name: Name, value: Data[Name]) => void;
};
