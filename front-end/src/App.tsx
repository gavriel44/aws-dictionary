import { Outlet } from "react-router-dom";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import { ReactElement, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React from "react";
import { SearchHistory } from "./types/SearchHistory";

const queryClient = new QueryClient();

export type OutletContext = [
  SearchHistory,
  React.Dispatch<React.SetStateAction<SearchHistory>>
];

export default function App(): ReactElement {
  const [searchHistory, setSearchHistory] = useState<SearchHistory>({});
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SearchAppBar />
        <Outlet context={[searchHistory, setSearchHistory]} />
      </QueryClientProvider>
    </div>
  );
}
