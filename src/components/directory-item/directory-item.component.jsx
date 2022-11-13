import "./directory-item.styles";
import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";

export const DirectoryItem = ({category}) => {
    const {title, imageUrl} = category
    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    );
};
