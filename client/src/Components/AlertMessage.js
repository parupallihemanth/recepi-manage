import React, { Children } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ variant, children }) => {
  return <Alert variant='info'>{children}</Alert>;
};

export default AlertMessage;
