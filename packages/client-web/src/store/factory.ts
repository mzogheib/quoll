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

  const selectProperty =
    <Name extends StatePropertyName>(name: Name) =>
    (rootState: RootState): State[Name] => {
      const _storeName = storeName as keyof RootState;
      const storeState = rootState[_storeName] as State;
      return storeState[name];
    };

  const useSelectProperty = <Name extends StatePropertyName>(
    name: Name,
  ): State[Name] => {
    const value = useSelector(selectProperty(name));

    return value;
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

  return {
    useSetProperty,
    useSelectProperty,
    reducer,
  };
};
