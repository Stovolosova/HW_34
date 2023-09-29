import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Contacts from './pages/Contacts';
import FormAddContacts from './pages/FormAddContacts';
import FormEditContacts from './pages/FormEditContacts';

function App () {
  const [page, setPage] = useState('contacts');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          setContacts(data);
          localStorage.setItem('contacts', JSON.stringify(data));
        })
        .catch(error => console.log(error));
    }
  }, []);

  const addContact = newContact => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const deleteContact = contactId => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const updateContact = updatedContact => {
    const updatedContacts = contacts.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <Router>
      <div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "20px" }}>
          <Link style={{ marginRight: "10px" }} to="/contacts">Contacts</Link>
          <Link to="/add">Add Contacts</Link>
        </nav>
      <Routes>
        <Route exact path="/contacts" element={<Contacts contacts={contacts} deleteContact={deleteContact} />} />
        <Route path="/add" element={<FormAddContacts addContact={addContact} />} />
        <Route path="/edit/:id" element={<FormEditContacts addContact={addContact} handlePageChange={handlePageChange} updateContact={updateContact} />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;




