import React from "react";
import Reviews from "./Reviews";
const ReviewsList = ({reviews}) => {
    return (
        <div className="review-box">
            {reviews.map((review, index) => (
                <Reviews ket={index} review={review}/>
            ))}
        </div>
    )
};

export default ReviewsList;