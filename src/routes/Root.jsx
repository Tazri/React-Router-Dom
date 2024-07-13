import { useEffect, useRef, useState } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export default function Root() {
  const { contacts, q } = useLoaderData();
  const [query, setQuery] = useState(typeof q === "string" ? q : "");
  const navigation = useNavigation();
  const submit = useSubmit();
  const ref = useRef(null);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    setQuery(q);
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? "loading" : ""}
              defaultValue={q}
              onChange={(e) => {
                setQuery(e.target.value);

                clearTimeout(ref.current);
                ref.current = setTimeout(() => {
                  const isFirstSearch = q == null;
                  submit(e.target.form, {
                    replace: !isFirstSearch,
                  });
                }, 1000);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ContactList contacts={contacts} />
          ) : (
            <p>
              <i>No Contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

function ContactList({ contacts }) {
  return (
    <ul>
      {contacts.map((contact) => {
        return (
          <li key={contact.id}>
            <NavLink
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
              to={`contacts/${contact.id}`}
            >
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
