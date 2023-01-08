export function apiDomain() {
  const production = import.meta.env.NODE_ENV === "production";
  return production
    ? "https://optimistic-blog-api.herokuapp.com/api"
    : "http://localhost:5000/api";
}

export function s3Domain() {
  return "https://optimisticbucket.s3.amazonaws.com/uploads";
}
