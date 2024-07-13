import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import "./index.css";
import contactLoader from "./loaders/contactLoader";
import rootLoader from "./loaders/rootLoader";
import {
  createContactAction,
  destroyContactAction,
  editContactAction,
} from "./routeAction/contact";
import Contact from "./routes/Contact";
import EditContact from "./routes/EditContact";
import Index from "./routes/Index";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: createContactAction,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editContactAction,
      },
      {
        path: "/contacts/:contactId/destroy",
        action: destroyContactAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
