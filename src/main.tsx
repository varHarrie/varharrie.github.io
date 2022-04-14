import './i18n';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import App from './App';
import BaseStyles from './styles/BaseStyles';
import Article from './views/Article';
import Articles from './views/Articles';
import Home from './views/Home';
import Projects from './views/Projects';

document.title = import.meta.env.VITE_APP_TITLE;

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);

const milestones = {
  posts: Number(import.meta.env.VITE_GITHUB_MILESTONE_POSTS),
  snippets: Number(import.meta.env.VITE_GITHUB_MILESTONE_SNIPPETS),
};

root.render(
  <>
    <BaseStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="posts" element={<Outlet />}>
            <Route
              path=""
              element={<Articles milestone={milestones.posts} />}
            />
            <Route path=":id" element={<Article />} />
          </Route>
          <Route path="snippets" element={<Outlet />}>
            <Route
              path=""
              element={<Articles milestone={milestones.snippets} />}
            />
            <Route path=":id" element={<Article />} />
          </Route>
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
