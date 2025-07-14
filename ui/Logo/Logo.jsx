import { Image } from "../components/Image/Image";
import { ImageList } from "../components/Image/ImageList";
import "./Logo.scss";

export function Logo({ title, onClick = () => {} }) {
    return (
        <div className="logo" onClick={onClick}>
            <div className="rotate">
                <Image className="iamge" src={ImageList.Logo} />
            </div>
            <div className="title">
                {title}
            </div>
        </div>
    );
}