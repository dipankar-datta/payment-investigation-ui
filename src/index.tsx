import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { RootStore } from './redux/rootStore';


ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Provider store={RootStore}>
      <App />
    </Provider>
    
  </StyledEngineProvider>,
  document.getElementById("root")
);
