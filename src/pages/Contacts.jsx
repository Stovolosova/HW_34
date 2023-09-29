import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import FormEditContacts from "./FormEditContacts";
import './contacts.css';

function Contacts ({ contacts, deleteContact, updateContact }) {
  const [allContacts, setAllContacts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState();

  useEffect(() => {
    setAllContacts(contacts);
  }, [contacts]);

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setSelectedContact(null);
    setModalIsOpen(false);
  }

  const confirmDeleteContact = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id);
      setModalIsOpen(false);
      setSelectedContact(null);
    }
  }

  const handlePageChange = (page) => {
    if(page === 'contacts') {
        setSelectedContact(null);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allContacts.map(contact => (
            <tr  key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <Link to={`/edit/${contact.id}`}>Edit</Link>
                <button onClick={() => openModal(contact)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Contact"
        style={{
            overlay: {
                backgroundColor: 'none',
            },
            content: {
              background: 'rgb(98 93 93)',
              inset: '200px',
            }
          }}
      >
        <h2>Delete Contact</h2>
        {selectedContact && (
          <p>Are you sure you want to delete {selectedContact.name} ?</p>
        )}
        <div>
          <button onClick={() => confirmDeleteContact(selectedContact.id)}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
      {selectedContact && <FormEditContacts 
      contact={selectedContact} 
      updateContact={updateContact} 
      handlePageChange={handlePageChange} />}
    </div>
  );
};

export default Contacts;

