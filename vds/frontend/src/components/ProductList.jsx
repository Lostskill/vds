import React, {useState,useEffect} from "react";
import VdsServices from "./API/VdsService";
import ProductItems from "./ProductItems";
const ProductList = ({ cat_id, sub_id,get_product_det }) => {
    const [product, setProduct] = useState();

    useEffect(() => {
        getProduct(cat_id, sub_id)
    },[sub_id]);

    async function getProduct(cat_id, sub_id) {
        const list_product = await VdsServices.get_product(cat_id, sub_id);
        setProduct(list_product);
    };
    
    return (
        <div className="product-block">
        {product !== undefined
                ?<div> {product.map((product) =>
                    <ProductItems product={product} get_product_det={get_product_det } />
                    )}</div>

                : 'pass'
        }

        </div>

    )
};

export default ProductList;