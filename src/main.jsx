import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Find from './pages/Find'
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
import ProudBoard from './pages/ProudBoard/ProudBoard.jsx'
import ArtistList from './pages/ArtistList'
import ArtistEnrollForm from './pages/ArtistEnrollForm'
import UrlInterceptor from './core/UrlInterceptor.jsx'
import NoticeBoard from './pages/NoticeBoard/NoticeBoard.jsx'
import AdminConcertEnrollForm from './pages/AdminConcertEnrollForm/AdminConcertEnrollForm.jsx'
import NoticeDetail from './pages/NoticeDetail/NoticeDetail.jsx'
import NoticeEnrollForm from './pages/NoticeEnrollForm/NoticeEnrollForm.jsx'

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
        path: '/find',
        element: <Find/>
      },
      {
        path: '/signUp',
        element: <SignUp/>
      },
      {
        path: '/myPage',
        element: <UrlInterceptor page={'login'}><MyPage/></UrlInterceptor>
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
        path: '/funding/detail/:id',
        element: <FundDetail/>
      },
      {
        path: '/funding/enroll',
        element: <UrlInterceptor page={'badAccess'}><FundEnroll/></UrlInterceptor>
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
        path: '/board/free',
        element: <FreeBoard/>
      },
      {
        path: '/board/enroll',
        element: <UrlInterceptor page={'login'}><BoardEnrollForm/></UrlInterceptor>
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
        path: 'board/detail/:id',
        element: <BoardDetail/>
      },
      {
        path: 'board/proud',
        element: <ProudBoard/>
      },
      {
        path:'/artist',
        element: <ArtistList/>
      },
      {
        path:'/artist/enroll',
        element: <UrlInterceptor page={'artistBadAccess'}><ArtistEnrollForm/></UrlInterceptor>
      },
      {
        path:'/notice',
        element: <NoticeBoard/>
      },
      {
        path:'/notice/detail/:id',
        element: <NoticeDetail/>
      },
      {
        path:'/notice/enroll',
        element: <NoticeEnrollForm/>
      },
      {
        path:'/admin/concertEnrollForm',
        element: <AdminConcertEnrollForm/>
      }
    ],
  },
  {
    path: '/error',
    element: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
