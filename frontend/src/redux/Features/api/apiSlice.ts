import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBasicResponse, IGetClassWorkResponse, IGetMessagesResponse, IGetSubmissionsResponse, IGetUserAndCoursesResponse } from '../../../Types/ResponseInterface';
import { UserInterface } from '../../../Types/UserInterface';
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
  tagTypes: ['user', 'admin', 'course','students','teachers','classWorks','submissions','messages'],
  endpoints: (builder) => ({
    getUserAndCourses:builder.query<IGetUserAndCoursesResponse,void>({
      query:()=> '/user',
      providesTags:['user','course']
    }),
    findUserByEmail:builder.mutation<UserInterface,{email:string}>({
      query:(data)=>({
        url:'/user/get-by-email',
        method:'POST',
        body:data
      }),
    }),
    getMessages:builder.query<IGetMessagesResponse[],{id:string | undefined}>({
      query:({id})=>`/courses/${id}/messages`,
      providesTags:['messages']
    }),
    generateAttachmentUrl:builder.mutation<{status:string,url:string},{key:string}>({
      query:({key})=>({
        url:`/courses/get-attachment/${key}`,
        method:'POST',
      })
    }),
    getTeacherReviewedWorks:builder.query<IGetClassWorkResponse[],{id:string | null}>({
       query:({id})=>`/teacher/reviewed?course=${id}`,
       providesTags:['classWorks']
    }),
    getTeacherNotReviewedWorks:builder.query<IGetClassWorkResponse[],{id:string | null}>({
      query:({id})=>`/teacher/to-review?course=${id}`,
      providesTags:['classWorks']
    }),
    
  })
})


export const {
  useGetUserAndCoursesQuery,
  useFindUserByEmailMutation,
  useGetMessagesQuery,
  useGenerateAttachmentUrlMutation,
  useGetTeacherNotReviewedWorksQuery,
  useGetTeacherReviewedWorksQuery,
} = apiSlice


