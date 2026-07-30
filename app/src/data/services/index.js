import { serviceDatabase } from "./database";

export const allIrelandServices = serviceDatabase;

export function getServiceById(serviceId) {
  return serviceDatabase.find(
    (service) => service.id === serviceId
  );
}

export function getServicesByTopic(topic) {
  if (!topic || topic === "All") {
    return serviceDatabase;
  }

  const normalisedTopic = topic.toLowerCase();

  return serviceDatabase.filter((service) =>
    String(service.topic || "")
      .toLowerCase()
      .includes(normalisedTopic)
  );
}

export function getServicesByCountry(country) {
  if (!country || country === "All") {
    return serviceDatabase;
  }

  return serviceDatabase.filter(
    (service) =>
      String(service.country || "").toLowerCase() ===
      country.toLowerCase()
  );
}

export function getServicesByCounty(county) {
  if (!county || county === "All") {
    return serviceDatabase;
  }

  return serviceDatabase.filter(
    (service) =>
      String(service.county || "").toLowerCase() ===
      county.toLowerCase()
  );
}

export function getServicesByType(type) {
  if (!type || type === "All") {
    return serviceDatabase;
  }

  return serviceDatabase.filter(
    (service) =>
      String(service.type || "").toLowerCase() ===
      type.toLowerCase()
  );
}

export function searchServices(searchTerm) {
  const query = String(searchTerm || "")
    .trim()
    .toLowerCase();

  if (!query) {
    return serviceDatabase;
  }

  return serviceDatabase.filter((service) => {
    const searchableContent = [
      service.name,
      service.type,
      service.topic,
      service.speciality,
      service.locationName,
      service.address,
      service.county,
      service.country,
      service.referralRoute,
      ...(service.servicesOffered || []),
      ...(service.suitableFor || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(query);
  });
}