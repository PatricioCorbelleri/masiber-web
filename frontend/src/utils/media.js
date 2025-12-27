const API_URL = "http://localhost:8000";

export function resolveMedia(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  return API_URL + src;
}
