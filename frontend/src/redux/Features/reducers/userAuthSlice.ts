import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

const data = localStorage.getItem('token') ?? '';
const parsedData:{token:string} = data? JSON.parse(data) :null
const initialState={
    data:parsedData ?? {
        token:'', 
    }
}

const userAuthSlice=createSlice({
   name:'users',
   initialState,
   reducers:{
       setToken(state,action:PayloadAction<{token:string}>){
          localStorage.setItem(
            'token',
            JSON.stringify({
                token:action.payload.token,
            })
          )
          state.data = {token:action.payload.token}
       },
       deleteToken(state){
        state.data={
            token:''
        }
        localStorage.removeItem('token')
       }
   }
})

export const {setToken,deleteToken}=userAuthSlice.actions

export const selectuserAuth=(state:RootState)=>state.userAuth.data

export const userAuthReducer =userAuthSlice.reducer;