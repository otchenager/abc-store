const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type HealthResponse = {
  status: "ok";
  timestamp: string;
  demoUser: null;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/api/health`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}
