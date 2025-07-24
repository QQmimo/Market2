import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductController } from "../../../controllers/ProductController";
import { CartController } from "../../../controllers/CartController";
import styles from "./MainPage.module.scss";

export function MainPage({ search = "", category = -1, order = 0, onUpdate }) {
    const [products, setProducts] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        ProductController.searchProducts(search).then(foundedProducts => {
            if (order === 0) {
                foundedProducts = foundedProducts.sort((a, b) => b.price - a.price);
            }
            else {
                foundedProducts = foundedProducts.sort((a, b) => a.price - b.price);
            }
            foundedProducts = foundedProducts.filter(p => category === -1 || p.category.id === category)

            CartController.getProducts().then(productsInCart => {
                foundedProducts = foundedProducts.map(foundedProduct => {
                    const foundInCart = productsInCart.find(x => x.id === foundedProduct.id);
                    if (foundInCart) {
                        foundedProduct.count = Number(foundInCart.count);
                    }
                    return foundedProduct;
                });

                setProducts(foundedProducts);
            });
        });
    }, [search, order, category, date]);

    const onAdd = (date) => {
        setDate(date);
        onUpdate?.(date);
    }

    return (
        <div className={styles.page}>
            {
                (products ?? []).length === 0 && search.length > 0
                    ? <div>Ничего не найдено.</div>
                    : null
            }
            {(products ?? []).map(product => <ProductCard key={product.id} {...product} onAdd={onAdd} />)}
        </div>
    );
}