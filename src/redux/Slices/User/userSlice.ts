import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//types of user contains values
export interface User {
    id: number,
    fullName: string,
    userName: string,
    password: string,
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
}

// define slice with what action to be perform and state to handle
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action:PayloadAction<User>) => {
            state.users.push({
                id: state.users.length,
                fullName: action.payload.fullName,
                userName: action.payload.userName,
                password: action.payload.password,
            })
        }
    }
});

//export reducers of slice
export default userSlice.reducer;

//export actions of slice
export const { addUser } = userSlice.actions;