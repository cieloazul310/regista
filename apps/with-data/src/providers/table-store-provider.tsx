"use client";

import {
  createContext,
  useRef,
  useContext,
  type PropsWithChildren,
} from "react";
import { useStore, type StoreApi } from "zustand";

import { createTableStore, type TableStore } from "@/stores/table-store";

export const TableStoreContext = createContext<StoreApi<TableStore> | null>(
  null,
);

export type TableStoreProviderProps = PropsWithChildren;

export function TableStoreProvider({ children }: TableStoreProviderProps) {
  const storeRef = useRef<StoreApi<TableStore>>();
  if (!storeRef.current) {
    storeRef.current = createTableStore();
  }

  return (
    <TableStoreContext.Provider value={storeRef.current}>
      {children}
    </TableStoreContext.Provider>
  );
}

export const useTableStore = <T,>(selector: (store: TableStore) => T): T => {
  const tableStoreContext = useContext(TableStoreContext);

  if (!tableStoreContext) {
    throw new Error(`useCounterStore must be use within TableStoreProvider`);
  }

  return useStore(tableStoreContext, selector);
};
