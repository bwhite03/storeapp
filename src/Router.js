import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";

function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={HomePage} />
        </Routes>
      </BrowserRouter>
      <h2>test</h2>
    </div>
  );
}

export default Router;
