import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";

import { RootState } from "store";

/**
 * Makes a store and returns the reducer and hook to use it.
 *
 * Store are simple. They have a state with properties that can be set and
 * retrieved. There is no async logic in stores - that's done in the consumers.
 *
 * @param storeName - must be unique
 * @param initialState
 * @returns the store reducer and hook
 */
export const makeStore = <State extends object>(
  storeName: string,
  initialState: State,
) => {
  type StatePropertyName = keyof State;

  const makeActionType = (name: StatePropertyName) => {
    return `${storeName}__set__${String(name)}`;
  };

  interface SetPropertyAction
    extends Action<ReturnType<typeof makeActionType>> {
    payload: { name: StatePropertyName; value: State[StatePropertyName] };
  }

  /**
   * There is only one action, which is to set a store property.
   *
   * @param name
   * @param value
   * @returns an action to set a property
   */
  const makeSetPropertyAction = <Name extends StatePropertyName>(
    name: Name,
    value: State[Name],
  ): SetPropertyAction => ({
    type: makeActionType(name),
    payload: { name, value },
  });

  const useSetProperty = () => {
    const dispatch = useDispatch();

    const setProperty = useCallback(
      (name: StatePropertyName, value: State[StatePropertyName]) => {
        const action = makeSetPropertyAction(name, value);
        dispatch(action);
      },
      [dispatch],
    );

    return setProperty;
  };

  // TODO this might trigger a rerender for changes in property even if a
  // consumer is only referring to one. But it might be ok since there are
  // only a few properties per store.
  const useSelectProperties = (): State => {
    const value = useSelector((rootState: RootState) => {
      const _storeName = storeName as keyof RootState;

      return rootState[_storeName];
    });

    return value as State;
  };

  const reducer = (
    state: State = initialState,
    action: SetPropertyAction,
  ): State => {
    // TODO workout why this can be falsey but the typing doesn't catch it
    if (!action.payload) return state;

    const { type, payload } = action;
    const { name, value } = payload;

    switch (type) {
      case makeActionType(name):
        return {
          ...state,
          [name]: value,
        };
      default:
        return state;
    }
  };

  const useStore = () => {
    const setProperty = useSetProperty();
    const properties = useSelectProperties();

    return {
      setProperty,
      ...properties,
    };
  };

  return {
    reducer,
    /**
     * A hook to set store properties and to get the current state.
     */
    useStore,
  };
};
