import React from "react";
import Cart from "../components/Cart";
const CartPage = ({order,deleteOrder,checkout}) => {
    return (
        <Cart order={order} deleteOrder={deleteOrder} checkout={checkout} />
    )
};

export default CartPage;