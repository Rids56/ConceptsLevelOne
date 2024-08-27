import { configureStore } from "@reduxjs/toolkit";
// import { userSlice } from "./Slices/User/userSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Sagas";
import rootReducer from "./Slices";

const sagaMiddleware = createSagaMiddleware();

// created store which contains reducers
// reducers that hanlde events dispatch by redux store
export const store = configureStore(
    {
        // reducer: {
        //     user: userSlice.reducer,
        // },
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware),
    },
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
    const state = store.getState();
    sessionStorage.setItem('users', JSON.stringify(state.user.users));
});

// define type of store which only added in typescript
// define type of dispatch and state in hooks.ts
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
