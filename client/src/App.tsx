// App component
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes' // Import the routes file

export default function App() {
  const [loggedUser, setLoggedUser] = useState('');

  return (
    <BrowserRouter>
      <main className="w-screen">
        <Routes setLoggedUser={setLoggedUser} loggedUser={loggedUser} /> {/* Pass loggedUser here */}
      </main>
    </BrowserRouter>    
  )
}

