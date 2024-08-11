import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Slices/User/userSlice";

// created store which contains reducers
// reducers that hanlde events dispatch by redux store
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

// define type of store which only added in typescript
// define type of dispatch and state in hooks.ts
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
