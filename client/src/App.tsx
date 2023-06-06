import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { Providers } from './components/Providers';

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <main className="w-screen bg-[#f6f8ff]">
          <Routes />
        </main>
      </Providers>
    </BrowserRouter>
  );
}
