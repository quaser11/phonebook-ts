import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/'

export const token = {
    setToken: (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    unsetToken: () => {
        axios.defaults.headers.common['Authorization'] = ''
    }
}

export const signUp = async (userBody) => {
    try {
        const response = await axios.post('/users/signup', userBody);
        return response
    } catch (error) {
        throw Error(error.message)
    }
}

export const logIn = async (userBody) => {
    try {
        const response = await axios.post('/users/login', userBody);
        return response
    } catch (error) {
        throw Error(error.message)
    }
}

export const logOut = async () => {
    try {
        const response = await axios.post('/users/logout');
        return response
    } catch (error) {
        throw Error(error.message)
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axios.get('/users/current');
        return response
    } catch (error) {
        throw Error(error.message)
    }
}

// CONTACTS

export const getContacts = async () => {
    try {
        const response = await axios.get('/contacts');
        return response
    } catch (error) {
        throw Error(error.message)
    }
}

export const createContact = async (contactBody) => {
    try {
        const response = await axios.post('/contacts', contactBody);
        return response
    } catch (error) {
        throw Error(error.message)
    }
}

export const deleteContact = async (contactId) => {
    try {
        const response = await axios.delete(`/contacts/${contactId}`);
        return response
    } catch (error) {
        throw Error(error.message)
    }
}

export const updateContact = async (contactId, contactBody) => {
    try {
        const response = await axios.patch(`/contacts/${contactId}`, contactBody)
        return response
    } catch (error) {
        throw Error(error.message)
    }
}