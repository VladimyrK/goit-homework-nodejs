const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, 'db/contacts.json')

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async id => {
  const contacts = await listContacts()
  const result = contacts.find(item => item.id == id)
  if (!result) {
    return null
  }
  return result
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const updateContactById = async (id, name, email, phone) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id == id)
  if (idx === -1) {
    return null
  }
  name = name || contacts[idx].name
  email = email || contacts[idx].email
  phone = phone || contacts[idx].phone
  id = String(id)
  contacts[idx] = { id, name, email, phone }
  await updateContacts(contacts)
  return contacts[idx]
}

const removeContact = async id => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id == id)
  if (idx === -1) {
    return null
  }
  const [removeContact] = contacts.splice(idx, 1)
  updateContacts(contacts)
  return removeContact
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
}
