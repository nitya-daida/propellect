export const BASE_URL = "https://realestate-backend-qh6p.onrender.com";

export async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
}
