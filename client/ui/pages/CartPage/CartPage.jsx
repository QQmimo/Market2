import { useEffect, useState } from "react";
import { ProductController } from "../../../controllers/ProductController";
import { CartController } from "../../../controllers/CartController";
import { Counter } from "../../components/Counter/Counter";
import styles from "./CartPage.module.scss";

export function CartPage({ onUpdate }) {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const update = () => {
        CartController.getProducts().then(products => {
            const all = [];
            for (const product of products) {
                all.push(ProductController.getProduct(product.id));
            }

            Promise.all(all).then(allProducts => {
                setAllProducts(allProducts.map(p => ({ ...p, ...products.find(x => x.id === p.id) })));
            });
        });
    }

    useEffect(() => {
        update();
    }, []);

    useEffect(() => {
        const total = allProducts.reduce((a, b) => a + (b.price * b.count), 0);
        setTotal(parseFloat(total).toFixed(2));
    }, [allProducts]);

    const onChange = (id, count) => {
        if (count === 0) {
            CartController.deleteFromCart(id).then(() => {
                update();
                onUpdate?.(new Date());
            });
        }
        else {
            CartController.changeCount(id, count)
                .then(() => {
                    update();
                    onUpdate?.(new Date());
                });
        }
    }

    if (allProducts.length === 0) {
        return (
            <div className={styles.page}>В корзине нет товаров</div>
        );
    }

    return (       
        <div className={styles.page}>
            <table className={styles.table} border={1}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Товар</th>
                        <th>Количество</th>
                        <th>Цена, $ (1шт.)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>
                                    <Counter value={product.count} min={0} onChange={(count) => onChange(product.id, count)} />
                                </td>
                                <td>$ {product.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className={styles.total}>ИТОГО К ОПЛАТЕ:</td>
                        <td>$ {total}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}