import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "./types";

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload,
      );
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const contactIndex = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id,
      );
      if (contactIndex !== -1) {
        state.contacts[contactIndex] = action.payload;
      }
    },
  },
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
