import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Country {
    id?: number;
    country_name: string;
    country_short_name: string
    country_phone_code: number;
}
export interface CountryState {
    countries: Country[];
    loading: boolean;
    error: string | null;
}
const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
}

export const addMasterData = (value: unknown, key: string) => {
    // Step 1: Retrieve existing 'master' from session storage
    const master = sessionStorage.getItem("master");
    let masterObj;

    if (master) {
        // Parse the existing 'master' object
        masterObj = JSON.parse(master);
    } else {
        // If 'master' does not exist, initialize it as an empty object
        masterObj = {};
    }

    // Step 2: Update the 'Country' array in the 'master' object
    masterObj[key] = value;

    // Step 3: Store the updated 'master' object back in session storage
    sessionStorage.setItem("master", JSON.stringify(masterObj));
}

// define slice with what action to be perform and state to handle
export const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        fetchCountry: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCountrySuccess: (state, action: PayloadAction<Country[]>) => {
            const data = action.payload?.map((item: Country, index: number) => ({
                id: index + 1,
                ...item,
            }));

            state.loading = false;
            addMasterData(data, 'Country');
            state.countries = data;
        },
        fetchCountryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

//export reducers of slice
export default countrySlice.reducer;

//export actions of slice
export const { fetchCountry, fetchCountrySuccess, fetchCountryFailure } = countrySlice.actions;