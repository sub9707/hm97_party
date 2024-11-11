import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/main/page';
import IntroPage from './pages/intro/page';
import GalleryPage from './pages/gallery/page';

const router = createBrowserRouter([
  {
    path: "",
    element: <MainPage />,
  },
  {
    path:"/intro",
    element:<IntroPage />,
  },
  {
    path:"/gallery",
    element:<GalleryPage/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
     <RouterProvider router={router} />
)
