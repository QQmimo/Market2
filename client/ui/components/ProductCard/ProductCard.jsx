import { CartController } from "../../../controllers/CartController";
import { Image } from "../Image/Image";
import "./ProductCard.scss";

export function ProductCard({ id, name, category, description, price, images, onAdd }) {
    const mainImage = images.find(image => image.main) ?? images[0];

    const onBuy = () => {
        CartController.addToCart(id).then(() => {
            onAdd?.(new Date());
        });
    }

    return (
        <div className="card">
            <div className="image-controller">
                <Image className="image" src={mainImage.imageUrl} />
            </div>
            <div>{name}</div>
            <div>{description}</div>
            <div>$ {price}</div>
            <button onClick={onBuy}>buy</button>
        </div>
    );
}