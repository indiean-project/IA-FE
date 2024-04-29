import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import FreeBoard from './pages/FreeBoard/FreeBoard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <></>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signUp',
        element: <SignUp/>
      },
      {
        path: '/FreeBoard',
        element: <FreeBoard/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
