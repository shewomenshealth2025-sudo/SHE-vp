const RETAILERS = {
  Amazon: { url: "https://www.amazon.co.uk/s?k=", affiliate: true },
  Boots: { url: "https://www.boots.com/sitesearch?searchTerm=" },
  Superdrug: { url: "https://www.superdrug.com/search?q=" },
  Tesco: { url: "https://www.tesco.com/groceries/en-GB/search?query=" },
  "Holland & Barrett": { url: "https://www.hollandandbarrett.com/search/?query=" },
  "John Lewis": { url: "https://www.johnlewis.com/search?search-term=" },
  Currys: { url: "https://www.currys.co.uk/search?q=" },
  Waterstones: { url: "https://www.waterstones.com/books/search/term/" },
  Pharmacy: { url: "https://www.boots.com/health-pharmacy" },
  "App Store": { url: "https://apps.apple.com/gb/search?term=" },
  "Google Play": { url: "https://play.google.com/store/search?q=", suffix: "&c=apps" },
  Amoena: { url: "https://www.amoena.com/uk-en/" },
  BeYou: { url: "https://beyouonline.co.uk/" },
  Become: { url: "https://becomeclothing.com/" },
  Beurer: { url: "https://www.beurer.com/uk/" },
  Bravado: { url: "https://bravadodesigns.com/" },
  DAME: { url: "https://wearedame.co/" },
  Daye: { url: "https://www.yourdaye.com/" },
  Dunelm: { url: "https://www.dunelm.com/search?q=" },
  Elvie: { url: "https://www.elvie.com/en-gb" },
  FLUX: { url: "https://fluxies.co.uk/" },
  Fitbit: { url: "https://www.fitbit.com/global/uk/home" },
  JML: { url: "https://www.jmldirect.com/" },
  Manta: { url: "https://mantasleep.uk/" },
  Mira: { url: "https://www.miracare.com/" },
  Modibodi: { url: "https://www.modibodi.co.uk/" },
  Mooncup: { url: "https://www.mooncup.co.uk/" },
  MyOovi: { url: "https://myoovi.co.uk/" },
  Myvitamins: { url: "https://www.myvitamins.com/" },
  NEOM: { url: "https://neomwellbeing.com/" },
  "Natural Cycles": { url: "https://www.naturalcycles.com/" },
  Nixit: { url: "https://nixit.com/" },
  Saalt: { url: "https://saalt.com/" },
  Seraphine: { url: "https://www.seraphine.com/en-gb/" },
  Symprove: { url: "https://www.symprove.com/" },
  TOTM: { url: "https://www.totm.com/" },
  Tempdrop: { url: "https://www.tempdrop.com/" },
  WUKA: { url: "https://wuka.co.uk/" },
  YES: { url: "https://www.yesyesyes.org/" },
  bbhugme: { url: "https://bbhugme.com/" },
};

export function getRetailerDestination(retailer, product) {
  const destination = RETAILERS[retailer];
  if (!destination) return { url: "https://www.google.com/search?q=" + encodeURIComponent(`${retailer} ${product.brand} ${product.name}`), affiliate: false };

  const isSearch = destination.url.endsWith("=") || destination.url.endsWith("/") && retailer === "Waterstones";
  const query = encodeURIComponent(`${product.brand} ${product.name}`);
  return {
    url: isSearch ? `${destination.url}${query}${destination.suffix || ""}` : destination.url,
    affiliate: Boolean(destination.affiliate),
  };
}

export const knownRetailers = Object.keys(RETAILERS);
