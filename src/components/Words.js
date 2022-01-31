import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import "./wordsStyle.css";

export default function Words() {
  const context = useOutletContext();
  return (
    <div className="words">
      {/* this is words */}
      <Outlet context={context} />
    </div>
  );
}
