import {selectFilterName} from "../filters/selectors.js";
import {createSelector} from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.contacts

export const selectIsLoading = state => state.contacts.isLoading

export const selectError = state => state.contacts.error

export const selectVisibleContacts = createSelector([selectContacts, selectFilterName], (contacts, filterName) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterName.toLowerCase()) || contact.number.toLowerCase().includes(filterName.toLowerCase()));
})