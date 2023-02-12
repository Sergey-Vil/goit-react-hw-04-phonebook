import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import css from './contactsBook.modale.css';

export const ContactsBook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);
  useEffect(() => {
    if (flag) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      setFlag(false);
    }
  }, [flag]);

  const addContacts = data => {
    const name = data.name;
    const number = data.number;
    const newContact = { name, number, id: nanoid() };

    contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    )
      ? alert(`${newContact.name} already exists`)
      : setContacts([...contacts, newContact]);
    setFlag(true);
  };
  const changeFilter = e => {
    setFilter(e.target.value.trim().toString());
  };
  const findContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setFlag(true);
  };

  return (
    <div className={css.phonebook}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactsForm onSubmit={addContacts} />
      <h2 className={css.title}>Contacts</h2>
      <ContactsFilter filter={filter} onChangeFilter={changeFilter} />
      <ContactsList contacts={findContacts()} deleteContact={deleteContact} />
    </div>
  );
};

export default ContactsBook;
