export const PRODUCT_REVIEWS_KEY = "she-product-reviews-v1";

export function readProductReviews() {
  try {
    return JSON.parse(window.localStorage.getItem(PRODUCT_REVIEWS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function addCommunityMetrics(product, review) {
  if (!review) return product;

  const priorWeight = Math.min(Math.max(product.reviews || 0, 1), 50);
  const rating = ((product.rating * priorWeight) + review.rating) / (priorWeight + 1);
  const scoreAdjustment = (rating - product.rating) * 0.4;

  return {
    ...product,
    rating,
    reviews: (product.reviews || 0) + 1,
    score: Math.max(0, Math.min(10, product.score + scoreAdjustment)),
    userReview: review,
  };
}
