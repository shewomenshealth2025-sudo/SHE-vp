import { createServer } from "vite";

const server = await createServer({ appType: "custom", logLevel: "error", server: { middlewareMode: true } });
const { addCommunityMetrics } = await server.ssrLoadModule("/src/utils/productReviews.js");

const product = { id: "test", rating: 4, reviews: 1000, score: 8 };
const unchanged = addCommunityMetrics(product, null);
const positive = addCommunityMetrics(product, { rating: 5, comment: "Helpful" });
const negative = addCommunityMetrics(product, { rating: 1, comment: "Not for me" });

const failures = [];
if (unchanged.score !== product.score) failures.push("Products without a new review must keep their score.");
if (positive.rating <= product.rating || positive.score <= product.score) failures.push("A positive review must raise rating and score.");
if (negative.rating >= product.rating || negative.score >= product.score) failures.push("A negative review must lower rating and score.");
if (Math.abs(positive.score - product.score) > 0.5 || Math.abs(negative.score - product.score) > 0.5) failures.push("One review must not overpower the evidence-led score.");
if (positive.reviews !== product.reviews + 1) failures.push("Review count must increase exactly once.");

await server.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Validated review persistence metrics and bounded SHE Score influence.");
