// Define the shape of the response data
export interface TokenResponse {
  auth_token: string;
}

// Function to fetch the token
export async function getToken(): Promise<TokenResponse> {
  const response = await fetch(
    "https://www.universal-tutorial.com/api/getaccesstoken",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "api-token":
          "uamOP7pdNzvUcPDB-Kbc16omikp3SwukLG5SnQbk788R3TgRbCoNmqHQ39O4Pbcz4ZY",
        "user-email": "riddhisanghani201@gmail.com",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  // Parse the JSON response
  const data: TokenResponse = await response.json();
  return data;
}
