import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Tab } from "@/types";

export type TableState = {
  tab: Tab;
};

export type TableActions = {
  setTab: (tab: Tab) => void;
};

export type TableStore = TableState & TableActions;

export const defaultInitState: TableState = {
  tab: "pl",
};

export const createTableStore = (initState: TableState = defaultInitState) =>
  createStore<TableStore>()(
    persist(
      (set) => ({
        ...initState,
        setTab: (tab: Tab) => set(() => ({ tab })),
      }),
      {
        name: "table-store",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
