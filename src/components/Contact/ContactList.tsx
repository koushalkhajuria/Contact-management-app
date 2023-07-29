import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { deleteContact } from "./contactReducer";
import { Contact } from "./types";
import ContactForm from "./ContactForm";

const ContactList: React.FC = () => {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDelete = (contactId: number) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Contact List</h2>

      {contacts.length !== 0 ? (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className="mb-2 items-center justify-between rounded border bg-slate-800 p-4 sm:flex "
          >
            <div>
              <h3 className="text-lg font-semibold">
                {contact.firstName} {contact.lastName}
              </h3>
              {contact.status === "inactive" ? (
                <p className="text-airbnb-red">Status: {contact.status}</p>
              ) : (
                <p className="text-green-500">Status: {contact.status}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <button
                onClick={() => handleEdit(contact)} // Pass the selected contact to handleEdit
                className="my-3 rounded bg-green-500 px-7 py-2 text-white sm:my-5"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="rounded bg-red-600 px-4 py-2 text-white sm:my-5"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-slate-400">No Contacts Available</p>
      )}

      {/* Render the ContactForm if editingContact is not null */}
      {editingContact && (
        <ContactForm
          onClose={() => setEditingContact(null)} // Clear the editingContact state to close the form
          contact={editingContact} // Pass the selected contact to ContactForm
        />
      )}
    </div>
  );
};

export default ContactList;
