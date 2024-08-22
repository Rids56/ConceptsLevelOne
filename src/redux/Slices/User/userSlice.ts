import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";

//types of user contains values
export interface User {
  id?: number;
  fullName?: string;
  userName?: string;
  password?: string;
  actions?: undefined;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  // users: [],
  users: JSON.parse(sessionStorage.getItem("users") || "[]"),
};

// define slice with what action to be perform and state to handle
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users?.push({
        id: state.users.length + 1,
        fullName: action.payload.fullName,
        userName: action.payload.userName,
        password: action.payload.password,
        actions: undefined,
      });
    },
    getOneUser: (state, action: PayloadAction<User>) => {
      const authUser = state.users?.find(
        (e) =>
          e.userName === action.payload.userName &&
          e.password === action.payload.password
      );
      if (authUser) {
        sessionStorage.setItem("token", nanoid());
      } else {
        sessionStorage.removeItem("token");
      }
    },
    updatePassword: (state, action: PayloadAction<User>) => {
      const { userName, ...changes } = action.payload;
      const index = state.users.findIndex(
        (user) => user.userName === action.payload.userName
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...changes };
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const { id, ...updatedFields } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedFields };
      }
    },
    deleteUser: (state, action: PayloadAction<User>) => {
      const id = action.payload.id;
      const data = state.users?.filter((user) => user.id != id);
      state.users = data;
    },
    logoutUser: () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("apitoken");
      sessionStorage.removeItem("master");
    },
  },
});

//export reducers of slice
export default userSlice.reducer;

//export actions of slice
export const { addUser, getOneUser, updatePassword, updateUser, deleteUser, logoutUser } =
  userSlice.actions;
