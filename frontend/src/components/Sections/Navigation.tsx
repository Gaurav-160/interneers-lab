import { Link } from "react-router-dom";
import styled from "styled-components";

export function NavigationBar() {
  return (
    <Container>
      <NavContainer>
        <NavLeft>
          <NavItem>
            <NavLink to={"/"}>Inventory</NavLink>
          </NavItem>
        </NavLeft>
        <NavCenter>
          <NavItem>
            <NavLink to={"/"}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={"/products"}>Products </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={"/categories"}>Categories</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={"/"}>About Us</NavLink>
          </NavItem>
        </NavCenter>
        <NavRight>
          <NavItem>Account</NavItem>
        </NavRight>
      </NavContainer>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1.5em 0;
`;

export const NavContainer = styled.div`
  display: flex;
  width: 95%;
  margin: auto;
  align-items: center;
`;

export const NavLeft = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
`;

export const NavCenter = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
`;

export const NavRight = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

export const NavItem = styled.div`
  padding: 1rem;
  color: white;
  display: flex;
  cursor: pointer;
`;

export const NavLink = styled(Link)`
  padding: 1vw;
  color: white;
  text-decoration: none;
`;
