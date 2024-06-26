import { Modal , Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useAuthActions } from '../recoil/actions';

type LoginModalProps = {
  show: boolean,
  handleClose: () => void,
}

export function LoginModal ({ show, handleClose }: LoginModalProps) {
  const authActions = useAuthActions();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  async function login() {
    console.log(loginForm);
    await authActions.login(loginForm);
    handleClose();
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={login}>
          Login
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Register
        </Button>
        {/*<Button variant="primary" onClick={handleClose}>*/}
        {/*  Sign Up*/}
        {/*</Button>*/}
      </Modal.Footer>
    </Modal>
  )
}
