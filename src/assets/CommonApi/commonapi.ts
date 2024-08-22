export interface Response {
  data: [];
}

// Get Countires 
export async function getCountries(): Promise<Response> {
  const response = await fetch(
    "https://www.universal-tutorial.com/api/countries/",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("apitoken")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  // Parse the JSON response
  const data: Response = await response.json();
  return data;
}


// Get States 
export async function getState(country: string): Promise<Response[]> {
  const response = await fetch(
    `https://www.universal-tutorial.com/api/states/${country}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("apitoken")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  // Parse the JSON response
  const data: Response[] = await response.json();
  return data;
}

// Get City 
export async function getCity(state: string): Promise<Response[]> {
  const response = await fetch(
    `https://www.universal-tutorial.com/api/cities/${state}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("apitoken")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  // Parse the JSON response
  const data: Response[] = await response.json();
  return data;
}