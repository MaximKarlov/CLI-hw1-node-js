const contactsPath = './db/contacts.json';
const fs = require('fs').promises;

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, 'utf-8');
    console.table(JSON.parse(list));
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async contactId => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsList);
    const searchContacts = contacts.filter(el => el.id === contactId);
    if (searchContacts.length > 0) return console.table(searchContacts);
    else return console.log('No contacts found');
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async contactId => {
  let searchContacts = [];
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsList);
    contacts.map(el => {
      if (el.id === contactId) {
        return (searchContacts = contacts.filter(el => el.id !== contactId));
      }
    });
    if (searchContacts.length > 0) {
      fs.writeFile(contactsPath, JSON.stringify(searchContacts));
      console.log('Contacts delete successfully');
    } else console.log('No contacts found');
  } catch (err) {
    console.log(err);
  }
  listContacts();
};

const addContact = async newUser => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsList);
    contacts.push(newUser);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (err) {
    console.log(err);
  }
  listContacts();
};

module.exports = { listContacts, addContact, getContactById, removeContact };
