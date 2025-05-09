import React from "react";
import styled from "styled-components";
import { NavigationBar } from "./Sections/Navigation";
import Footer from "./Sections/Footer";
import CategorySection from "./Sections/CategorySection";

export default function CategoryPage() {
  return (
    <Container>
      <NavigationBar />
      <CategorySection page="category-page" />
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
