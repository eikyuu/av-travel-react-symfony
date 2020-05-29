import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import HomePage from "./pages/HomePage";

const App = () => {
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <HashRouter>
      <NavbarWithRouter />

      <main className="app">
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
