import { useEffect, useState } from "react";
import { Cart } from "../Cart/Cart";
import { Logo } from "../Logo/Logo";
import { Search } from "../Search/Search";
import { CategoryController } from "../../controllers/CategoryController";
import { Selector } from "../components/Selector/Selector";
import styles from "./Header.module.scss";

export function Header({ lastUpdate, onSearch, onCategorySelect, onOrderSelect }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryController.getAllCategories().then(all => {
            setCategories([{ id: -1, title: 'Все категории' }, ...all.map(c => ({ id: c.id, title: c.name }))]);
        });
    }, []);

    const goToCart = () => {
        location.href = '/cart';
    }

    const goToHome = () => {
        location.href = '/';
    }

    return (
        <div className={styles.header}>
            <Logo title={'Market'} onClick={goToHome} />
            <div className={styles.right}>
                <Search className={styles.search} onSearch={onSearch} />
                <Selector className={styles.category} options={categories} value={-1} onChange={onCategorySelect} />
                <Selector className={styles.order} options={[{ id: 0, title: 'Сначало дорогое' }, { id: 1, title: 'Сначало дешевое' }]} value={0} onChange={onOrderSelect} />
                <Cart onClick={goToCart} lastUpdate={lastUpdate} />
            </div>
        </div >
    )
}