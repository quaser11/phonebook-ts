import {createAsyncThunk} from "@reduxjs/toolkit";
import {getContacts, createContact, deleteContact, updateContact} from '../../api-service/api-service'
import {IContact} from "../../utils/types";


export const fetchContacts = createAsyncThunk<IContact[], undefined, {rejectValue: string}>('contacts/fetchContacts',
    async (_, thunkAPI) => {
        try {
            const response = await getContacts();
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    })

export const addContact = createAsyncThunk<IContact, Omit<IContact, 'id'>, {rejectValue: string}>('contacts/createContact',
    async (contact, thunkAPI) => {
        try {
            const response = await createContact(contact);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    })

export const removeContact = createAsyncThunk<IContact, string, {rejectValue: string}>('contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
            const response = await deleteContact(id);
            return response.data
        } catch (error) {
           return thunkAPI.rejectWithValue(error as string)
        }
    })

interface IEditContact {
    id: string
    body: Omit<IContact, 'id'>
}

export const editContact = createAsyncThunk<IContact, IEditContact, {rejectValue: string}>('contacts/updateContact',
    async (contact, thunkAPI) => {
        try {
            const response = await updateContact(contact.id, contact.body);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error as string)
        }
    })
