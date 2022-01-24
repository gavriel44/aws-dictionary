import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/HomePage/Home";
import SearchHistory from "./components/SearchHistory";
import Word from "./components/WordBlock";
import Words from "./components/Words";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
// import your route components too

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="words" element={<Words />}>
          <Route path=":word" element={<Word />} />
          {/* <Route path="new" element={<NewTeamForm />} /> */}
          <Route index element={<SearchHistory />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
