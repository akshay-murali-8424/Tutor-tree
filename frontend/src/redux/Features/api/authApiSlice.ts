import { ILoginPayload, IRegisterPayload } from "../../../Types/PayloadInterface";
import { ILoginResponse } from "../../../Types/ResponseInterface";
import { apiSlice } from "./apiSlice";

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation<ILoginResponse, ILoginPayload>({
            query: (data) => ({
              url: '/auth/user-login',
              method: 'POST',
              body: data
            }),
            invalidatesTags: ['user', 'course','students','teachers','classWorks','submissions','messages']
          }),
          userRegister: builder.mutation<ILoginResponse, IRegisterPayload>({
            query: (data) => ({
              url: '/auth/register',
              method: 'POST',
              body: data
            }),
            invalidatesTags: ['user', 'course','students','teachers','classWorks','submissions','messages']
          }),
          signInWithGoogle:builder.mutation<ILoginResponse,{credential:string}>({
            query:(data)=>({
              url:'/auth/sign-in-with-google',
              method:'POST',
              body:data
            }),
            invalidatesTags:['user']
          }),
          adminLogin: builder.mutation<ILoginResponse, IRegisterPayload>({
            query: (data) => ({
              url: '/auth/admin-login',
              method: 'POST',
              body: data
            }),
            invalidatesTags: ['admin']
          }),
    })
})

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useSignInWithGoogleMutation,
  useAdminLoginMutation,
} = extendedAuthApiSlice; 