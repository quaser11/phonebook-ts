import {signUp, logOut, logIn, getCurrentUser, token} from "../../api-service/api-service";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUserBody} from '../../utils/types'
import {IResponse} from "../../api-service/api-service";
import {RootState} from "../store";

export const signUpToAccount = createAsyncThunk<IResponse, IUserBody, {rejectValue:string}>('auth/signup',
    async (user, thunkAPI) => {
        try {
            const response = await signUp(user);
            token.setToken(response.data.token)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    })

export const logInToAccount = createAsyncThunk<IResponse, Omit<IUserBody, 'name'>, {rejectValue:string}>('auth/login',
    async (user, thunkAPI) => {
        try {
            const response = await logIn(user);
            token.setToken(response.data.token)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    })

export const logOutFromAccount = createAsyncThunk<{}, undefined, {rejectValue: string}>('auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await logOut();
            token.unsetToken()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    })

export const fetchCurrentUser = createAsyncThunk<IResponse['user'], undefined, {state:RootState}>('auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState()
        if (state.auth.token === null) {
            return thunkAPI.rejectWithValue('No token found');
        }

        try {
            token.setToken(state.auth.token)
            const response = await getCurrentUser();
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    })