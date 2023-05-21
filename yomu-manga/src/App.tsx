import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login } from './pages'


export default function App() {
  return (
    <BrowserRouter>
    <main className="w-full sm:p-8 px-4 py-8 bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
    </BrowserRouter>
  )
}

