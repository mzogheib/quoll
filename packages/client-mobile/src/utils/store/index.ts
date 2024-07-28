import { Store } from "@quoll/client-lib";
import { create } from "zustand";

/**
 * Makes a Zustand store and returns a hook to use it. The store has a standard
 * shape:
 *
 * ```
 * {
 *   state,       // An object of properties to persist
 *   setProperty, // A function to update an individual property
 *   reset        // A function to reset the store to its initial state
 * }
 * ```
 *
 * @param initialState
 * @returns the store hook
 */
export const makeStore = <State extends object>(initialState: State) =>
  create<Store<State>>((set) => ({
    state: initialState,
    setProperty: (name, value) =>
      set((store) => ({ state: { ...store.state, [name]: value } })),
    reset: () => set({ state: initialState }),
  }));
