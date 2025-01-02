import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './font.css';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const MainPage = lazy(() => import('./pages/main/page'));
const IntroPage = lazy(() => import('./pages/intro/page'));
const GalleryPage = lazy(() => import('./pages/gallery/page'));
const GamesPage = lazy(() => import('./pages/games/page'));
const RulletPage = lazy(() => import('./pages/games/rullet/page'));
const CommentsPage = lazy(() => import('./pages/comments/page'));
const RollingPaperPage = lazy(() => import('./pages/rollingPapers/page'));

const router = createBrowserRouter([
  {
    path: "",
    element: <Suspense fallback={<div>Loading...</div>}><MainPage /></Suspense>,
  },
  {
    path: "/intro",
    element: <Suspense fallback={<div>Loading...</div>}><IntroPage /></Suspense>,
  },
  {
    path: "/gallery",
    element: <Suspense fallback={<div>Loading...</div>}><GalleryPage /></Suspense>,
  },
  {
    path: "/rollingPapers",
    element: <Suspense fallback={<div>Loading...</div>}><RollingPaperPage /></Suspense>,
  },
  {
    path: "/games",
    element: <Suspense fallback={<div>Loading...</div>}><GamesPage /></Suspense>,
    children: [
      {
        path: "rullet",
        element: <Suspense fallback={<div>Loading...</div>}><RulletPage /></Suspense>,
      }
    ]
  },
  {
    path:"/comments",
    element:<Suspense fallback={<div>Loading...</div>}><CommentsPage /></Suspense>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
