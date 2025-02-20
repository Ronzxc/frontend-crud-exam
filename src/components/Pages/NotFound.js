import React from "react";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.errorContainer}>
      <h1>404</h1>
      <p>Oops! The page you're looking for is not here.</p>
      <a href="/">Go Back to Home</a>
    </div>
  );
};

export default NotFound;
