import { Outlet } from "react-router-dom";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import { useState } from "react";

function App() {
  const [searchHistory, setSearchHistory] = useState({});
  return (
    <div className="App">
      <SearchAppBar />
      <Outlet context={[searchHistory, setSearchHistory]} />
    </div>
  );
}

export default App;
