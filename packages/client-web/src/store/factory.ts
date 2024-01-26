import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";

import { RootState } from "store";

export const makeStore = <State extends object>(
  storeName: string,
  initialState: State,
) => {
  type StatePropertyName = keyof State;

  // Setter

  const makeActionType = (name: StatePropertyName) => {
    return `${storeName}__set__${String(name)}`;
  };

  interface SetPropertyAction
    extends Action<ReturnType<typeof makeActionType>> {
    payload: { name: StatePropertyName; value: State[StatePropertyName] };
  }

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

  // Selector
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

  // Reducer

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

  // Hook

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
    useStore,
  };
};
