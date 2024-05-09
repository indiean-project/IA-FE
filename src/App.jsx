/* eslint-disable */
import { RecoilRoot } from 'recoil'
import Layout from './components/Layout'
import drum from './assets/drum.png'
import { Toaster } from 'react-hot-toast'

function App() {
  // pr 체크
  return (
    <RecoilRoot>
      <img src={drum} id="background__drum"/>
      <Layout/>
      <Toaster/>
    </RecoilRoot>
  )
}

export default App
