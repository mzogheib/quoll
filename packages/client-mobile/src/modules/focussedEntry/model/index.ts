import { makeStore } from "@utils/store";

type State = {
  focussedEntryId: string | null;
};

const defaultState = {
  focussedEntryId: null,
};

const useFocussedEntryStore = makeStore<State>(defaultState);

export const useFocussedEntryModel = () => {
  const { state, setProperty } = useFocussedEntryStore();

  const setFocussedEntryId = (id: string | null) =>
    setProperty("focussedEntryId", id);

  return {
    ...state,
    setFocussedEntryId,
  };
};
