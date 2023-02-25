import {Route, Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import {useDispatch} from "react-redux";
import {lazy, Suspense, useEffect} from "react";
import {checkUserSession} from "./store/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import {GlobalStyle} from "./global.styles";

const Home = lazy(() => import("./routes/home/home.component"));
const SignIn = lazy(() => import("./routes/authentication/authentication.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserSession())
    }, [dispatch])

    return (
        <Suspense fallback={<Spinner/>}>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<Home/>}/>
                    <Route path="shop/*" element={<Shop/>}/>
                    <Route path="auth" element={<SignIn/>}/>
                    <Route path="checkout" element={<Checkout/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
