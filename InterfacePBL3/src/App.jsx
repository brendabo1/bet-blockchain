import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Jogar from './pages/Jogar'
import CriarJogo from './pages/CriarJogo'
import MeusJogos from './pages/MeusJogos'
import HomePage from './components/HomePage'
import Sidebar from './components/Sidebar'

function App() {

  return(
    <BrowserRouter>
    <Sidebar/>  
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/jogar' element={<Jogar/>}/>
        <Route path='/criarJogo' element={<CriarJogo/>}/>
        <Route path='/meusJogos' element={<MeusJogos/>}/>
        <Route path='/*' element={<h1>Not Found</h1>}/>

      </Routes>
    </BrowserRouter>

  )

}


export default App