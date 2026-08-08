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

  return {
    ...product,
    userReview: review,
  };
}
