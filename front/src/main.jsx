import React from 'react'
import ReactDOM from 'react-dom/client'
import './font.css'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/main/page';
import IntroPage from './pages/intro/page';
import GalleryPage from './pages/gallery/page';
import GamesPage from './pages/games/page';
import RulletPage from './pages/games/rullet/page';
import CommentsPage from './pages/comments/page';
import RollingPaperPage from './pages/rollingPapers/page';

const router = createBrowserRouter([
  {
    path: "",
    element: <MainPage />,
  },
  {
    path: "/intro",
    element: <IntroPage />,
  },
  {
    path: "/gallery",
    element: <GalleryPage />
  },
  {
    path: "/rollingPapers",
    element: <RollingPaperPage />
  },
  {
    path: "/games",
    element: <GamesPage />,
    children: [
      {
        path: "rullet",
        element: <RulletPage />
      }
    ]
  },
  {
    path:"/comments",
    element:<CommentsPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
