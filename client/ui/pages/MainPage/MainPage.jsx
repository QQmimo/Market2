import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductController } from "../../../controllers/ProductController";
import { ImageRotator } from "../../components/ImageRotator/ImageRotator";
import "./MainPage.scss";

export function MainPage({ search = "", onUpdate }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductController.searchProducts(search).then(products => {
            setProducts([products[0]]);
        });
    }, [search]);

    return (
        <div className="page">
            {
                products.length === 0 && search.length > 0
                    ? <div>Ничего не найдено.</div>
                    : null
            }
            {products.map(product => <ProductCard key={product.id} {...product} onAdd={onUpdate} />)}
        </div>
    );
}