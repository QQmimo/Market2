import { useEffect, useState } from 'react'
import { Header } from './ui/Header/Header';
import { MainPage } from './ui/pages/MainPage/MainPage';
import { CartPage } from './ui/pages/CartPage/CartPage';
import './App.css';

function App() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [content, setContent] = useState(null);

  const getContent = () => {
    if (location.pathname === '/') {
      setContent(<MainPage onUpdate={setLastUpdate} search={search} />);
    }
    if (location.pathname === '/cart') {
      setContent(<CartPage />);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      setContent(<MainPage onUpdate={setLastUpdate} search={search} />);
    }
    else {
      getContent();
    }
  }, [search]);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header lastUpdate={lastUpdate} onSearch={setSearch} />
      {content}
    </>
  )
}

export default App
