import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { baseUrl, Product } from "static/constants";
import Spinner from "./Spinner";

type ProductSectionProps = {
  page: string;
};

const ProductSection: React.FC<ProductSectionProps> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseUrl}/inventory/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const productList = await response.json();
      setProducts(productList.products);
      console.log(`products: ${products}`);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <Title>PRODUCTS</Title>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <ProductBoxes>
          {products.map((product) => (
            <ProductLink to={`/products/${product.id}`}>
              <ProductBox>
                <H2>{product.name}</H2>
                <H3>Category : {product.category}</H3>
                <H3>Quantity :{product.quantity} </H3>
              </ProductBox>
            </ProductLink>
          ))}
        </ProductBoxes>
      )}

      {props.page === "home" && (
        <LinkToProductsPage to={"/products"}>
          See All Products {">>>>"}
        </LinkToProductsPage>
      )}
      {props.page === "products-page" && (
        <LinkToProductsPage to={"/products/create"}>
          Create New Product {">>>>"}
        </LinkToProductsPage>
      )}
    </Container>
  );
};

export default ProductSection;

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

export const ProductBoxes = styled.div`
  display: flex;
  width: 80vw;
  margin: auto;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
`;

export const ProductLink = styled(Link)`
  text-decoration: none;
  outline: none !important;
`;

export const ProductBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border: solid white;
  width: 16vw;
  height: 16vw;
  margin: 1rem;
  padding: 1rem;
`;

export const H2 = styled.h1`
  text-align: center;
  color: white;
  font-size: 2vw;
`;

export const H3 = styled.h1`
  text-align: center;
  color: white;
  font-size: 1vw;
`;

export const LinkToProductsPage = styled(Link)`
  color: white;
  font-size: 1.5vw;
  padding: 1vw;
  text-decoration: none;
`;
