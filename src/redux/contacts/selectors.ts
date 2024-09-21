import {selectFilterName} from "../filters/selectors";
import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";

export const selectContacts = (state:RootState) => state.contacts.contacts

export const selectIsLoading = (state:RootState) => state.contacts.isLoading

export const selectError = (state:RootState) => state.contacts.error

export const selectVisibleContacts = createSelector([selectContacts, selectFilterName], (contacts, filterName) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterName.toLowerCase()) || contact.number.toLowerCase().includes(filterName.toLowerCase()));
})