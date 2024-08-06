export const fetchDiagnosedData = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data from external URL');
  }

  return response.json();
};
