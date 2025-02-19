import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { UsersContext } from "../../util/ProvideUsers";

export const UserEditModal = () => {
  const history = useHistory();
  const { id } = useParams();
  const { users, editUser } = useContext(UsersContext);
  const [formData, setFormData] = useState({ email: "", firstName: "", lastName: "" });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const user = users.find((u) => u.id === parseInt(id, 10));
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      });
    } else {
      setIsAlertOpen(true);
    }
  }, [id, users]);

  const toggle = () => history.push("/users");

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value, // No need for a mapping, since the keys are correct
    }));
  };
  

  const handleOnSubmit = () => {
    const updatedUser = {
      id: parseInt(id, 10),
      email: formData.email,
      first_name: formData.firstName, // ✅ Convert camelCase to snake_case
      last_name: formData.lastName, // ✅ Convert camelCase to snake_case
    };
  
    console.log("Updated User:", updatedUser); // Debugging log
  
    editUser(updatedUser);
    toggle();
  };
  
  

  return (
    <Modal isOpen centered>
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
      <ModalBody>
        {isAlertOpen && <Alert color="danger">User not found.</Alert>}
        <Form>
          {["email", "firstName", "lastName"].map((field) => (
            <FormGroup key={field}>
              <Label>{field.replace(/^\w/, (c) => c.toUpperCase())}</Label>
              <Input type="text" name={field} value={formData[field]} onChange={handleChange} />
            </FormGroup>
          ))}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleOnSubmit}>Save</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
