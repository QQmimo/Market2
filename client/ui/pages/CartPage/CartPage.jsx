import { useEffect, useState } from "react";
import { ProductController } from "../../../controllers/ProductController";
import { CartController } from "../../../controllers/CartController";
import styles from "./CartPage.module.scss";

export function CartPage() {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        CartController.getProducts().then(products => {
            const all = [];
            for (const product of products) {
                all.push(ProductController.getProduct(product.id));
            }

            Promise.all(all).then(allProducts => {
                setAllProducts(allProducts.map(p => ({ ...p, ...products.find(x => x.id === p.id) })));
            });
        });
    }, []);

    return (
        <div className={styles.page}>
            <table className={styles.table} border={1}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Товар</th>
                        <th>Количество</th>
                        <th>Цена, $ (1шт.)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.count}</td>
                                <td>$ {product.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}