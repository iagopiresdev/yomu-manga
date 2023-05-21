import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Register, Dashboard } from './pages'


export default function App() {
  const [loggedUser, setLoggedUser] = useState('');


  return (
    <BrowserRouter>
    <main className="w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedUser={setLoggedUser}/>} />

        <Route path="/signin" element={<Register />} />
          {loggedUser ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/dashboard" element={<Login setLoggedUser={setLoggedUser}/>} />
          )}
      </Routes>
    </main>
    </BrowserRouter>    
  )
}

