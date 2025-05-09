import React from "react";
import styled from "styled-components";

const BodySection = () => {
  return (
    <Container>
      <H1>Welcome to the Inventory Application !!!!!</H1>
    </Container>
  );
};

export default BodySection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
`;

const H2 = styled.h2`
  color: white;
  text-align: center;
`;

const H1 = styled.h1`
  color: white;
  text-align: center;
  font-size: 5vw;
`;
