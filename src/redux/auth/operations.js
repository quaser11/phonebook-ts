import {signUp, logOut, logIn, getCurrentUser, token} from "../../api-service/api-service.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const signUpToAccount = createAsyncThunk('auth/signup',
    async (user, thunkAPI) => {
        try {
            const response = await signUp(user);
            token.setToken(response.data.token)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    })

export const logInToAccount = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        try {
            const response = await logIn(user);
            token.setToken(response.data.token)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    })

export const logOutFromAccount = createAsyncThunk('auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await logOut();
            token.unsetToken()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    })

export const fetchCurrentUser = createAsyncThunk('auth/refresh',
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