import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const useFetch = (url = "http://localhost:5000/posts", options = {}, dependencies = []) => {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
};

export default useFetch;
