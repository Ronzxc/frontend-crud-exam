import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { UsersContext } from "../../util/ProvideUsers";
import NiceAvatar, { genConfig } from "react-nice-avatar";

export const UserAddModal = () => {
  const { addUser } = useContext(UsersContext);
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const [validation, setValidation] = useState({
    email: null,
    firstName: null,
    lastName: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const toggle = () => history.push("/users");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const isValid =
      name === "email"
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : /^[a-zA-Z]+$/.test(value);

    setValidation((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  
    const isValidForm = Object.values(validation).every(Boolean);
    if (!isValidForm || Object.values(formData).some((val) => val.trim() === "")) {
      setIsAlertOpen(true);
      return;
    }
  
    // Send request to the API
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `${formData.firstName} ${formData.lastName}` }),
    });
  
    const result = await response.json();
  
    addUser({
      id: parseInt(result.id, 10),
      email: formData.email,
      first_name: formData.firstName, 
      last_name: formData.lastName,    
      avatarConfig: genConfig(formData.email), // Avatar generation
    });
  
    toggle();
  };
  
  return (
    <Modal isOpen centered>
      <ModalHeader toggle={toggle}>Add User</ModalHeader>
      <ModalBody>
        {isAlertOpen && <Alert color="danger">Please check your inputs.</Alert>}

        {/* Avatar Preview */}
        <div className="d-flex justify-content-center mb-3">
          <NiceAvatar
            style={{ width: "80px", height: "80px" }}
            {...genConfig(formData.email)}
          />
        </div>

        <Form>
          {["email", "firstName", "lastName"].map((field) => (
            <FormGroup key={field}>
              <Label for={field} className="fw-bold">
                {field.replace(/^\w/, (c) => c.toUpperCase())} <span className="text-danger">*</span>
              </Label>
              <Input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                valid={isSubmitted && validation[field]}
                invalid={isSubmitted && validation[field] === false}
              />
              <FormFeedback>{field === "email" ? "Invalid email" : "Only letters allowed"}</FormFeedback>
            </FormGroup>
          ))}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleOnSubmit}>
          Submit
        </Button>
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
