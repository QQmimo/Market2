import { useEffect, useState } from "react";
import { Image } from "../Image/Image";
import styles from "./ImageRotator.module.scss";

export function ImageRotator({ images = [], sliderDelay = 5000 }) {
    const getInitIndex = function () {
        const index = (images ?? []).findIndex(image => image.main);
        return index === -1 ? 0 : index;
    };
    const getNextIndex = function (current) {
        const index = (current ?? getInitIndex()) + 1;
        return images[index] ? index : 0;
    };

    const [indexes, setIndexes] = useState({ current: getInitIndex(), next: getNextIndex() });
    

    useEffect(() => {
        setTimeout(() => {
            setIndexes(prevState => ({ current: getNextIndex(prevState.current), next: getNextIndex(prevState.next) }));
        }, sliderDelay);
    }, [indexes]);

    return (
        <div className={styles.images}>
            <Image src={images[indexes.current]?.imageUrl} />
            <Image src={images[indexes.next]?.imageUrl} />
        </div>
    );
}