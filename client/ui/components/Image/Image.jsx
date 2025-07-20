import { ImageList } from "./ImageList";
import styles from "./Image.module.scss";

export function Image({ ref, src }) {
    const onImageNotFound = (e) => {
        e.currentTarget.src = ImageList.Noimage;
    }

    return (
        <img
            ref={ref}
            className={styles.image}
            src={src}
            onError={onImageNotFound}
        />
    );
}