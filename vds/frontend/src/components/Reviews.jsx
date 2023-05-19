import React from "react";

const Reviews = ({review}) => {
    console.log(review);
    return (
        <div className="review-item">
            {review.text}
            {review.created_at}
            {review.rating}
        </div>
    );
};

export default Reviews;