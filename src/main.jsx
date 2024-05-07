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
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import AdminFundingApproval from './components/AdminFundingApproval/AdminFundingApproval.jsx'
import AdminQuestionSection from './components/AdminQuestionSeciton/AdminQuestionSection.jsx'
import AdminReportManagement from './components/AdminReportManagement/AdminReportManagement.jsx'
import AdminUserAutority from './components/AdminUserAutority/AdminUserAutority.jsx'

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
        element: <></>
      },
      {
        path: '/funding/detail',
        element: <FundDetail/>
      },
      {
       path: '/admin',
       element: <AdminPage/> 
      },
      {
        path: '/admin/fund',
        element: <AdminFundingApproval/> 
       }, {
        path: '/admin/questions',
        element: <AdminQuestionSection/> 
       }, {
        path: '/admin/report',
        element: <AdminReportManagement/> 
       }, {
        path: '/admin/userAutority',
        element: <AdminUserAutority/> 
       }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
