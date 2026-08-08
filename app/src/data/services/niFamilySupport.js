const hubDefaults = {
  country: "Northern Ireland",
  type: "Community",
  topic: "Support & wellbeing",
  speciality: "Local early-intervention family support and signposting through the Northern Ireland Family Support Hub network.",
  referralRoute: "Contact the hub coordinator directly to discuss support and referral options.",
  acceptsSelfReferral: true,
  servicesOffered: ["Family support coordination", "Early-intervention signposting", "Local service referrals"],
  suitableFor: ["Parents and carers", "Families with a child or young person aged up to 18", "Families looking for coordinated local support"],
  lastVerified: "2026-08-08",
};

const hubs = [
  ["Antrim and Ballymena Family Support Hub", "Antrim / Ballymena", 54.8643, -6.2763, "028 9446 7345", "Familysupporthubs@actionforchildren.org.uk", "northern-family-support-hubs"],
  ["Coleraine, Ballymoney and Moyle Family Support Hub", "Coleraine / Ballymoney / Moyle", 55.1326, -6.6688, "028 9446 7345", "Familysupporthubs@actionforchildren.org.uk", "northern-family-support-hubs"],
  ["Cookstown and Magherafelt Family Support Hub", "Cookstown / Magherafelt", 54.6464, -6.7452, "028 9446 7345", "Familysupporthubs@actionforchildren.org.uk", "northern-family-support-hubs"],
  ["Larne and Carrickfergus Family Support Hub", "Larne / Carrickfergus", 54.851, -5.817, "028 9446 7345", "Familysupporthubs@actionforchildren.org.uk", "northern-family-support-hubs"],
  ["Newtownabbey Family Support Hub", "Newtownabbey", 54.659, -5.908, "028 9446 7345", "Familysupporthubs@actionforchildren.org.uk", "northern-family-support-hubs"],
  ["North Down and Ards Family Support Hub", "North Down / Ards", 54.593, -5.695, "028 9250 1357", "Familysupporthubs@setrust.hscni.net", "south-eastern-family-support-hubs"],
  ["Down Sector Family Support Hub", "Downpatrick and surrounding area", 54.3288, -5.7157, "028 9250 1357", "Familysupporthubs@setrust.hscni.net", "south-eastern-family-support-hubs"],
  ["Greater Lisburn Family Support Hub", "Lisburn", 54.5162, -6.058, "028 9250 1357", "Familysupporthubs@setrust.hscni.net", "south-eastern-family-support-hubs"],
  ["Armagh and Dungannon Family Support Hub", "Armagh / Dungannon", 54.4207, -6.4448, "07514 724926", "familysupporthub@barnardos.org.uk", "southern-family-support-hubs"],
  ["Portadown, Craigavon and Banbridge Family Support Hub", "Portadown / Craigavon / Banbridge", 54.4514, -6.392, "028 3833 1168", "lisa@niacro.co.uk", "southern-family-support-hubs"],
  ["Newry and Mourne Family Support Hub", "Newry / Mourne", 54.1751, -6.3402, "028 3083 5764", "familysupporthub@bolstercommunity.org", "southern-family-support-hubs"],
  ["Family First Family Support Hub", "Derry / Londonderry", 54.9966, -7.3086, "028 7137 3870", "Familyfirsthub@olt.ie", "western-family-support-hubs"],
  ["Dry Arch Family Support Hub", "Limavady", 55.051, -6.949, "028 7774 2904", "donna.okane@dryarchcentre.co.uk", "western-family-support-hubs"],
  ["Fermanagh Family Support Hub", "Fermanagh", 54.3438, -7.6315, "028 6632 4181", "donna.gormley@actionforchildren.org.uk", "western-family-support-hubs"],
  ["Omagh Family Support Hub", "Omagh", 54.6, -7.302, "028 8225 9495", "seana.connor@actionforchildren.org.uk", "western-family-support-hubs"],
  ["ETHOS Family Support Hub", "Derry / Londonderry", 55.0068, -7.294, "028 7135 8787", "martin@shantallow.net", "western-family-support-hubs"],
  ["Outer West Family Support Hub", "Outer West Derry / Londonderry", 54.994, -7.33, "028 7126 9833", "cathyfs@dunlucefamilycentre.co.uk", "western-family-support-hubs"],
  ["Strabane Family Support Hub", "Strabane", 54.8273, -7.4639, "028 7138 2658", "Shauna.devine@barnardos.org.uk", "western-family-support-hubs"],
  ["Waterside Family Support Hub", "Waterside, Derry / Londonderry", 54.994, -7.286, "028 7132 9444", "watersidehub@actionforchildren.org.uk", "western-family-support-hubs"],
];

export const niFamilySupportServices = hubs.map(
  ([name, locationName, latitude, longitude, phone, email, page], index) => ({
    ...hubDefaults,
    id: `ni-family-support-hub-${index + 1}`,
    name,
    locationName,
    address: locationName,
    latitude,
    longitude,
    phone,
    email,
    website: `https://cypsp.hscni.net/family-support-hubs/${page}/`,
    sourceUrl: `https://cypsp.hscni.net/family-support-hubs/${page}/`,
  }),
);
