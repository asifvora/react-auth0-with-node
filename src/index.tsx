import React from 'react';
import ReactDOM from 'react-dom';
import App, { history } from './App';
import { Auth0Provider, AppState } from '@auth0/auth0-react';
import { DOMAIN, CLIENT_ID, AUDIENCE } from "./constants";

const onRedirectCallback = (appState: AppState) => {
  // If using a Hash Router, you need to use window.history.replaceState to
  // remove the `code` and `state` query parameters from the callback url.
  // window.history.replaceState({}, document.title, window.location.pathname);
  history.replace((appState && appState.returnTo) || window.location.pathname);
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={AUDIENCE}
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
