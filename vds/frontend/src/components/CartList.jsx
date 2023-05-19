import React from "react";
import CartItems from './CartItems';
const CartList = ({ items }) => {
    console.log(items);
    return (
        <div>   
            {items.map((item) => {
                <CartItems item={item}/>
            })};
        </div> 
    );
};

export default CartList;