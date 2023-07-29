import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

const Contact: React.FC = () => {
  const [isCreatingContact, setIsCreatingContact] = useState(false);

  const handleCreateContact = () => {
    setIsCreatingContact(true);
  };

  const handleCloseForm = () => {
    setIsCreatingContact(false);
  };

  return (
    <Provider store={store}>
      <div className=" m-4 mx-auto w-8/12 rounded-xl bg-dark p-4 text-white sm:w-10/12 lg:m-8 lg:w-7/12 lg:p-8 xl:mx-auto xl:w-9/12">
        <h1 className="m-auto mb-5 rounded-lg bg-airbnb-red p-2 text-center text-lg  font-medium sm:text-2xl lg:w-96 ">
          Contact Management System
        </h1>
        <button
          onClick={handleCreateContact}
          className="my-3 rounded bg-blue-500 px-4 py-2 text-white lg:my-5"
        >
          Create new Contact
        </button>
        {isCreatingContact && <ContactForm onClose={handleCloseForm} />}
        <ContactList />
      </div>
    </Provider>
  );
};

export default Contact;
