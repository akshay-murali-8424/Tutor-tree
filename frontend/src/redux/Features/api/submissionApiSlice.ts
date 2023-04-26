import { IBasicResponse, IGetSubmissionsResponse } from "../../../Types/ResponseInterface";
import { apiSlice } from "./apiSlice";

export const extendedSubmissionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
        submitAssignment:builder.mutation<IBasicResponse,{courseId:string,classWorkId:string,submission:FormData}>({
            query:({courseId,classWorkId,submission})=>({
              url:`courses/${courseId}/classWorks/${classWorkId}/submissions`,
              method:'POST',
              body:submission
            }),
            invalidatesTags:['submissions']
          }),
          returnSubmissions:builder.mutation<IBasicResponse,{courseId:string | undefined,classWorkId:string | undefined,submissions:string[]}>({
             query:({courseId,classWorkId,submissions})=>({
              url:`courses/${courseId}/classWorks/${classWorkId}/submissions`,
              method:'PATCH',
              body:{submissions}
            }),
            invalidatesTags:['submissions','classWorks']
          }),
          setSubmissionMark:builder.mutation({
            query:({courseId,classWorkId,submissionId,mark})=>({
              url:`courses/${courseId}/classWorks/${classWorkId}/submissions/${submissionId}`,
              method:'PATCH',
              body:mark
            }),
            invalidatesTags:['submissions']
          }),
          getSubmissions:builder.query<IGetSubmissionsResponse[],{classWorkId:string | undefined,courseId:string | undefined}>({
            query:({courseId,classWorkId})=>`/courses/${courseId}/classWorks/${classWorkId}/submissions`,
            providesTags:['submissions']
          }),
          getSubmission:builder.query<IGetSubmissionsResponse,{classWorkId:string | undefined,courseId:string | undefined}>({
            query:({courseId,classWorkId})=>`/courses/${courseId}/classWorks/${classWorkId}/getSubmission`,
            providesTags:['submissions']
          }),
    })
})

export const {
    useReturnSubmissionsMutation,
    useSubmitAssignmentMutation,
    useGetSubmissionsQuery,
    useGetSubmissionQuery,
} = extendedSubmissionApiSlice