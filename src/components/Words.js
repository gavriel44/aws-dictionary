import React from "react";
import { Outlet } from "react-router-dom";
import "./wordsStyle.css";

export default function Words() {
  return (
    <div className="words">
      {/* this is words */}
      <Outlet />
    </div>
  );
}
