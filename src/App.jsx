import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Leaderboard from './pages/Leaderboard'
import PlayerResult from './pages/PlayerResult'
import Quiz from './pages/Quiz/'
import Result from './pages/Result'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/leaderboard' element={<Leaderboard></Leaderboard>}></Route>
          <Route path='/result' element={<PlayerResult></PlayerResult>}></Route>
          <Route path='/quiz/:userId' element={<Quiz></Quiz>}></Route>
          <Route path='/result/:userId' element={<Result></Result>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
