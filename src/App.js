import {Route, Routes} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {authListener, createUserDocumentFromAuth} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unSubscribe = authListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        })

        return () => {
            unSubscribe()
        }
    }, [dispatch])

    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="shop/*" element={<Shop/>}/>
                <Route path="auth" element={<SignIn/>}/>
                <Route path="checkout" element={<Checkout/>}/>
            </Route>
        </Routes>
    );
};

export default App;
