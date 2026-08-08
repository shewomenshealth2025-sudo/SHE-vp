import { createServer } from "vite";

const server = await createServer({ appType: "custom", logLevel: "error", server: { middlewareMode: true } });
const { addCommunityMetrics } = await server.ssrLoadModule("/src/utils/productReviews.js");

const product = { id: "test", rating: 4, reviews: 1000, score: 8 };
const unchanged = addCommunityMetrics(product, null);
const positive = addCommunityMetrics(product, { rating: 5, comment: "Helpful" });
const negative = addCommunityMetrics(product, { rating: 1, comment: "Not for me" });

const failures = [];
if (unchanged.score !== product.score) failures.push("Products without a new review must keep their score.");
for (const reviewed of [positive, negative]) {
  if (reviewed.rating !== product.rating) failures.push("A device-only review must not change the retailer rating.");
  if (reviewed.reviews !== product.reviews) failures.push("A device-only review must not change the retailer review count.");
  if (reviewed.score !== product.score) failures.push("A device-only review must not change the SHE Score.");
  if (!reviewed.userReview) failures.push("The user's device-only review must remain available on the product.");
}

await server.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Validated device-only review persistence and zero influence on public metrics.");
