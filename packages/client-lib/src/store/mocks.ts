import { Store } from "./types";

export const makeMockStore = <State extends object>(initialState: State) => {
  const mockStore: jest.Mocked<Store<State>> = {
    state: initialState as any, // TODO fix this type cast
    setProperty: jest.fn(),
    reset: jest.fn(),
  };

  return mockStore;
};
