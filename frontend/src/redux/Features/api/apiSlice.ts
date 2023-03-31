import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CourseInterface } from '../../../Types/CourseInterface';
import { ICreateCoursePayload, IJoinCoursePayload, ILoginPayload, IRegisterPayload,} from '../../../Types/PayloadInterface';
import { IBasicResponse, IGetClassWorkResponse, IGetPeople, IGetSubmissionsResponse, IGetUserAndCoursesResponse, ILoginResponse } from '../../../Types/ResponseInterface';
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
  tagTypes: ['user', 'admin', 'course','students','teachers','classWorks','submissions'],
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
    createClass:builder.mutation<IBasicResponse,ICreateCoursePayload>({
      query:(data)=>({
        url:'/courses',
        method:'POST',
        body:data
      }),
      invalidatesTags: ['course','user']
    }),
    joinClass:builder.mutation<IBasicResponse,IJoinCoursePayload>({
      query:({refCode})=>({
        url:`/courses/join/${refCode}`,
        method:'POST',
      }),
      invalidatesTags:['user','course']
    }),
    getUserAndCourses:builder.query<IGetUserAndCoursesResponse,void>({
      query:()=> '/user',
      providesTags:['user','course']
    }),
    getCourse:builder.query<CourseInterface,{id:string | undefined}>({
      query:({id})=>`/courses/${id}`,
      providesTags:['course']
    }),
    getPeople:builder.query<IGetPeople,{id:string | undefined}>({
      query:({id})=>`/courses/${id}/people`,
      providesTags:['students','teachers']
    }),
    findUserByEmail:builder.mutation<UserInterface,{email:string}>({
      query:(data)=>({
        url:'/user/get-by-email',
        method:'POST',
        body:data
      }),
    }),
    addTeacher:builder.mutation<IBasicResponse,{courseId:string,userId:string}>({
      query:({courseId,userId})=>({
        url:`/courses/${courseId}/teachers`,
        method:'POST',
        body:{userId}
      }),
      invalidatesTags:['teachers']
    }),
    addStudent:builder.mutation<IBasicResponse,{courseId:string,userId:string}>({
      query:({courseId,userId})=>({
        url:`/courses/${courseId}/students`,
        method:'POST',
        body:{userId}
      }),
      invalidatesTags:['students']
    }),
    createClassWork:builder.mutation<IBasicResponse,any>({
      query:({courseId,classWork})=>({
        url:`/courses/${courseId}/classWorks`,
        method:'POST',
        body:classWork
      }),
      invalidatesTags:['classWorks']
    }),
    getClassWorks:builder.query<IGetClassWorkResponse[],{id:string | undefined}>({
      query:({id})=>`/courses/${id}/classWorks`,
      providesTags:['classWorks']
    }),
    getClassWork:builder.query<IGetClassWorkResponse,{id:string,courseId:string}>({
      query:({courseId,id})=>`/courses/${courseId}/classWorks/${id}`,
      providesTags:['classWorks']
    }),
    submitAssignment:builder.mutation<IBasicResponse,{courseId:string,classWorkId:string,submission:FormData}>({
      query:({courseId,classWorkId,submission})=>({
        url:`courses/${courseId}/classWorks/${classWorkId}/submissions`,
        method:'POST',
        body:submission
      }),
      invalidatesTags:['submissions']
    }),
    getSubmissions:builder.query<IGetSubmissionsResponse[],{classWorkId:string | undefined,courseId:string | undefined}>({
      query:({courseId,classWorkId})=>`/courses/${courseId}/classWorks/${classWorkId}/submissions`
    })
  })
})


export const {
  useAdminLoginMutation,
  useUserLoginMutation,
  useUserRegisterMutation,
  useCreateClassMutation,
  useJoinClassMutation,
  useGetUserAndCoursesQuery,
  useGetCourseQuery,
  useSignInWithGoogleMutation,
  useGetPeopleQuery,
  useFindUserByEmailMutation,
  useAddStudentMutation,
  useAddTeacherMutation,
  useCreateClassWorkMutation,
  useGetClassWorksQuery,
  useGetClassWorkQuery,
  useSubmitAssignmentMutation,
  useGetSubmissionsQuery,
  useLazyGetSubmissionsQuery
} = apiSlice


