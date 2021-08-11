import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function Nav() {
  const { isAuthenticated, user, loginWithRedirect, loginWithPopup, logout } =
    useAuth0<{
      nickname: string;
    }>();
  const history = useHistory();
  const [pathname, setPathname] = useState(() => history.location.pathname);

  useEffect(() => {
    return history.listen(({ pathname }) => setPathname(pathname));
  }, [history]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Auth0</span>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <Link
            to="/"
            className={`nav-item nav-link${pathname === "/" ? " active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={`nav-item nav-link${
              pathname === "/profile" ? " active" : ""
            }`}
          >
            Profile
          </Link>
        </div>
      </div>

      {isAuthenticated ? (
        <div>
          <span id="hello">Hello, {user?.nickname}</span>{" "}
          <button
            className="btn btn-outline-secondary"
            id="logout"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-outline-success"
          id="login"
          onClick={async () => {
            await loginWithPopup();
            loginWithRedirect();
          }}
        >
          login
        </button>
      )}
    </nav>
  );
}
