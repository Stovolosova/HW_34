import React, { useState, useEffect } from 'react';
import Contacts from './pages/Contacts';
import FormAddContacts from './pages/FormAddContacts';

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

  return (
    <div>
      <nav style={{display:"flex", justifyContent: 'flex-end', marginTop:"20px"}}>
        <button style={{marginRight:"10px"}} onClick={() => handlePageChange('contacts')}>Contacts</button>
        <button onClick={() => handlePageChange('formAddContacts')}>Add Contacts</button>
      </nav>
      {page === 'contacts' && <Contacts contacts={contacts} deleteContact={deleteContact} />}
      {page === 'formAddContacts' && <FormAddContacts addContact={addContact} handlePageChange={handlePageChange}  />}
    </div>
  );
};

export default App;