import { readFileSync } from "node:fs";
import { communitySupportServices } from "../src/data/services/communitySupport.generated.js";
import { niFamilySupportServices } from "../src/data/services/niFamilySupport.js";

const errors = [];
const ids = new Set();
const services = [...communitySupportServices, ...niFamilySupportServices];
const mapSource = readFileSync(new URL("../src/components/RealServiceMap.jsx", import.meta.url), "utf8");

if (!mapSource.includes('querySelectorAll(".she-cluster-shell, .marker-cluster")')) {
  errors.push("Custom map clusters must receive descriptive accessibility labels.");
}

if (services.length !== 100) {
  errors.push(`Expected 100 new services; found ${services.length}.`);
}

for (const service of services) {
  if (ids.has(service.id)) errors.push(`Duplicate id: ${service.id}`);
  ids.add(service.id);

  for (const field of ["name", "address", "phone", "email", "website", "sourceUrl"]) {
    if (!service[field]) errors.push(`${service.id}: missing ${field}`);
  }

  if (!/^https?:\/\//.test(service.website)) errors.push(`${service.id}: invalid website`);
  if (!/^https?:\/\//.test(service.sourceUrl)) errors.push(`${service.id}: invalid source URL`);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(service.email)) errors.push(`${service.id}: invalid email`);
  if (!Number.isFinite(service.latitude) || !Number.isFinite(service.longitude)) {
    errors.push(`${service.id}: invalid coordinates`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${services.length} complete service records across Northern Ireland and the Republic of Ireland.`);
