# Notice board in react

This is the result of a school assignment. :)

# Context management

Context is managed through React Context to avoid unneccesary props drilling with useStateContext.

To access isLoggedIn and user object from context:

```tsx
import { useAuth } from "../contexts/AuthContext";
// inside component:
const { isLoggedin, user } = useAuth();
// isLoggedin : boolean
// user : User
```

## Enable protectedRoute

If a page should only show up for logged in users, requiresAuth needs to be true:

```tsx
CreatePost.route = {
  path: "/create-post",
  menuLabel: "Create Post",
  index: 1,
  requiresAuth: true,
};
```

If a page should be hidden from logged in users, use hideWhenAuthed: true.

```tsx
Login.route = {
  path: "/login",
  menuLabel: "Log in",
  index: "4",
  hideWhenAuthed: true,
};
```

Not including a `menuLabel` will also exclude the page from the header.

## Database

SQLite database :)

### Notices table

- id
- userId
- header
- textBody
- categories (space separated)
- show (true or false) - to be able to hide ones that have been fulfilled
- timestamp created
- timestamp latest change

### Comments table (or might just skip for a mailto :p)

- id
- userId
- noticeId
- textBody

# Todo

- CRUD for one resource (notices)
- Responsive design for mobile/tablet/desktop
- At least one custom react hook
- React Router for navigation
- REST API usage
- Bootstrap React for styling
