import { observer } from 'mobx-react-lite';
import React from 'react';
import Review from "./Review";

const ReviewList = observer(({reviews}) => {
    return (
        <div className='reviews'>
            {reviews.map(review =>
                <Review key={review.id} review={review} />
            )}
        </div>
    );
});

export default ReviewList;