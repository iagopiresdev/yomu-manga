import { Link } from 'react-router-dom'
import Header from '../components/Header'
import  logo  from '../assets/logo.svg'


function Home() {
  return (
    <div>
        <Header />
    
        <Link to="/login">Login</Link>
    </div>
  )
}

export default Home 