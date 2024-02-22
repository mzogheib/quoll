/**
 * A store for persisting data on the client side between app launches.
 */
export type Storage<State extends object> = {
  /**
   * Returns the stored data.
   */
  getState: () => State | null;
  /**
   * Set the value of an individual stored data property.
   * @param name the property name
   * @param value the new value for the property
   */
  setProperty: <Name extends keyof State>(
    name: Name,
    value: State[Name],
  ) => void;
};
