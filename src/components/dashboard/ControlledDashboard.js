import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Register from "../register/Register";
import DashCard from "../register/DashCard";
import Users from "../Users";
import { Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Compressors from "../compressors/Compressors";

function ControlledDashboard() {
  // const [key, setKey] = useState("home");

  const storedAuth = JSON.parse(localStorage.getItem("auth"));

  let operatorMenu ;
  if ( storedAuth?.roleName === "comfoperator" ) {
    operatorMenu = (
      <Tab eventKey="compressors" title="Compressor">
      <Compressors />
    </Tab>
    )
  } else if (storedAuth?.roleName === "chilloperator") {
    operatorMenu = (
    <Tab eventKey="contact" title="Chill Operators">
    Chiller Factory Operators
  </Tab>
    )
  }
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-2"
      justify
    >
      <Tab eventKey="profile" title="Dashboard">
        <Container className="mt-2">
          <Row>
            <Col
              key={1}
              xs={12}
              sm={6}
              md={4}
              className="mb-2 d-flex justify-content-center"
            >
              <div className="card-center">
                <Card style={{ width: "20rem", height: "200px" }}>
                  <Card.Body>
                    <Card.Title>Users List</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      List
                    </Card.Subtitle>
                    <Card.Text>Admin Users: {5}</Card.Text>
                    <Card.Text>Compressor Factory Operators: {3}</Card.Text>
                    <Card.Text>Chiller Factory Operators: {2}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col
              key={2}
              xs={12}
              sm={6}
              md={4}
              className="mb-2 d-flex justify-content-center"
            >
              <DashCard />
            </Col>
            <Col
              key={3}
              xs={12}
              sm={6}
              md={4}
              className="mb-2 d-flex justify-content-center"
            >
              <DashCard />
            </Col>
            <Col
              key={4}
              xs={12}
              sm={6}
              md={4}
              className="mb-2 d-flex justify-content-center"
            >
              <DashCard />
            </Col>
          </Row>
        </Container>
      </Tab>
 
      <Tab eventKey="userslist" title="Users">
        <Users />
      </Tab>

      
      <Tab eventKey="register" title="Operator Registation">
        <Register />
      </Tab>
      {operatorMenu}
    </Tabs>
  );
}

export default ControlledDashboard;
