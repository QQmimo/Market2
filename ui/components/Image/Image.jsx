import { ImageList } from "./ImageList";
import "./Image.scss";

export function Image({ src }) {
    const onImageNotFound = (e) => {
        e.currentTarget.src = ImageList.Noimage;
    }

    return (
        <img
            className={"image"}
            src={src}
            onError={onImageNotFound}
        />
    );
}