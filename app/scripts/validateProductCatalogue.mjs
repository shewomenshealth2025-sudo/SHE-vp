import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const server = await createServer({ appType: "custom", logLevel: "error", server: { middlewareMode: true } });
const { products } = await server.ssrLoadModule("/src/data/products.js");
const { getRetailerDestination, knownRetailers } = await server.ssrLoadModule("/src/utils/retailerLinks.js");
const failures = [];

for (const product of products) {
  if (!product.image) failures.push(`${product.id}: missing image value`);
  if (product.image?.startsWith("/")) {
    const localPath = path.join(appRoot, "public", product.image);
    if (!fs.existsSync(localPath)) failures.push(`${product.id}: local image does not exist (${product.image})`);
  } else if (product.image && !/^https:\/\//.test(product.image)) {
    failures.push(`${product.id}: image is not a local path or HTTPS URL`);
  }

  if (!product.retailers?.length) failures.push(`${product.id}: no retailers`);
  for (const retailer of product.retailers || []) {
    const destination = getRetailerDestination(retailer, product);
    if (!knownRetailers.includes(retailer)) failures.push(`${product.id}: unverified retailer label ${retailer}`);
    if (!/^https:\/\//.test(destination.url)) failures.push(`${product.id}: invalid retailer URL for ${retailer}`);
  }
}

if (!fs.existsSync(path.join(appRoot, "public/products/product-fallback.svg"))) failures.push("Local product fallback image is missing");
await server.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${products.length} product images, retailer labels and official destinations.`);
