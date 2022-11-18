import {Fragment} from "react";
import {Outlet} from "react-router-dom";

import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import "./navigation.styles";
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectCartOpen} from "../../store/cart/cart.selector";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const cartOpen = useSelector(selectCartOpen);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer className="logo-container" to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/shop">
                        Shop
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' className="nav-link" onClick={signOutUser}>
                          Sign Out
                        </NavLink>
                    ) : (
                        <NavLink to="/auth">
                            Sign In
                        </NavLink>
                    )}
                    <CartIcon/>
                </NavLinks>
                {cartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
};

export default Navigation;
