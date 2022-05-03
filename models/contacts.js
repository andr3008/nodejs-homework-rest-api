const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactInFS = async (contacts) => {
	const data = JSON.stringify(contacts, null, 2);
	await fs.writeFile(contactsPath, data);
};

const listContacts = async () => {
	return contacts;
};

const getContactById = async (contactId) => {
	const [contact] = contacts.filter((contact) => contact.id === contactId);
	return contact;
};
const addContact = async ({ name, email, phone }) => {
	const newContact = { id: randomUUID(), name, email, phone };
	contacts.push(newContact);
	await updateContactInFS(contacts);
	return newContact;
};

const removeContact = async (contactId) => {
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index !== -1) {
		const [result] = contacts.splice(index, 1);
		await updateContactInFS(contacts);
		return result;
	}
	return null;
};

const updateContact = async (contactId, body) => {
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index !== -1) {
		const updatedContact = { id: contactId, ...contacts[index], ...body };
		contacts[index] = updatedContact;
		await updateContactInFS(contacts);
		return updatedContact;
	}
	return null;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
