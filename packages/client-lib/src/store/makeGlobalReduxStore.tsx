import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ReducersMapObject, combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

/**
 * Creates a global Redux store from an object of reducers. Returns the context
 * provider with which to wrap your app.
 */
export const makeGlobalReduxStore = (reducers: ReducersMapObject<any, any>) => {
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
