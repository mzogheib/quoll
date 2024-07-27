/**
 * Stores are simple. They have a state with properties that can be set and
 * retrieved. There is no async logic in stores - that's done in the consumers.
 */
export type Store<State extends object> = {
  /**
   * The state of the store.
   */
  state: State;

  /**
   * Set the value of an individual state property.
   * @param name the property name
   * @param value the new value for the property
   */
  setProperty: <Name extends keyof State>(
    name: Name,
    value: State[Name],
  ) => void;

  /**
   * Resets the store to its initial state
   */
  reset: () => void;
};
