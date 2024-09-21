import {configureStore} from '@reduxjs/toolkit';
import {filter} from "./filters/slice.js";
import {auth} from './auth/slice.js'
import {contacts} from './contacts/slice.js'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'token',
    storage,
    whitelist: ['token'],
}

const persistedAuthReducer = persistReducer(persistConfig, auth.reducer)

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        filter: filter.reducer,
        contacts: contacts.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)