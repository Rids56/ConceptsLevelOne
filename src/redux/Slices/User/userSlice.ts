import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//types of user contains values
export interface User {
    id?: number,
    fullName?: string,
    userName: string,
    password: string,
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    // users: [],
    users: JSON.parse(sessionStorage.getItem('users') || '[]'),
}

// define slice with what action to be perform and state to handle
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push({
                id: state.users.length,
                fullName: action.payload.fullName,
                userName: action.payload.userName,
                password: action.payload.password,
            });
        },
        getOneUser: (state, action: PayloadAction<User>) => {
            const authUser = state.users?.find((e) => (e.userName === action.payload.userName && e.password === action.payload.password));
            
            if (authUser) {
                sessionStorage.setItem('token', JSON.stringify(authUser));
            } else {
                sessionStorage.removeItem('token');
            }
        }
    }
});

//export reducers of slice
export default userSlice.reducer;

//export actions of slice
export const { addUser, getOneUser } = userSlice.actions;