import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import { DarkThemeProvider } from './components/DarkThemeProvider';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

if(domain === undefined || clientId === undefined) {
    throw new Error("REACT_APP_AUTH0_DOMAIN and/or REACT_APP_AUTH0_CLIENT_ID are/is undefined");
}

ReactDOM.render(
  <DarkThemeProvider>
    <Auth0Provider
      domain={ domain }
      clientId={ clientId }
      redirectUri={ window.location.origin }
    >
      <App />
    </Auth0Provider>
  </DarkThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
