import { useEffect, useState } from "react";
import { CartController } from "../../../controllers/CartController";
import { Counter } from "../Counter/Counter";
import { Image } from "../Image/Image";
import styles from "./ProductCard.module.scss";

export function ProductCard({ id, name, category, description, price, images, count, onAdd }) {
    const [countInCart, setСountInCart] = useState(count);

    const onBuy = () => {
        CartController.addToCart(id).then(() => {
            onAdd?.(new Date());
        });
    }

    const onChange = (value) => {
        if (value == 0) {
            CartController.deleteFromCart(id).then(() => {
                onAdd?.(new Date());
            });
        }
        else {
            CartController.changeCount(id, value).then(() => {
                onAdd?.(new Date());
            });
        }
    }

    useEffect(() => {
        setСountInCart(count);
    }, [count]);

    return (
        <div className={styles.card}>
            <div className={styles["image-controller"]}>
                <Image src={(images.find(image => image.main) ?? image[0])?.imageUrl} />
            </div>
            <div>{name}</div>
            <div>{description}</div>
            <div className={styles.price}>$ {price}</div>
            {
                countInCart > 0
                    ? <div className={styles.cart_actions}>
                        <div>Уже корзине</div>
                        <Counter value={countInCart} onChange={onChange} />
                        <button onClick={() => onChange(0)}>Убрать из корзины</button>
                    </div>
                    : <button onClick={onBuy}>Купить</button>
            }
        </div>
    );
}