import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";
import {fetchCategoriesAsync} from "../../store/categories/categories.action";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    );
};

export default Shop;
