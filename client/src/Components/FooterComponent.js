import React, { useState, useEffect } from "react";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import { isAutheticated, getAllLogins } from "../apiCalls/login";
import axios from "axios";

const { data, token } = isAutheticated();
console.log(data, token);

const FooterComponent = () => {
  const [loginHistory, setLoginhistory] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const allLogins = () => {
    getAllLogins(data.user_id, token).then((logins) => {
      if (logins.err) {
        console.log(logins.err);
      } else setLoginhistory(logins);
    });
    handleShow();
  };

  //   useEffect(() => {
  //     if (data.user_id ? data.user_id : 0) {
  //       allLogins();
  //     }
  //   }, []);
  let d = new Date();
  return (
    <>
      {isAutheticated() ? (
        <footer
          class='page-footer font-small blue'
          style={{ minheight: "100vh" }}
        >
          <div class='footer-copyright text-center py-3'>
            {loginHistory.map((lh, index) => (
              <Row className='justify-content-center'>
                <Col xs={12} md={6}>
                  <ListGroup>
                    <ListGroup.Item>{lh.login_date}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            ))}
            <Button variant='dark' onClick={allLogins}>
              login History
            </Button>
          </div>
        </footer>
      ) : (
        <h4>Please, login to see login history</h4>
      )}
    </>
  );
};

export default FooterComponent;
