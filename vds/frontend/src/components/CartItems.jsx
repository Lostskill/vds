import React from "react";

const CartItems = ({ item ,i}) => {
    console.log(item)
    return (
        <div key={i}>
            <a>{item.name}</a>
            <a>{item.price}</a>
            <a>{item.maker}</a>
        </div>
    );
};

export default CartItems;