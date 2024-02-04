export type Store<State extends object> = {
  state: State;
  setProperty: <Name extends keyof State>(
    name: Name,
    value: State[Name],
  ) => void;
};
