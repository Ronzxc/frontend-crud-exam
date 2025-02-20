import React from "react";
import { Container, Card } from "reactstrap";
import NiceAvatar, { genConfig } from "react-nice-avatar";
import styles from "./Home.module.scss"; // Import SCSS file

const myConfig = genConfig({
  sex: "man",
  faceColor: "#AC6651",
  earSize: "small",
  eyeStyle: "circle",
  noseStyle: "long",
  mouthStyle: "peace",
  shirtStyle: "polo",
  glassesStyle: "none",
  hairColor: "#000",
  hairStyle: "thick",
  hatStyle: "none",
  hatColor: "#77311D",
  eyeBrowStyle: "up",
  shirtColor: "#77311D",
  bgColor: "#506AF4"
});

const ProfileCard = () => {
  return (
    <Container className={styles.profileContainer}>
      <Card className={styles.glassCard}>
        <NiceAvatar className={styles.avatar} {...myConfig} />
        <h1 className="display-4 mt-3">Ronwaldo Espinosa</h1>
        <address className={styles.address}>
          <a href="mailto:ronsespinosa999@gmail.com">ronsespinosa999@gmail.com</a>
          <br />
          <a href="tel:+635552368">(+63) 966-9670-622</a>
        </address>
      </Card>
    </Container>
  );
};

export default ProfileCard;
