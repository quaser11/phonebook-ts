import {RootState} from "../store";

export const selectName = (state:RootState) => state.auth.user.name

export const selectIsLoggedIn = (state:RootState) => state.auth.isLoggedIn

export const selectRefreshing = (state:RootState) => state.auth.isRefreshing

