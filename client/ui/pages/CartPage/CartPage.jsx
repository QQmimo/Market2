import { useEffect, useState } from "react";
import { ProductController } from "../../../controllers/ProductController";
import { CartController } from "../../../controllers/CartController";

export function CartPage() {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        CartController.getProducts().then(products => {
            const all = [];
            for(const product of products) {
                all.push(ProductController.getProduct(product.id));
            }

            Promise.all(all).then(allProducts => {
                setAllProducts(allProducts);
            });
        });
    }, []);

    return (
        <div>
            {
                allProducts.map(product => <div><div>{product.name}</div><div>{product.count}</div></div>)
            }
        </div>
    );
}