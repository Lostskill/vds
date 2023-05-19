import React from "react";

const HistoryItems = ({item}) => {
    console.log(item);
    return (
        
        <div>
            <a>{String(item.is_paid)}</a>
            <a>{item.product.name}</a>
            <a>{item.price}</a>
            <img src={item.product.img1} />
        </div>
    );
};

export default HistoryItems;