import React from "react";
import styled from "styled-components";
import { NavigationBar } from "./Sections/Navigation";
import BodySection from "./Sections/BodySection";
import ProductSection from "./Sections/ProductSection";
import CategorySection from "./Sections/CategorySection";
import Footer from "./Sections/Footer";

export default function Home() {
  return (
    <Container>
      <NavigationBar />
      <BodySection />
      <ProductSection page="home" />
      <CategorySection page="home" />
      <Footer />
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #020024;
  background: linear-gradient(
    20deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  min-height: 100vh;
  color: white;
`;
