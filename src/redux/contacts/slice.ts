import {createSlice} from "@reduxjs/toolkit";
import {fetchContacts, addContact, removeContact, editContact} from './operations.js'
import {IContact} from "../../utils/types";

interface IContactsState {
    contacts: IContact[],
    isLoading: boolean,
    error: unknown | string
}
const initialState: IContactsState = {
    contacts:[],
    isLoading: false,
    error: null
};

export const contacts = createSlice({
    name: "contacts",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(addContact.pending, (state) => {
            state.isLoading = true
        }).addCase(addContact.fulfilled, (state, action) => {
            state.contacts.push(action.payload)
            state.isLoading = false
        }).addCase(addContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }).addCase(fetchContacts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchContacts.fulfilled, (state, action) => {
            state.contacts = action.payload
            state.isLoading = false
        }).addCase(fetchContacts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }).addCase(removeContact.pending, (state, action) => {
            state.isLoading = true
        }).addCase(removeContact.fulfilled, (state, action) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id)
            state.isLoading = false
        }).addCase(removeContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }).addCase(editContact.pending, (state, action) => {
            state.isLoading = true
        }).addCase(editContact.fulfilled, (state, action) => {
            state.contacts = state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            state.isLoading = false
        }).addCase(editContact.rejected, (state, action) => {
           state.isLoading = false
            state.error = action.payload
        })
    }
})