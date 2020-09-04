import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from './utils/react-auth0-spa';
import App from './app';

const Index = () => (
  <Auth0Provider
      domain='climbing.eu.auth0.com'
      client_id='DNJNVzhxbF7PtaBFh7H6iBSNLh2UJWHt'
      redirect_uri={window.location.origin}
    >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);

ReactDOM.render((<Index />), document.getElementById('app'))