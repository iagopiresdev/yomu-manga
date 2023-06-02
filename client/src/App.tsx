import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux';
import store from './redux/store'; // adjust the path according to your project structure


export default function App() {
  const [loggedUser, setLoggedUser] = useState();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className="w-screen bg-[#f6f8ff]">
          <Routes setLoggedUser={setLoggedUser} loggedUser={loggedUser} />
        </main>
      </BrowserRouter>
    </Provider>
  )
}


