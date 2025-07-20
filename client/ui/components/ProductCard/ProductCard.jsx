import { CartController } from "../../../controllers/CartController";
import { ImageRotator } from "../ImageRotator/ImageRotator";
import styles from "./ProductCard.module.scss";

export function ProductCard({ id, name, category, description, price, images, onAdd }) {
    const onBuy = () => {
        CartController.addToCart(id).then(() => {
            onAdd?.(new Date());
        });
    }

    return (
        <div className={styles.card}>
            <div className={styles["image-controller"]}>
                <ImageRotator images={images} />
            </div>
            <div>{name}</div>
            <div>{description}</div>
            <div>$ {price}</div>
            <button onClick={onBuy}>buy</button>
        </div>
    );
}