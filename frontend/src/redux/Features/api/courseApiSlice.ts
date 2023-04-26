import { CourseInterface } from "../../../Types/CourseInterface";
import { ICreateCoursePayload, IJoinCoursePayload } from "../../../Types/PayloadInterface";
import { IBasicResponse, IGetPeople } from "../../../Types/ResponseInterface";
import { apiSlice } from "./apiSlice";

export const extendedCourseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
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
          getCourse:builder.query<CourseInterface,{id:string | undefined}>({
            query:({id})=>`/courses/${id}`,
            providesTags:['course']
          }),
          getPeople:builder.query<IGetPeople,{id:string | undefined}>({
            query:({id})=>`/courses/${id}/people`,
            providesTags:['students','teachers']
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
    })
})

export const {
    useAddStudentMutation,
    useAddTeacherMutation,
    useGetCourseQuery,
    useGetPeopleQuery,
    useCreateClassMutation,
    useJoinClassMutation,
} = extendedCourseApiSlice