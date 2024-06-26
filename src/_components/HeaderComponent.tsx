import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../recoil/state/user.atom';
import { useAuthActions } from '../recoil/actions';
import { LoginModal } from './LoginModal';

export function HeaderComponent() {
  const authValue = useRecoilValueLoadable(userAtom);
  const authActions = useAuthActions();
  const [showLogin, setShowLogin] = useState(false);
  function openLoginModal() {
    setShowLogin(true);
  }

  function handleLogout() {
    authActions.logout();
  }

  function closeLoginModal() {
    setShowLogin(false);
  }

  return (
    <>
      <LoginModal show={showLogin} handleClose={closeLoginModal} />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>
            GaStRo
          </Navbar.Brand>
          <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
              {(authValue.state === 'hasValue' && authValue.contents)
                ? (<>
                  <Navbar.Text className=""></Navbar.Text>
                  <NavDropdown title={`${authValue.contents?.firstName} ${authValue.contents?.lastName}`} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={`/user/${authValue.contents?.id}/dishes`}>
                        My Dishes
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={`/user/${authValue.contents?.id}/profile`}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>)
                : (<Nav.Link onClick={openLoginModal}>Login</Nav.Link>)}
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
