import react from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CoinPage from './pages/CoinPage'
import Alert from './components/Alert'

function App() {

  return (
    <div className='app'>
    <Alert/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins/:id' element={<CoinPage/>}/>
      </Routes>
    </div>
  )
}

export default App
