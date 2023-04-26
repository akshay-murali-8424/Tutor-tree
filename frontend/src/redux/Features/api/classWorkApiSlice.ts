import { IBasicResponse, IGetClassWorkResponse } from "../../../Types/ResponseInterface";
import { apiSlice } from "./apiSlice";

export const extendedClassWorkApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
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
          getClassWork:builder.query<IGetClassWorkResponse,{id:string | undefined,courseId:string | undefined}>({
            query:({courseId,id})=>`/courses/${courseId}/classWorks/${id}`,
            providesTags:['classWorks']
          }),
    })
})

export const {
    useCreateClassWorkMutation,
    useGetClassWorksQuery,
    useGetClassWorkQuery,
} = extendedClassWorkApiSlice