import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

window.__myapp_container = document.getElementById('app')
ReactDOM.render(
  <Root/>,
  window.__myapp_container
)