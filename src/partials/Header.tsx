import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import routes from '../routes';
import { useAuth } from '../contexts/AuthContext'

export default function Header() {

  // whether the navbar is expanded or not
  // (we use this to close it after a click/selection)
  const [expanded, setExpanded] = useState(false);
  const { isLoggedIn, user, logout } = useAuth()

  //  get the current route
  const pathName = useLocation().pathname;
  const currentRoute = routes
    .slice().sort((a, b) => a.path.length > b.path.length ? -1 : 1)
    .find(x => pathName.indexOf(x.path.split(':')[0]) === 0);
  // function that returns true if a menu item is 'active'
  const isActive = (path: string) =>
    path === currentRoute?.path || path === currentRoute?.parent;

  const visibleRoutes = routes.filter(route => {
    if (!route.menuLabel) return false
    if (route.requiresAuth && !isLoggedIn) return false
    if (route.hideWhenAuthed && isLoggedIn) return false
    return true
  })

  console.log(visibleRoutes)

  function handleLogout() {
    fetch('/api/login', { method: 'DELETE' }).then(() => {
      logout()

    }).catch(error => {
      console.error('Logout failed:', error);
      logout()
    });
  }

  return <header>
    <Navbar
      expanded={expanded}
      expand="md"
      className="bg-primary"
      data-bs-theme="dark"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand className="me-5" as={Link} to="/">
          NoticeBoard
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {visibleRoutes.filter(x => x.menuLabel).map(
              ({ menuLabel, path }, i) =>
                <Nav.Link
                  as={Link} key={i} to={path}
                  className={isActive(path) ? 'active' : ''}
                  /* close menu after selection*/
                  onClick={() => setTimeout(() => setExpanded(false), 200)}
                >{menuLabel}</Nav.Link>
            )}
            {
              isLoggedIn &&
              <Button onClick={handleLogout}> Log out</Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>;
}