const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const contacts = require('./contacts')

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts()
      console.table(allContacts)
      break
    case 'get':
      const oneContact = await contacts.getContactById(id)
      console.table(oneContact)
      break
    case 'add':
      const newContact = await contacts.addContact(name, email, phone)
      console.table(newContact)
      break
    case 'update':
      const updatedContact = await contacts.updateContactById(id, name, email, phone)
      console.table(updatedContact)
      break
    case 'remove':
      const removedContact = await contacts.removeContact(id)
      console.table(removedContact)
      break
    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

const arr = hideBin(process.argv)
const { argv } = yargs(arr)
invokeAction(argv)
  .then()
  .catch(er => console.log(er))
