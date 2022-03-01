import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Nav from "./components/Nav";
import TabDemo from "./components/TabDemo";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/tab" element={<TabDemo />} />
        </Routes>
        <ToastContainer autoClose={3000} theme="colored" />
      </BrowserRouter>
    </div>
  );
}

export default Router;
