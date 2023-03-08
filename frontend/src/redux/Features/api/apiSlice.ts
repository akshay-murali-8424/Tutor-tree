
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateCoursePayload, IJoinCoursePayload, ILoginPayload, IRegisterPayload } from '../../../Types/PayloadInterface';
import { IBasicResponse, ILoginResponse } from '../../../Types/ResponseInterface';
import { baseUrl } from '../../../urls';


const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers,{getState}:{getState:any}) => {
    const { token: userToken } = getState()?.userAuth.data;
    const { token: adminToken } = getState()?.adminAuth.data;
    if (window.location.href.includes('admin')) {
      headers.set('authorization', `Bearer ${adminToken}`);
    } else {
      headers.set('authorization', `Bearer ${userToken}`);
    }
    return headers;
  }
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['user', 'admin', 'course'],
  endpoints: (builder) => ({
    userLogin: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (data) => ({
        url: '/auth/user-login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),
    userRegister: builder.mutation<ILoginResponse, IRegisterPayload>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),
    adminLogin: builder.mutation<ILoginResponse, IRegisterPayload>({
      query: (data) => ({
        url: '/auth/admin-login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['admin']
    }),
    createClass:builder.mutation<IBasicResponse,ICreateCoursePayload>({
      query:(data)=>({
        url:'/courses',
        method:'POST',
        body:data
      }),
      invalidatesTags: ['course']
    }),
    joinClass:builder.mutation<IBasicResponse,IJoinCoursePayload>({
      query:({refCode})=>({
        url:`/courses/join/${refCode}`,
        method:'POST',
      })
    }),
  })
})



export const {
  useAdminLoginMutation,
  useUserLoginMutation,
  useUserRegisterMutation,
  useCreateClassMutation,
  useJoinClassMutation
} = apiSlice


