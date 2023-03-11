import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IGetUserAndCoursesResponse} from '../../../Types/ResponseInterface'
import { RootState } from "../../App/store";
const initialState= {
  userCourses:{}
}

const userCoursesSlice=createSlice({
    name:"userCourse",
    initialState,
    reducers:{
      setUserCourses(state,action:PayloadAction<IGetUserAndCoursesResponse>){
         state.userCourses=action.payload
      }
    }
})

export const {setUserCourses} = userCoursesSlice.actions

export const selectUserCourses = (state:RootState)=> state.userCourses.userCourses

export const userCoursesReducer = userCoursesSlice.reducer;