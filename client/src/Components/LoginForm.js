import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormComponent from "../Components/FormComponent";
import "../Styles/formStyling.css";
import { login, authenticate, isAutheticated } from "../apiCalls/login";

const LoginForm = ({ location }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
  });

  let { email, password, error, success } = values;

  const handleChage = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login({ email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, error: data.errors, success: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
          window.location.reload(true);
        }
      })
      .catch(console.log("signin request failed"));
  };

  const canRedirect = () => {
    if (isAutheticated()) {
      return <Redirect to='/' />;
    }
  };
  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? "" : "none" }}
          >
            Login success
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2 className='py-2'>Login here</h2>
      {canRedirect()}
      {successMessage()}
      {errorMessage()}
      <FormComponent>
        <Form className='form-box'>
          <Form.Group controlId='formBasicEmail' className='my-5'>
            <input
              type='email'
              value={email}
              onChange={handleChage("email")}
              placeholder='Enter email'
            />
          </Form.Group>

          <Form.Group className='my-5'>
            <input
              type='password'
              value={password}
              onChange={handleChage("password")}
              placeholder='Enter password'
            />
          </Form.Group>
          <Row>
            <Col>
              <input type='submit' name='' value='Login' onClick={onSubmit} />
            </Col>
          </Row>
          <Row className='my-2'>
            <Col>
              <Link to='/register'>Forgot password?</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/register'>Don't have an account?</Link>
            </Col>
          </Row>
        </Form>
      </FormComponent>
    </>
  );
};

export default LoginForm;
