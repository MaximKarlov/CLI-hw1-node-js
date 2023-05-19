const { Command } = require('commander');
const list = require('./contacts.js');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      list.listContacts();
      break;

    case 'get':
      list.getContactById(id);
      break;

    case 'add':
      newUser = {
        id,
        name,
        email,
        phone,
      };
      list.addContact(newUser);
      break;

    case 'remove':
      list.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
