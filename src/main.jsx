import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import MyPage from './pages/MyPage'
import ErrorPage from './pages/ErrorPage'
import FundDetail from './pages/FundDetail'
import ConcertList from './pages/ConcertList'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import AdminFundingApproval from './components/AdminFundingApproval/AdminFundingApproval.jsx'
import AdminQuestionSection from './components/AdminQuestionSeciton/AdminQuestionSection.jsx'
import AdminReportManagement from './components/AdminReportManagement/AdminReportManagement.jsx'
import AdminUserAutority from './components/AdminUserAutority/AdminUserAutority.jsx'
import FundList from './pages/FundList'
import ConcertDetail from './pages/ConcertDetail'
import FreeBoard from './pages/FreeBoard/FreeBoard.jsx'
import BoardEnrollForm from './pages/BoardEnrollForm/BoardEnrollForm.jsx'
import ColoBoard from './pages/ColoBoard/ColoBoard.jsx'
import ArtistDetail from './pages/ArtistDetail'
import BoardDetail from './pages/BoardDetail/BoardDetail.jsx'
import FundEnroll from './pages/FundEnroll/FundEnroll.jsx'
import ArtistList from './pages/ArtistList'
import ArtistEnrollForm from './pages/ArtistEnrollForm'

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
        path: '/myPage',
        element: <MyPage/>
      },
      {
        path: '/concert/',
        element: <ConcertList/>
      },
      {
        path: '/funding',
        element: <FundList/>
      },
      {
        path: '/funding/detail/:id',
        element: <FundDetail/>
      },
      {
        path: 'funding/enroll',
        element: <FundEnroll/>
      },
      {
        path: '/concert/detail/:id',
        element: <ConcertDetail/>
      },
      {
       path: '/admin',
       element: <AdminPage/> 
      },
      {
        path: '/admin/fund',
        element: <AdminFundingApproval/> 
       }, 
       {
        path: '/admin/questions',
        element: <AdminQuestionSection/> 
       }, 
       {
        path: '/admin/report',
        element: <AdminReportManagement/> 
       }, 
       {
        path: '/admin/userAutority',
        element: <AdminUserAutority/> 
       },
       {
        path: '/board/free',
        element: <FreeBoard/>
      },
      {
        path: '/board/enroll',
        element: <BoardEnrollForm/>
      },
      {
        path: '/board/colo',
        element: <ColoBoard/>
      },
      {
        path:'/artist/detail/:id',
        element: <ArtistDetail/>
      },
      {
        path: 'board/detail',
        element: <BoardDetail/>
      },
      {
        path:'/artist',
        element: <ArtistList/>
      },
      {
        path:'/artist/enroll',
        element: <ArtistEnrollForm/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
