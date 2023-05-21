import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Home() {
  return (
    <div className='flex'>
        <Header />
    
        <Link to="/Login">Login</Link>
    </div>
  )
}

export default Home 