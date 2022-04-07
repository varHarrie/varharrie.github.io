import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import GlobalStyles from './styles/GlobalStyles';

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
