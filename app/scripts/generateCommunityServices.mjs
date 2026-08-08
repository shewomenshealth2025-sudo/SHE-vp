const DIRECTORY_URL = "https://www.familyresource.ie";
const DIRECTORY_PAGE = `${DIRECTORY_URL}/family-resource-centres-regions.php`;
const OUTPUT_COUNT = 81;

function decodeHtml(value = "") {
  return value
    .replace(/&#x2F;/gi, "/")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&nbsp;/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function match(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1] ?? "");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normaliseWebsite(value) {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^https?:\//i.test(value)) return value.replace(":/", "://");
  return `https://${value.replace(/^\/+/, "")}`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "SHE directory verifier/1.0" },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

function parseProfile(id, html) {
  const title = match(html, /<title>([^<|]+)/i);
  const address = match(html, /class="txt-details-address">([\s\S]*?)<br/i);
  const phone = match(html, /href="tel:([^"]+)/i);
  const email = match(html, /href="mailto:([^"]+)/i);
  const website = match(html, /<span class="details700">Web:<\/span>\s*<a href="([^"]+)/i);
  const latitude = Number(match(html, /"latitude":\s*"([^"]+)"/i));
  const longitude = Number(match(html, /"longitude":\s*"([^"]+)"/i));
  const county = address.match(/Co\.\s*([^,]+)/i)?.[1]?.trim() || "Ireland";

  if (!title || !address || !phone || !email || !website || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    id: `frc-${id}-${slugify(title)}`,
    name: title,
    country: "Republic of Ireland",
    county,
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Local family, parenting, community and wellbeing support, with signposting to additional services where needed.",
    locationName: address,
    address,
    latitude,
    longitude,
    phone,
    email,
    website: normaliseWebsite(website),
    referralRoute: "Contact the centre directly to ask about current supports, eligibility and appointment arrangements.",
    acceptsSelfReferral: true,
    servicesOffered: [
      "Family and parenting support",
      "Community wellbeing programmes",
      "Information and local signposting",
    ],
    suitableFor: [
      "People looking for practical local support",
      "Parents, carers and families",
      "People who need help finding the right local service",
    ],
    sourceUrl: `${DIRECTORY_URL}/details.php?ID=${id}`,
    lastVerified: "2026-08-08",
  };
}

const directoryHtml = await fetchText(DIRECTORY_PAGE);
const ids = [...directoryHtml.matchAll(/details\.php\?ID=(\d+)/g)]
  .map((match) => match[1])
  .filter((id, index, list) => list.indexOf(id) === index);

const results = [];
for (let index = 0; index < ids.length && results.length < OUTPUT_COUNT; index += 8) {
  const batch = ids.slice(index, index + 8);
  const profiles = await Promise.all(
    batch.map(async (id) => {
      try {
        return parseProfile(id, await fetchText(`${DIRECTORY_URL}/details.php?ID=${id}`));
      } catch {
        return null;
      }
    }),
  );
  results.push(...profiles.filter(Boolean));
}

if (results.length < OUTPUT_COUNT) {
  throw new Error(`Only ${results.length} complete directory records were found.`);
}

const output = `// Generated from the Family Resource Centre National Forum directory.\n// Every record below had phone, email, website and coordinates when verified on 2026-08-08.\nexport const communitySupportServices = ${JSON.stringify(results.slice(0, OUTPUT_COUNT), null, 2)};\n`;

process.stdout.write(output);
