export const fetchFixturesByDate = async (date) => {
  try {
      const response = await fetch(`/api/fixtures?date=${date}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw Error(errorData.error || 'Failed to fetch fixtures');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching fixtures:', error);
      throw error;
  }
};
