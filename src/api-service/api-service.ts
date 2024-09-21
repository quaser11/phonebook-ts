import axios, {AxiosResponse} from 'axios';
import {IUserBody, IContact} from "../utils/types";

axios.defaults.baseURL = 'https://connections-api.goit.global/'

interface IToken {
    setToken: (token: string) => void;
    unsetToken: () => void;
}

export const token: IToken = {
    setToken: (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    unsetToken: () => {
        axios.defaults.headers.common['Authorization'] = ''
    }
}

export interface IResponse {
    user: {
        name: string ,
        email: string,
    }
    token: string
}

export const signUp = async (userBody: IUserBody): Promise<{data: IResponse}> => {
    try {
        return await axios.post('/users/signup', userBody);

    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}

export const logIn = async (userBody: Omit<IUserBody, 'name'>): Promise<{data: IResponse}> => {
    try {
        return await axios.post('/users/login', userBody);
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}

export const logOut = async (): Promise<{data:{}}> => {
    try {
        return await axios.post('/users/logout');
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}

export const getCurrentUser = async (): Promise<{data: IResponse['user']}> => {
    try {
        return await axios.get('/users/current');

    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}

// CONTACTS

export const getContacts = async (): Promise<{data: IContact[]} | never> => {
    try {
        return await axios.get('/contacts');
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}

export const createContact = async (contactBody: Omit<IContact, 'id'>): Promise<{data: IContact}> => {
    try {
        return await axios.post('/contacts', contactBody);
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}

export const deleteContact = async (contactId: string): Promise<{data: IContact}> => {
    try {
        return await axios.delete(`/contacts/${contactId}`);
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}

export const updateContact = async (contactId:string, contactBody:Omit<IContact, 'id'>):Promise<{data: IContact}> => {
    try {
        return await axios.patch(`/contacts/${contactId}`, contactBody)

    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message)
        } else {
            throw Error(String(error))
        }
    }
}