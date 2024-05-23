/* eslint-disable */
import { RecoilRoot } from 'recoil'
import Layout from './components/Layout'
import drum from './assets/drum.png'
import { Toaster } from 'react-hot-toast'
import ErrorInterceptor from './core/ErrorInterceptor'

function App() {
  // pr 체크
  return (
    <RecoilRoot>
      <ErrorInterceptor/>
      <img src={drum} id="background__drum"/>
      <Toaster/>
      <Layout/>
    </RecoilRoot>
  )
}

export default App
