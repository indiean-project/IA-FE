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
import FreeBoard from './pages/FreeBoard'
import BoardEnrollForm from './pages/BoardEnrollForm/BoardEnrollForm.jsx'

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
        path: '/concertList',
        element: <ConcertList/>
      },
      {
        path: '/funding',
        element: <></>
      },
      {
        path: '/funding/detail',
        element: <FundDetail/>
      },
      {
        path: '/board/free',
        element: <FreeBoard/>
      },
      {
        path: '/board/enroll',
        element: <BoardEnrollForm/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
