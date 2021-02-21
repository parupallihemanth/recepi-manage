import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormComponent from "./FormComponent";
import { register } from "../apiCalls/register";
import AlertMessage from "./AlertMessage";

const RegisterForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  let { name, email, password, error, success } = values;

  let hangleRegistration = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    register({ name, email, password })
      .then((data) => {
        if (data.errors) {
          setValues({
            ...values,
            error: data.errors,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            success: true,
          });
        }
      })

      .catch(console.log("error in registration"));
  };
  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to='/signin'>Login Here</Link>
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
      <h2 className='py-2'>Register here</h2>
      {successMessage()}
      {errorMessage()}
      <FormComponent>
        <Form className='form-box'>
          <Form.Group className='my-2'>
            <input
              type='text'
              value={name}
              onChange={hangleRegistration("name")}
              placeholder='Enter username'
            />
          </Form.Group>
          <Form.Group className='my-2'>
            <input
              type='email'
              onChange={hangleRegistration("email")}
              value={email}
              placeholder='Enter email'
            />
          </Form.Group>

          <Form.Group className='my-2'>
            <input
              type='password'
              onChange={hangleRegistration("password")}
              value={password}
              placeholder='Enter password'
            />
          </Form.Group>

          {/* <Form.Group className='my-2'>
            <input
              type='tel'
              onChange={hangleRegistration("phonenmber")}
              value={phonenumber}
              placeholder='Enter phonenumber'
            />
          </Form.Group> */}

          {/* <Form.Group className='my-3'>
            <select
              value={registration.gender}
              onChange={hangleRegistration("gender")}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </Form.Group> */}

          {/* <Form.Group>
            <input
              type='text'
              onChange={hangleRegistration("address")}
              value={address}
              placeholder='Enter address'
            />
          </Form.Group> */}
          <Row className='my-4'>
            <Col>
              <input
                type='submit'
                name=''
                onClick={onsubmit}
                value='Create Account'
              />
            </Col>
          </Row>

          <Row className='my-2'>
            <Col>
              <Link to='/login'>Existing user?</Link>
            </Col>
          </Row>
        </Form>
      </FormComponent>
    </>
  );
};

export default RegisterForm;
