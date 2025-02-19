import React, { Suspense } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import UsersList from "views/users";
import Home from "views/home";
import { UserAddModal } from "./UserAddModal";
import { UserDeleteModal } from "./UserDeleteModal";
import { UserEditModal } from "./UserEditModal";


export const ModalSwitch = () => {
  const location = useLocation();
  const background = location.state?.background; // Optional chaining to avoid errors

  return (
    <>
      {/* Main Page Routes */}
      <Switch location={background || location}>
        <Route exact path="/" component={Home} />
        <Route path="/UserList">
          <Suspense fallback={<p>Loading...</p>}> 
            <UsersList />
          </Suspense>
        </Route>
        <Route path="*" />
      </Switch>

      {/* Modal Routes (Only show if there's a background state) */}
      {background && (
        <Suspense fallback={<p>Loading...</p>}> 
          <Switch>
            <Route path="/users/create" component={UserAddModal} />
            <Route path="/users/:id/edit" component={UserEditModal} />
            <Route path="/users/:id/delete" component={UserDeleteModal} />
          </Switch>
        </Suspense>
      )}
    </>
  );
};
