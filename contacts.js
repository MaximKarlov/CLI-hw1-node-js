const contactsPath = './db/contacts.json';
const fs = require('fs').promises;

const listContacts = async () => {
  const list = await fs
    .readFile(contactsPath, 'utf-8')
    .then(data => console.log(JSON.parse(data)))
    .catch(err => console.log(err));
  return list;
};

const getContactById = async contactId => {
  await fs
    .readFile(contactsPath, 'utf-8')
    .then(contacts => {
      return JSON.parse(contacts);
    })
    .then(contacts => {
      const searchContacts = contacts.filter(el => el.id === contactId);
      if (searchContacts.length > 0) return console.log(searchContacts);
      else return console.log('No contacts found');
    })
    .catch(err => console.log(err));
};

const removeContact = async contactId => {
  let flag = null;
  let searchContacts = [];
  await fs
    .readFile(contactsPath, 'utf-8')
    .then(contacts => {
      return JSON.parse(contacts);
    })
    .then(contacts => {
      contacts.map(el => {
        if (el.id === contactId) {
          return (searchContacts = contacts.filter(el => el.id !== contactId));
        }
      });
      if (searchContacts.length > 0) {
        fs.writeFile(contactsPath, JSON.stringify(searchContacts));
        console.log('Contacts delete successfully');
      } else console.log('No contacts found');
    })
    .catch(err => console.log(err));
};

const addContact = async newUser => {
  const contactsArray = await fs
    .readFile(contactsPath, 'utf-8')
    .then(contacts => {
      return JSON.parse(contacts);
    })
    .then(contacts => {
      contacts.push(newUser);
      return contacts;
    })
    .catch(err => console.log(err));
  fs.writeFile(contactsPath, JSON.stringify(contactsArray));
  console.log('Contacts added successfully');
  listContacts();
};

module.exports = { listContacts, addContact, getContactById, removeContact };
