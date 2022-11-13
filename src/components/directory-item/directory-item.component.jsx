import "./directory-item.styles";
import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";

export const DirectoryItem = ({category}) => {
    const {title, imageUrl, route} = category;

    const navigate = useNavigate();
    return (
        <DirectoryItemContainer onClick={() => navigate(route)}>
            <BackgroundImage imageUrl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    );
};
