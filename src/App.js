import { Outlet } from "react-router-dom";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";

function App() {
  return (
    <div className="App">
      <SearchAppBar />
      <Outlet />
    </div>
  );
}

export default App;
