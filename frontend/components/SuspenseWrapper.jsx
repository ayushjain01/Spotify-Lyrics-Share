// components/SuspenseWrapper.js
"use client";
import React, { Suspense } from "react";
import Loading from "./Loading"; 

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
);

export default SuspenseWrapper;
