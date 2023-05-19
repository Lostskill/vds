import React,{useEffect,useState} from "react";
import VdsServices from "./API/VdsService";
import ReviewsList from "./ReviewsList";
const ProductDetail = ({ product_id, addItems }) => {
    const [product_detail, setProductDetail] = useState();
    const [review, setReview] = useState();
    const [rating, setRating] = useState({rating:''});
    const [disc, setDisc] = useState({ description: '' })
    const auth = localStorage.getItem('auth');
    const authe = JSON.parse(auth);



    useEffect(() => {
        getProductDetail(product_id)
    },[])

    async function post_review(review_post) {
        const token = localStorage.getItem('token');
        const review = await VdsServices.post_review(review_post,{ Authorization: 'Token ' + JSON.parse(token) })
        console.log(review);
    };


    const addNewReview = (e) => {
        e.preventDefault();
        console.log(product_id)
        const newPost = {
            text: disc.description,
            product: product_id,
            rating: Number(rating.rating)
        };
        post_review(newPost);
    };

    async function getProductDetail(product_id) {
        const product = await VdsServices.get_product_detail(product_id);
        setProductDetail(product);
        setReview(product.reviews);
    }

    return (
        <div>
             {product_detail != undefined
                ? (
                    <div className="product-detail">
                        <h1>{product_detail.name}</h1>
                        <h2>{product_detail.maker.name}</h2>
                        <div className="cont">
                            <div className="box"><img src={product_detail.img1} /></div>
                            <div className="box"><img src={product_detail.img2} /></div>
                        </div>
                        <button className="btn" onClick={()=>addItems(product_detail)} >Добавить в корзину</button>
                        <a className='det-price'>{product_detail.price}</a>
                        
                        <div className="desc"><a>{product_detail.description}</a><tr /></div>
                        {product_detail.reviews !== undefined
                            ? < ReviewsList reviews={product_detail.reviews} />
                            :''
                        }

                        {authe === true
                            ? (<div><h3>Оставить отзыв:</h3>
                                <form>
                                <input type='text' placeholder='Текст' value={disc.description} onChange={e => setDisc({ description: e.target.value })}  />
                                    <input type='text' placeholder='Рейтинг (от 0 до 10)' value={rating.rating} onChange={e => setRating({ rating: e.target.value })}></input>
                                <button className='btn' onClick={addNewReview}  >Отправить</button>
                                </form>
                            </div>)
                            :('')
                        }
                </div>
                )
                : ('')
        }

        </div>
    )
}

export default ProductDetail;