export function apiDomain() {
  const production = import.meta.env.NODE_ENV === "production";
  return production
    ? "https://optimistic-blog-api.herokuapp.com/api"
    : "http://localhost:5000/api";
}
