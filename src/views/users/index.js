import React, { useEffect, useState, useContext, useCallback } from "react";
import { Container, Table } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import NiceAvatar, { genConfig } from "react-nice-avatar";

import { UsersContext } from "../../util/ProvideUsers";
import styles from "./Users.module.scss";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";

const UsersList = () => {
  const { users } = useContext(UsersContext);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const perPage = 10;

  /**
   * Memoized function to paginate users.
   * Prevents unnecessary re-renders.
   */
  const paginateUsers = useCallback(
    (page) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      setPaginatedUsers(users.slice(start, end));
    },
    [users] // Dependency: updates only when users change
  );

  /**
   * Handles pagination when user clicks next/prev.
   */
  const handlePageTurn = (direction) => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + direction;
      return nextPage > 0 && nextPage <= Math.ceil(users.length / perPage)
        ? nextPage
        : prevPage;
    });
  };

  // Run pagination effect when currentPage changes
  useEffect(() => {
    paginateUsers(currentPage);
  }, [currentPage, paginateUsers]); // Fixed dependency warning

  return (
    <Container>
      {/* Add User Button */}
      <div className={styles.actionContainer}>
        <Link
          to={{
            pathname: `/users/create`,
            state: { background: location },
          }}
          className={styles.link}
        >
          <button className={`${styles.addButton} rounded`}>
            <span className="d-flex align-items-center gap-2">
              <FaPlus /> Add User
            </span>
          </button>
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

              {/* Avatar (Replaced img with NiceAvatar) */}
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
                    <button className={`${styles.editButton} rounded`}>
                      Edit
                    </button>
                  </Link>

                  <Link
                    to={{
                      pathname: `/users/${user.id}/delete`,
                      state: { background: location },
                    }}
                    className={styles.link}
                  >
                    <button className={`${styles.deleteButton} rounded`}>
                      Delete
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => handlePageTurn(-1)}
        >
          <FaArrowLeft /> Prev
        </button>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => handlePageTurn(1)}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </Container>
  );
};

export default UsersList;
