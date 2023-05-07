const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname,"contacts.json");
const updateContatcs = async(contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))


async function listContacts () {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data)
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item=> item.id === contactId)
    return result || null
  }
  
async  function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
      return null
    }
    const [result] = contacts.splice(idx, 1);
    await updateContatcs(contacts)
    return result;
  }
  
async function addContact(name, email, phone) {
    const contacts = await listContacts(); 
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone
    }
    contacts.push(newContact);
    await updateContatcs(contacts);
    return newContact
  }
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};