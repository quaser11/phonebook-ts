import {createAsyncThunk} from "@reduxjs/toolkit";
import {getContacts, createContact, deleteContact, updateContact} from '../../api-service/api-service.js'

export const fetchContacts = createAsyncThunk('contacts/fetchContacts',
    async (_, thunkAPI) => {
        try {
            const response = await getContacts();
            return response.data
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    })

export const addContact = createAsyncThunk('contacts/createContact',
    async (contact, thunkAPI) => {
        try {
            const response = await createContact(contact);
            return response.data
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    })

export const removeContact = createAsyncThunk('contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
            const response = await deleteContact(id);
            return response.data
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    })

export const editContact = createAsyncThunk('contacts/updateContact',
    async (contact, thunkAPI) => {
        try{
            const response = await updateContact(contact.id, contact.body);
            return response.data
        } catch (error){
            thunkAPI.rejectWithValue(error)
        }
})
