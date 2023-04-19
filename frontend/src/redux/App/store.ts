import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/api/apiSlice";
import { adminAuthReducer } from "../Features/reducers/adminAuthSlice";
import { userAuthReducer } from "../Features/reducers/userAuthSlice";


export const store = configureStore({
    reducer:{
       [apiSlice.reducerPath]: apiSlice.reducer,
       adminAuth:adminAuthReducer,
       userAuth:userAuthReducer,
      
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type State = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch