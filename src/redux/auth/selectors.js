export const selectName = state => state.auth.user.name

export const selectIsLoggedIn = state => state.auth.isLoggedIn

export const selectRefreshing = state => state.auth.isRefreshing

export const selectError = state => state.auth.error

