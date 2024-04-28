import { RecoilRoot } from 'recoil'
import Layout from './components/Layout'
import drum from './assets/drum.png'

function App() {

  return (
    <RecoilRoot>
      <img src={drum} id="background__drum"/>
      <Layout/>
    </RecoilRoot>
  )
}

export default App
