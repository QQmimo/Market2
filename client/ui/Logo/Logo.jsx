import { Image } from "../components/Image/Image";
import { ImageList } from "../components/Image/ImageList";
import styles from "./Logo.module.scss";

export function Logo({ title, onClick = () => { } }) {
    return (
        <div className={styles.logo} onClick={onClick}>
            <div className={styles.rotate}>
                <Image src={ImageList.Logo} />
            </div>
            <div className={styles.title}>
                {title}
            </div>
        </div>
    );
}