export default function GetAvgRating(ratingArr) {
    if(ratingArr?.length === 0) return 0;

    const totalReviewCheck = ratingArr?.reduce((acc, currVal) => {
        acc += currVal.rating;
        return acc; 
    }, 0);

    const multiplier = Math.pow(10, 1);

    const avgRating = Math.round((totalReviewCheck / ratingArr?.length) * multiplier) / multiplier;

    return avgRating;
}
