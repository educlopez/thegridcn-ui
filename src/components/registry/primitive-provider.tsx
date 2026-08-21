"use client";

import * as React from "react";
import {
  DEFAULT_SHADCN_PRIMITIVE,
  isRegistryPrimitive,
  SHADCN_PRIMITIVE_STORAGE_KEY,
} from "@/lib/shadcn-primitive";
import type { RegistryPrimitive } from "@/registry/design-system";

interface PrimitiveProviderState {
  primitive: RegistryPrimitive;
  setPrimitive: (primitive: RegistryPrimitive) => void;
}

const PrimitiveContext = React.createContext<
  PrimitiveProviderState | undefined
>(undefined);

export function PrimitiveProvider({ children }: { children: React.ReactNode }) {
  const [primitive, setPrimitiveState] = React.useState<RegistryPrimitive>(
    DEFAULT_SHADCN_PRIMITIVE
  );

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(SHADCN_PRIMITIVE_STORAGE_KEY);
      if (isRegistryPrimitive(stored)) {
        setPrimitiveState(stored);
      }
    } catch {
      // private browsing / disabled storage
    }
  }, []);

  const setPrimitive = React.useCallback((next: RegistryPrimitive) => {
    setPrimitiveState(next);
    try {
      localStorage.setItem(SHADCN_PRIMITIVE_STORAGE_KEY, next);
    } catch {
      // private browsing / disabled storage
    }
  }, []);

  const value = React.useMemo(
    () => ({ primitive, setPrimitive }),
    [primitive, setPrimitive]
  );

  return (
    <PrimitiveContext.Provider value={value}>
      {children}
    </PrimitiveContext.Provider>
  );
}

export function usePrimitive() {
  const context = React.useContext(PrimitiveContext);
  if (!context) {
    throw new Error("usePrimitive must be used within a PrimitiveProvider");
  }
  return context;
}
