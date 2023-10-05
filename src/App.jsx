import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Contacts from './pages/Contacts';
import FormAddContacts from './pages/FormAddContacts';
import FormEditContacts from './pages/FormEditContacts';

function App() {
  const dispatch = useDispatch();
  // const { contacts, selectedContact } = useSelector(state => state);
  const contacts = useSelector(state => state.contacts);
  const selectedContact = useSelector(state => state.selectedContact);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch({ type: 'SET_CONTACTS', payload: JSON.parse(storedContacts) });
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: 'SET_CONTACTS', payload: data });
          localStorage.setItem('contacts', JSON.stringify(data));
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch]);

  const addContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    dispatch({ type: 'SET_CONTACTS', payload: updatedContacts });
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    dispatch({ type: 'SET_PAGE', payload: 'contacts' });
  };

  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    dispatch({ type: 'SET_CONTACTS', payload: updatedContacts });
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const updateContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    dispatch({ type: 'SET_CONTACTS', payload: updatedContacts });
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <Router>
      <div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Link style={{ marginRight: '10px' }} to="/contacts">Contacts</Link>
          <Link to="/add">Add Contacts</Link>
        </nav>
        <Routes>
          <Route
            exact
            path="/contacts"
            element={<Contacts contacts={contacts} deleteContact={deleteContact} editContact={dispatch} handlePageChange={dispatch} />}
          />
          <Route path="/add" element={<FormAddContacts addContact={addContact} handlePageChange={dispatch} />} />
          <Route
            path="/edit/:id"
            element={<FormEditContacts selectedContact={selectedContact} updateContact={updateContact} handlePageChange={dispatch} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
