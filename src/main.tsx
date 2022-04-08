import './i18n';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import BaseStyles from './styles/BaseStyles';
import Home from './views/Home';

document.title = import.meta.env.VITE_APP_TITLE;

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <BaseStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
