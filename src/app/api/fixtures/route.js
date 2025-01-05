import { API_BASE_URL, API_KEY } from "../../api/config";

export async function GET(request) {
  try {
      const { searchParams } = new URL(request.url);
      const date = searchParams.get('date');

      if (!date) {
          return Response.json({ error: 'Date parameter is required' }, { status: 400 });
      }

      const response = await fetch(`${API_BASE_URL}/fixtures/date/${date}`, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `${API_KEY}`,
          },
          next: { revalidate: 300 } 
      });

      if (!response.ok) {
          console.error('API Error:', response.status);
          return Response.json({ error: 'Failed to fetch fixtures' }, { status: response.status });
      }

      const data = await response.json();
      return Response.json(data);
  } catch (error) {
      console.error('Request error:', error);
      return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}