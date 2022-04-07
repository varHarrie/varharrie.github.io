import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import BaseStyles from './styles/BaseStyles';

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <BaseStyles />
    <App />
  </React.StrictMode>
);
