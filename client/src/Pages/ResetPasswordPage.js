import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import FormComponent from "../Components/FormComponent";
import { resetPassword, isAutheticated } from "../apiCalls/login";

const { data, token } = isAutheticated();

const ResetPasswordPage = () => {
  const [newPassword, setNewpassword] = useState({
    password: "",
    error: "",
    success: false,
  });

  const { password } = newPassword;
  console.log("password", password);
  const handleChage = (name) => (event) => {
    setNewpassword({
      ...newPassword,
      error: false,
      [name]: event.target.value,
    });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setNewpassword({ ...newPassword, error: false });
    resetPassword(data.user_id, token, password)
      .then((passworddata) => {
        if (passworddata.errors) {
          setNewpassword({
            ...newPassword,
            error: passworddata.errors,
            success: false,
          });
        } else {
          setNewpassword({
            ...newPassword,
            password: "",
            success: true,
            // didRedirect: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //   const canRedirect = () => {
  //     if (isAutheticated()) {
  //       return <Redirect to='/' />;
  //     }
  //   };
  return (
    <>
      {/* {canRedirect()} */}
      <h2 className='py-2'>Reset your password</h2>
      <FormComponent>
        <Form className='form-box'>
          <Form.Group controlId='formBasicEmail' className='my-5'>
            <input
              type='password'
              value={password}
              onChange={handleChage("password")}
              placeholder='Enter new password'
            />
          </Form.Group>
          <Row>
            <Col>
              <input
                type='submit'
                name=''
                value='Reset password'
                onClick={onsubmit}
              />
            </Col>
          </Row>
        </Form>
      </FormComponent>
    </>
  );
};

export default ResetPasswordPage;
