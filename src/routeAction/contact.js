import { redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "../contacts";

export async function createContactAction() {
  const contact = await createContact();
  console.log("rootAction");
  return { contact, type: "action" };
}

export async function editContactAction({ request, params }) {
  const formData = await request.formData();
  console.log(formData.get("first"));
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export async function destroyContactAction({ request, params: { contactId } }) {
  throw new Error("Oh dang!");
  await deleteContact(contactId);
  return redirect("/");
}
