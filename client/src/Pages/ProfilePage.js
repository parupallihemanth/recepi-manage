import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import face from "../Images/face.jpeg";
import { isAutheticated } from "../apiCalls/login";
import { Link } from "react-router-dom";

const { data } = isAutheticated();
console.log("data", data);
const ProfilePage = () => {
  return (
    <Container>
      <Row className='my-3'>
        <Col xs={8} md={6}>
          <Image src={face} width='70%' height='70%' roundedCircle />
          <h2>{data.name}</h2>
        </Col>
        <Col xs={4} md={6}>
          <h2>{data.email}</h2>
          <Link to={`/resetpassword/${data.user_id}`}>
            <a>Reset password</a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
