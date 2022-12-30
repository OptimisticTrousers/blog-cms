export function apiDomain() {
  const production = import.meta.env.NODE_ENV === "production";
  return production
    ? "https://radiant-ocean-64037.herokuapp.com"
    : "http://localhost:5000";
}
