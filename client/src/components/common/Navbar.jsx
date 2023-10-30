import React from "react";

export default function Navabar({ children }) {
  return (
    <div className="grid grid-flow-col px-4 py-2  ">
      <div className="w-full">{children}</div>
    </div>
  );
}
