import { getContacts } from "../contacts.js";

export default async function rootLoader({ request: { url: requestUrl } }) {
  const url = new URL(requestUrl);
  console.log(url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}
