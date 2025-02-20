import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { UsersContext } from "../../util/ProvideUsers";
import NiceAvatar, { genConfig } from "react-nice-avatar";

export const UserDeleteModal = () => {
  const history = useHistory();
  const { id } = useParams();
  const { users, deleteUser } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === parseInt(id, 10));
    setUser(foundUser || null);
  }, [id, users]);

  const toggle = () => history.push("/users");

  const handleOnSubmit = () => {
    if (!user) {
      setIsAlertOpen(true);
      return;
    }
    deleteUser(user.id);
    toggle();
  };

  return (
    <Modal isOpen centered>
      <ModalHeader toggle={toggle}>Delete User</ModalHeader>
      <ModalBody>
        {isAlertOpen && <Alert color="danger">User not found.</Alert>}
        {user && (
          <>
            {/* Avatar Preview (Using react-nice-avatar) */}
            <div className="d-flex justify-content-center mb-3">
              <NiceAvatar
                style={{ width: "80px", height: "80px" }}
                {...genConfig(user.email)}
              />
            </div>

            <p className="text-center">
              Are you sure you want to delete <strong>{user.first_name} {user.last_name}</strong>?
            </p>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" outline onClick={handleOnSubmit}>
          Confirm Delete
        </Button>
        <Button color="secondary" outline onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
