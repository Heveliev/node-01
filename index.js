const contactsServise = require("./db/contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

  program.parse(process.argv);

const argv = program.opts();





const invokeAction = async({action, id, name, email,phone}) => {
    switch(action){
        case "list":
            const allContacts = await contactsServise.listContacts();
            return console.table(allContacts);
        case "get":
            const contact = await contactsServise.getContactById(id);
            return console.log(contact);
        case "remove":
            const removeContact = await contactsServise.removeContact(id);
            return console.log(removeContact);
        case "add":
            const newContact = await contactsServise.addContact(name,email,phone);
        return console.log(newContact);
        default:
            console.warn(`${action} Unknown action type!`);
            
    }
} 


invokeAction(argv);

