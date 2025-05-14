import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";

import FilterUsersByRole from "./FilterUsersByRole";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Container className="mt-2">
      {Array.isArray(users) && users.length > 0 ? (
      [...new Set(users.map((user) => user.role))].map((role) => (
        <FilterUsersByRole users={users}  role={role}  />
    ))
) : (
  <p>No users to display</p>
)}
      </Container>
    </>
  );
};

export default Users;
