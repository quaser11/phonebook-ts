import {createSlice} from "@reduxjs/toolkit";
import {signUpToAccount, logInToAccount, logOutFromAccount, fetchCurrentUser} from "./operations";

interface IAuthState {
    user: {
        name: string | null,
        email: string | null,
    }
    token: string | null,
    isLoggedIn: boolean,
    isRefreshing: boolean,
}
const initialState: IAuthState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUpToAccount.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
            state.isRefreshing = false
        }).addCase(logInToAccount.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
        }).addCase(logOutFromAccount.fulfilled, (state, action) => {
            return initialState
        }).addCase(fetchCurrentUser.pending, (state) => {
            state.isRefreshing = true
        }).addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.isRefreshing = false
        }).addCase(fetchCurrentUser.rejected, (state, action) => {
            state.isLoggedIn = false
            state.isRefreshing = false
        })
    }
})