"use client";

import React from "react";
import Countup from "react-countup";

function AnimatedCounter({ currentBalance }: { currentBalance: number }) {
  return (
    <div className="w-full">
      <Countup end={currentBalance} decimal="." prefix="Ksh " decimals={2} />
    </div>
  );
}

export default AnimatedCounter;
