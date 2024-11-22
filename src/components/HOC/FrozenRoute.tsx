"use client";

import React, { useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const FrozenRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context);

  return (
    <LayoutRouterContext.Provider value={frozen.current}>
      {children}
    </LayoutRouterContext.Provider>
  );
};

export default FrozenRoute;
