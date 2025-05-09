import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Category } from "static/constants";
import Spinner from "./Spinner";
import { baseUrl } from "static/constants";

type CategorySectionProps = {
  page: string;
};

const CategorySection: React.FC<CategorySectionProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchcategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/inventory/categories`);
      if (!response.ok) throw new Error("Failed to fetch categorys");
      const categoryList = await response.json();
      setCategories(categoryList.categories);
      console.log(`categorys: ${categories}`);
    } catch (err) {
      console.error(err);
      setError("Failed to load categorys.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  return (
    <Container>
      <Title>Categories</Title>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <CategoryBoxes>
          {categories.map((category) => (
            <CategoryLink to={`/categories/${category.id}`}>
              <CategoryBox>
                <H2>{category.title}</H2>
                <H3>Description : {category.description} </H3>
              </CategoryBox>
            </CategoryLink>
          ))}
        </CategoryBoxes>
      )}

      {props.page === "home" && (
        <LinkToCategoryPage to={"/categories"}>
          See All categories {">>>>"}
        </LinkToCategoryPage>
      )}
      {props.page === "category-page" && (
        <LinkToCategoryPage to={"/categories/create"}>
          Create New Category {">>>>"}
        </LinkToCategoryPage>
      )}
    </Container>
  );
};

export default CategorySection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0rem;
`;

const Title = styled.h1`
  width: 100vw;
  text-align: center;
  color: white;
  font-size: 2vw;
`;

const CategoryBoxes = styled.div`
  display: flex;
  width: 80vw;
  margin: auto;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  outline: none !important;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: solid white;
  width: 16vw;
  height: 16vw;
  margin: 1rem;
  padding: 1rem;
`;

const H2 = styled.h1`
  text-align: center;
  color: white;
  font-size: 2vw;
`;

const H3 = styled.h1`
  text-align: center;
  color: white;
  font-size: 1vw;
`;

const LinkToCategoryPage = styled(Link)`
  color: white;
  font-size: 1.5vw;
  padding: 1vw;
  text-decoration: none;
`;
