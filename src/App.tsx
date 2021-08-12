import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import axios from "axios";
import { ProtectedRoute } from "./ProtectedRoute";
import { Nav } from "./Nav";
import { Error } from "./Error";
import { Loading } from "./Loading";
import Profile from "./Profile";
import { ParentComponent } from "./components/ParentComponent";
import { API_URL } from "./constants";
import "./App.css";

// Use `createHashHistory` to use hash routing
export const history = createBrowserHistory();

function App() {
  const { isLoading, error, getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  const callApi = async () => {
    try {
      const { data } = await axios.get(`${API_URL}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${API_URL}protected`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router history={history}>
      <Nav />
      <ParentComponent />
      {error && <Error message={error.message} />}
      <div>
        <div className="action-btn">
          <button className="btn btn-outline-secondary" onClick={callApi}>
            Call API route
          </button>
        </div>
        <div className="action-btn">
          <button
            className="btn btn-outline-secondary"
            onClick={callProtectedApi}
          >
            Call protected API route
          </button>
        </div>
      </div>
      <Switch>
        <Route path="/" exact />
        <ProtectedRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
