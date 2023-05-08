const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname,"contacts.json");
const updateContatcs = async(contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))


async function listContacts () {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data)
  } catch (error) {
    throw new Error(error.message)
  }
 
  }
  
  async function getContactById(contactId) {
    try {
      const contacts = await listContacts();
      const result = contacts.find(item=> item.id === contactId)
      return result || null
    } catch (error) {
      throw new Error(error.message)
    }
    
  }
  
async  function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
      return null
    }
    const [result] = contacts.splice(idx, 1);
    await updateContatcs(contacts)
    return result;
  } catch (error) {
    throw new Error(error.message)
  }
   
  }
  
async function addContact(name, email, phone) {
  try { 
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
    
  } catch (error) {
    throw new Error(error.message)
  }
   
  }
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};