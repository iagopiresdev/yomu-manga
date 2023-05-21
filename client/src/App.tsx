import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, SignIn } from './pages'


export default function App() {
  return (
    <BrowserRouter>
    <main className="w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </main>
    </BrowserRouter>
  )
}

