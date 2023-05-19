import React from "react";
import ProductList from "../components/ProductList";
function ProductLists({ cat_id ,sub_id,get_product_det}){
    return (
        <div>
            <ProductList cat_id={cat_id} sub_id={sub_id} get_product_det={get_product_det} />
        </div>
    )
};

export default ProductLists;