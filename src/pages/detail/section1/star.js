import StarRatings from 'react-star-ratings';
function Star({ rating }) {
    return (
        <StarRatings
            rating={rating}
            numberOfStars={5}
            starRatedColor='rgb(230, 67, 47)'
            starDimension="17px"
            starSpacing="1px"
        />
    );
}

export default Star;
