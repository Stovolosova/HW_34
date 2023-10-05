import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import './contacts.css';

function Contacts({ deleteContact, editContact }) {
  // const { contacts, selectedContact } = useSelector(state => state);
  const contacts = useSelector(state => state.contacts);
  const selectedContact = useSelector(state => state.selectedContact);

  const openModal = (contact) => {
    editContact({ type: 'SET_SELECTED_CONTACT', payload: contact });
  };

  const closeModal = () => {
    editContact({ type: 'SET_SELECTED_CONTACT', payload: null });
  };

  const confirmDeleteContact = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id);
      closeModal();
    }
  };

  const handleEdit = (contact) => {
    editContact({ type: 'SET_SELECTED_CONTACT', payload: contact });
  };

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
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <Link to={`/edit/${contact.name}`} onClick={() => handleEdit(contact)}>Edit</Link>
                <button onClick={() => openModal(contact)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={!!selectedContact}
        onRequestClose={closeModal}
        contentLabel="Delete Contact"
        style={{
          overlay: {
            backgroundColor: 'none',
          },
          content: {
            background: 'rgb(98 93 93)',
            inset: '200px',
          },
        }}
      >
        <h2>Delete Contact</h2>
        {!!selectedContact && (
          <p>Are you sure you want to delete {selectedContact.name}?</p>
        )}
        <div>
          <button onClick={confirmDeleteContact}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </div>
  );
}

export default Contacts;
