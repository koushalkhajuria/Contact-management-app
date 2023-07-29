import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "./contactReducer";
import { Contact } from "./types";

interface ContactFormProps {
  onClose: () => void;
  contact?: Contact;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose, contact }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  useEffect(() => {
    // If the contact prop is provided, set the initial state
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status);
    }
  }, [contact]);

  const generateNewId = (): number => {
    return Date.now();
  };

  const handleSubmit = () => {
    // Create the new contact object
    const newContact = {
      id: contact ? contact.id : generateNewId(),
      firstName,
      lastName,
      status,
    };

    // Dispatch the action to add/edit the contact to the Redux store
    if (contact) {
      dispatch(editContact(newContact)); // Edit existing contact
    } else {
      dispatch(addContact(newContact)); // Add new contact
    }
    // Reset the form fields
    setFirstName("");
    setLastName("");
    setStatus("active");

    // Close the form
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-slate-900">
      <div className="rounded bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Create new Contact</h2>
        <div className="mb-4">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
            className="w-full rounded border px-2 py-1"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 rounded bg-gray-300 px-4 py-2 text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
