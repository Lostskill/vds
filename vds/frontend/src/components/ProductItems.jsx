import React from "react";
import { Link } from "react-router-dom";
const ProductItems = ({product,get_product_det}) => {
    return (
        <div className="Product-Items">
            <h3 className="card__top">{product.name}</h3>
            <a className="price">{product.price}</a>
            <a>{product.maker.name}</a>
            <img className="product-photo" src={product.img1} />
            <button className="button" onClick={()=> get_product_det(product.id)} ><Link to='/product/detail'>Подробнее</Link></button>
        </div>
    )
};

export default ProductItems;