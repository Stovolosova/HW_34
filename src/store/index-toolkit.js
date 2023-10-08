import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  selectedContact: null,
  page: 'contacts',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    updateContact: (state, action) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    },
  },
});

const store = configureStore({
  reducer: contactsSlice.reducer,
});

export const {
  setContacts,
  setSelectedContact,
  addContact,
  deleteContact,
  updateContact,
} = contactsSlice.actions;

export default store;