import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes, { User } from './routes';

export default function App() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);


  return (
      <BrowserRouter>
        <main className="w-screen bg-[#f6f8ff]">
          <Routes setLoggedUser={setLoggedUser} loggedUser={loggedUser} />
        </main>
      </BrowserRouter>
  )
}


