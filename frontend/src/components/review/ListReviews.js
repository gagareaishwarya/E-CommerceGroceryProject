import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div class="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews &&
        reviews.map((
          review //if review exist
        ) => (
          //map to reviews  and using id display name of the user
          // who have given review and display that comment.
          <div key={review._id} class="review-card my-3">
            <div class="rating-outer">
              <div
                class="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p class="review_user">by {review.name}</p>
            <p class="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
