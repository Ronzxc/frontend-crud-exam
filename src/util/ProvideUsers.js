import React, { createContext, useState, useEffect, useCallback } from "react";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const getUsers = useCallback(async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?page=1&per_page=10");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Add a new user
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Edit an existing user
  const editUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id
          ? { ...user, ...updatedUser } 
          : user
      )
    );
  
    console.log("Users after update:", users); // Debugging log
  };
  
  
  // Delete a user from API and update state
  const deleteUser = useCallback(async (id) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, loading, addUser, editUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
