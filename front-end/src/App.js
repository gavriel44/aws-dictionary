import { Outlet } from "react-router-dom";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [searchHistory, setSearchHistory] = useState({});
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SearchAppBar />
        <Outlet context={[searchHistory, setSearchHistory]} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
