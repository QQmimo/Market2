import { useEffect, useState } from 'react'
import { Header } from './ui/Header/Header';
import { MainPage } from './ui/pages/MainPage/MainPage';
import { CartPage } from './ui/pages/CartPage/CartPage';
import './App.css';

function App() {
  const [lastUpdate, setLastUpdate] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(-1);
  const [order, setOrder] = useState(0);
  const [content, setContent] = useState(null);

  const getContent = () => {
    setLastUpdate(null);
    if (location.pathname === '/') {
      setContent(<MainPage onUpdate={setLastUpdate} search={search} category={category} order={order} />);
    }
    if (location.pathname === '/cart') {
      setContent(<CartPage onUpdate={setLastUpdate} />);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      setContent(<MainPage onUpdate={setLastUpdate} search={search} category={category} order={order} />);
    }
    else {
      getContent();
    }
  }, [search, category, order]);

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Header lastUpdate={lastUpdate} onSearch={setSearch} onCategorySelect={setCategory} onOrderSelect={setOrder} />
      {content}
    </>
  )
}

export default App
