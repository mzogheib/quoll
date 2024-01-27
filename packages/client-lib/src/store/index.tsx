import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ReducersMapObject, combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const makeGlobalStore = <M extends ReducersMapObject<any, any>>(
  reducers: M,
) => {
  const globalReducer = combineReducers(reducers);

  const store = legacy_createStore(globalReducer, composeWithDevTools());

  const StoreProvider = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    /**
     * Provides the store context for your app. Wrap your app with this high up
     * in the component tree.
     */
    StoreProvider,
  };
};
