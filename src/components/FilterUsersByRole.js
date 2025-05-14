import React, { useState } from "react";
import { Col, Image, Row, Container } from "react-bootstrap";
import userImage from "../assets/user_profile.png";

function FilterUsersByRole({ users, role }) {
  const filteredUsers = users.filter((user) => user.role === role);

  if (filteredUsers.length === 0) return null;

  return (
    <div className="mb-4">
      <h5>{role.charAt(0).toUpperCase() + role.slice(1)}s</h5>
      <hr />
      <Row>
        {filteredUsers.map((user, i) => (
          <Col
            key={user._id}
            xs={12}
            sm={6}
            md={4}
            className="mb-3 d-flex flex-column align-items-center"
          >
            <Image
              src={userImage}
              roundedCircle
              width={50}
              height={50}
              className="mb-2"
            />
            <div>{user.name}</div>
            <div><strong>{user.role}</strong></div>
            <div>{user.email}</div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FilterUsersByRole;
