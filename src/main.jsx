import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ErrorPage from './pages/ErrorPage'
import FundDetail from './pages/FundDetail'
import ConcertList from './pages/ConcertList'
import FundList from './pages/FundList'
import ConcertDetail from './pages/ConcertDetail/ConcertDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
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
        path: '/concert',
        element: <ConcertList/>
      },
      {
        path: '/funding',
        element: <FundList/>
      },
      {
        path: '/funding/detail',
        element: <FundDetail/>
      },
      {
        path: '/concert/detail',
        element: <ConcertDetail/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
