import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/api/apiSlice";
import { adminAuthReducer } from "../Features/reducers/adminAuthSlice";
import { userAuthReducer } from "../Features/reducers/userAuthSlice";
import { userCoursesReducer } from "../Features/reducers/userCoursesSlice";


export const store = configureStore({
    reducer:{
       [apiSlice.reducerPath]: apiSlice.reducer,
       adminAuth:adminAuthReducer,
       userAuth:userAuthReducer,
       userCourses:userCoursesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type State = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch