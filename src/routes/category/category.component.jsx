import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import './category.styles.scss'
import {useSelector} from "react-redux";
import {selectCategoriesLoading, selectCategoriesMap} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesLoading)

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="category-container">
                    {products && products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default Category;
