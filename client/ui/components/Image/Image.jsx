import { ImageList } from "./ImageList";
import "./Image.scss";

export function Image({ src, onClick }) {
    const imageStyle = onClick ? "image clicked" : "image";

    const onImageNotFound = (e) => {
        e.currentTarget.src = ImageList.Noimage;
    }

    return (
        <img
            className={imageStyle}
            onClick={onClick}
            src={src}
            onError={onImageNotFound}
        />
    );
}