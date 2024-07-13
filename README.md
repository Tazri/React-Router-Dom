# Content of Table

table of content :

- [Content of Table](#content-of-table)
  - [Creating Browser Router](#creating-browser-router)
  - [errorElement](#errorelement)
  - [Create Path Params](#create-path-params)
  - [Adding Children Route](#adding-children-route)
  - [Link to](#link-to)
  - [loader and useLoaderData](#loader-and-useloaderdata)
  - [action](#action)
  - [NavLink](#navlink)
  - [useNavigation Hook](#usenavigation-hook)
  - [Index Routes](#index-routes)
  - [useNavigate](#usenavigate)

## Creating Browser Router

```jsx
// create router
const browserRouter = createBrowserRouter([
  // list of element with path
  {
    path: "/",
    element: <JSXElementToRender />,
  },
]);
```

To render it using router provider :

```jsx
<React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>
```

## errorElement

```jsx
const browserRouter = createBrowserRouter([
  {
    path: "/", // path
    element: <Home />, // component will generate
    errorElement: <ErrorPage />, // error page generate if error happend.
  },
]);
```

Catching route error using `useRouteError` hook.

```jsx
export default function ErrorPage() {
  const error = useRouteError();
  // here error is route error
}
```

> 🟢 When the user navigates to routes that don't exist you'll get an error response with a "Not Found" statusText.

## Create Path Params

```jsx
createBrowserRouter([
  {
    path: "route/:param", // here param is vairable
  },
]);
```

## Adding Children Route

```jsx
createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
```

Use `<Outlet />` to access children component from parent component

## Link to

`Link` component use for go to another path without refreshing.

```jsx
<Link to="path-url" />
```

## loader and useLoaderData

```jsx
const browserRouter = createBrowserRouter([
  {
    // route
    path: "root",
    loader: loaderFunction, // here loaderFunction which use to get data from server
    element: <Component />,
  },
]);
```

get loader data inside the element component, use `useLoaderData` hook.

loader function always get params as a object paramter

```jsx
async function loader({ params }) {}
```

## action

```jsx
const browserRouter = createBrowserRouter([
  {
    aciton: actionFunction, // every time action call, the loader called automatically
    loader: loaderFunction,
    element: <Element />,
  },
]);
```

```jsx
// inside element
// below, the form from react-router-dom
<Form
  method="post"
  {/** That means when the browser creates the request for the next
  document, it doesn't put the form data into the request POST body,
  but into the URLSearchParams of a GET request.*/}
  onSubmit={(e) => {
    e.preventDefault(); // if you want to stop submit
  }}
  action="site"
>
  {" "}
  {/** it hit 'existing-path/site' */}
  {/** if there is no action then it hit it self. */}
  {/** it's trigger the action */}
  <button type="submit">New</button>
</Form>
```

```jsx
function actionFunction({ params, request, context }) {
  return; // something here or redirect("path")
}
```

## NavLink

It's work like a `Link` but different is :

```jsx
<NavLink
  to="path"
  class={(isActive, isPendding) => {
    // isActive is true if the current path match with to
    // isLoading is true if the data is currently loading
    return className;
  }}
></NavLink>
```

## useNavigation Hook

It return current navigation state, it can be : "idle" | "submitting" | "loading"

## Index Routes

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      /* existing routes */
    ],
  },
]);
```

Note the `{ index:true }` instead of `{ path: "" }`. That tells the router to match and render this route when the user is at the parent route's exact path, so there are no other child routes to render in the <Outlet>.

## useNavigate

useNavigate

```jsx
const navigate = useNavigate();
navigate(-1); // sent back one entry in the browser history
```
