import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <FootHead>
        <FootHeadTitle>Title 1</FootHeadTitle>
        <FootHeadTitle>Title 2</FootHeadTitle>
        <FootHeadTitle>Title 3</FootHeadTitle>
      </FootHead>
      <Links>
        <LinkAtFooter to={"/about-us"}> About Us </LinkAtFooter>
        <LinkAtFooter to={"/"}> Home </LinkAtFooter>
        <LinkAtFooter to={"/products"}> Products </LinkAtFooter>
        <LinkAtFooter to={"/categories"}> Categories </LinkAtFooter>
        <LinkAtFooter to={"/t&c"}> Terms & Condition</LinkAtFooter>
        <LinkAtFooter to={"/contact-us"}> Contact Us </LinkAtFooter>
        <LinkAtFooter to={"/sign-in"}> Sign in </LinkAtFooter>
      </Links>
      <H3>Gaurav Bhardwaj | IIT KHARAGPUR | gbhardwaj869@gmail.com</H3>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  width: 100vw;
  border-top: dashed grey 0.5px;
  color: white;
  flex-direction: column;
  min-height: 30vh;
  padding: 1rem;
`;

const FootHead = styled.div`
  display: flex;
  width: 80vw;
  padding: 1rem;
  margin: auto;
  justify-content: space-around;
  align-items: center;
`;

const FootHeadTitle = styled.h2`
  display: flex;
  color: white;
  text-align: center;
  padding: 1rem;
  margin: 1rem;
`;

const Links = styled.div`
  display: flex;
  width: 75vw;
  margin: auto;
  padding: 1rem;
  justify-content: space-around;
`;

const LinkAtFooter = styled(Link)`
  color: grey;
  text-decoration: none;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const H3 = styled.h3`
  color: grey;
  font-size: 1vw;
  width: fit-content;
  margin: 1rem auto;
  padding: 1rem;
`;
