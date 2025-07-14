import { useEffect, useState } from 'react'
import { Header } from './ui/Header/Header';
import { MainPage } from './ui/pages/MainPage/MainPage';
import { CartPage } from './ui/pages/CartPage/CartPage';
import './App.css';

function App() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [content, setContent] = useState(<MainPage onUpdate={setLastUpdate} />);

  useEffect(() => {
    setContent(<MainPage onUpdate={setLastUpdate} search={search} />);
  }, [search]);

  useEffect(() => {
    if (location.pathname === '/') {
      setContent(<MainPage onUpdate={setLastUpdate} search={search} />);
    }
    if (location.pathname === '/cart') {
      setContent(<CartPage />);
    }
  }, []);

  return (
    <>
      <Header lastUpdate={lastUpdate} onSearch={setSearch} />
      {content}
    </>
  )
}

export default App
