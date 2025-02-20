import React, { useEffect, useState, useContext, useCallback } from "react";
import { Container, Table } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import NiceAvatar, { genConfig } from "react-nice-avatar";

import { UsersContext } from "../../util/ProvideUsers";
import styles from "./UsersList.module.scss";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";

const UsersList = () => {
  const { users } = useContext(UsersContext);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const perPage = 10;

  const paginateUsers = useCallback(
    (page) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      setPaginatedUsers(users.slice(start, end));
    },
    [users] // Dependency: updates only when users change
  );


  const handlePageTurn = (direction) => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + direction;
      return nextPage > 0 && nextPage <= Math.ceil(users.length / perPage)
        ? nextPage
        : prevPage;
    });
  };

useEffect(() => {
  paginateUsers(currentPage);
}, [currentPage, users, paginateUsers]); 


  return (
    <Container className={styles.usersContainer}> 
      {/* Add User Button */}
      <div className={styles.actionContainer}>
        <Link
          to={{
            pathname: `/users/create`,
            state: { background: location },
          }}
          className={styles.link}
        >
          <Button color="success" outline>
            <span className="d-flex align-items-center gap-2">
              <FaPlus /> Add User
            </span>
          </Button>
        </Link>
      </div>

      {/* Users Table */}
      <Table borderless hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className={styles.row}>
              <th scope="row" className="align-middle">{user.id}</th>

              <td className="align-middle">
                <Link
                  to={{
                    pathname: `/users/${user.id}/profile`,
                    state: { background: location },
                  }}
                >
                  <NiceAvatar
                    className={styles.avatar}
                    style={{ width: "50px", height: "50px" }}
                    {...genConfig(user.email)} // Generates a unique avatar per user
                  />
                </Link>
              </td>

              <td className="align-middle">{user.email}</td>
              <td className="align-middle">{user.first_name}</td>
              <td className="align-middle">{user.last_name}</td>

              <td className="align-middle">
                <div className={styles.actionButtons}>
                  <Link
                    to={{
                      pathname: `/users/${user.id}/edit`,
                      state: { background: location },
                    }}
                    className={styles.link}
                  >
                    <Button color="primary" outline>
                      Edit
                    </Button>
                  </Link>

                  <Link
                    to={{
                      pathname: `/users/${user.id}/delete`,
                      state: { background: location },
                    }}
                    className={styles.link}
                  >
                    <Button color="danger" outline>
                      Delete
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <Button
          type="button"
          color="secondary" outline
          onClick={() => handlePageTurn(-1)}
        >
          <FaArrowLeft /> Prev
        </Button>
        <Button
          type="button"
          color="secondary" outline
          onClick={() => handlePageTurn(1)}
        >
          Next <FaArrowRight />
        </Button>
      </div>
    </Container>
  );
};

export default UsersList;
