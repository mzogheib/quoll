import { Store } from "./types";

export function makeMockStore<State extends object>(initialState: State) {
  const setPropertyMock = jest.fn();
  const resetMock = jest.fn();

  const mockStore: Store<State> = {
    state: initialState,
    setProperty: setPropertyMock,
    reset: resetMock,
  };

  const clearMockStore = () => {
    setPropertyMock.mockClear();
    resetMock.mockClear();
  };

  return {
    mockStore,
    clearMockStore,
  };
}
