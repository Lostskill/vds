import React, {useState} from "react";

const Cart = ({order,deleteOrder}) => {
    console.log(order.items);
    const [quantity, setQuantity] = useState(1)

    function increment() {
        setQuantity(quantity + 1)
    };

    function decrement() {
        setQuantity(quantity - 1)
    }

    return (
        <div>
            <h1>Корзина</h1>
            {order.items.map((items) => (
                <div><a>{items.name}</a>
                    <a>{items.price}</a>
                    <img src={items.img1} />
                    <button onClick={() => deleteOrder(items.id)} className='btn'>Удалить</button>
                    <a>{quantity }</a>
                    <button onClick={() => increment()} className='btn' style={{margin:'10px'}}> Увеличить кол-во</button>
                    {quantity > 1
                        ?<button onClick={() => decrement()} className='btn'>Уменшить кол-во</button>
                        :''
                    }
                    <form action={`http://127.0.0.1:8000/api/vds/create-checkout-session/${items.id}/${quantity}`} method="POST" >
                        <button type="submit" className="btn">Зделать заказ</button>
                    </form>
                    
                </div>
            ))}
        </div>
    )
};

export default Cart;