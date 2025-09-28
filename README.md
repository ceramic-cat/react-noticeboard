# Notice board in react

This is the result of a school assignment. :)

## Database

SQLite database.

### Context management
- The main pages can access the context through useStateContext()
- The layout componentes (header, footer, main) get the stateAndSetter handed to them as props and can be accessed through 
  const [state, setter] = stateAndSetter

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
