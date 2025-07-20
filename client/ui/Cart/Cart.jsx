import { Image } from "../components/Image/Image";
import { CountBubble } from "../components/CountBubble/CountBubble";
import { ImageList } from "../components/Image/ImageList";
import { CartController } from "../../controllers/CartController";
import { useEffect, useState } from "react";
import styles from "./Cart.module.scss";

export function Cart({ lastUpdate, onClick }) {
    const [number, setNumber] = useState(0);

    useEffect(() => {
        CartController.getProductsCount().then(count => {
            setNumber(count);
        });
    }, [lastUpdate]);

    return (
        <div className={styles.cart} onClick={onClick}>
            <CountBubble number={number} />
            <Image className={styles.image} src={ImageList.Cart} />
        </div>
    );
}