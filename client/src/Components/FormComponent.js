import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormComponent = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={8}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
