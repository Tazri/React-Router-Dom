import { getContact } from "../contacts.js";

export default async function contactLoader({ params }) {
  const contact = await getContact(params.contactId);

  return { contact, params };
}
