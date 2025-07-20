import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductController } from "../../../controllers/ProductController";
import styles from "./MainPage.module.scss";

export function MainPage({ search = "", category = -1, order = 0, onUpdate }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductController.searchProducts(search).then(products => {
            if (order === 0) {
                products = products.sort((a, b) => b.price - a.price);
            }
            else {
                products = products.sort((a, b) => a.price - b.price);
            }
            products = products.filter(p => category === -1 || p.category.id === category)

            setProducts(products);
        });
    }, [search, order, category]);

    return (
        <div className={styles.page}>
            {
                products.length === 0 && search.length > 0
                    ? <div>Ничего не найдено.</div>
                    : null
            }
            {products.map(product => <ProductCard key={product.id} {...product} onAdd={onUpdate} />)}
        </div>
    );
}