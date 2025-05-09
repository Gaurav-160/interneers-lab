import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return <Container></Container>;
};

export default Spinner;

const spin = keyframes`
  from {
      transform: rotate(0deg);
    }
  to {
      transform: rotate(360deg);
    }
`;

const Container = styled.div`
  height: 5vw;
  width: 5vw;
  margin: auto;
  border: solid white 2px;
  border-color: white transparent white transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
