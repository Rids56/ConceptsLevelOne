export interface Response {
    data: [];
}

// Function to fetch the token
export async function getCountries(): Promise<Response> {
    try {
        const response = await fetch('https://www.universal-tutorial.com/api/countries/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('apitoken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }

        // Parse the JSON response
        const data: Response = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}