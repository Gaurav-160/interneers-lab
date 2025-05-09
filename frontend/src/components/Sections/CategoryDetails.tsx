import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseUrl, Category, Product } from "static/constants";
import { useParams, useNavigate } from "react-router-dom";
import {
  H2,
  H3,
  ProductBox,
  ProductBoxes,
  ProductLink,
} from "./ProductSection";
import Spinner from "./Spinner";

const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({
    id: "0",
    title: "Category 1",
    description: "Category 1",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(category.title);
  const [description, setDescription] = useState<string>(category.description);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProductsUnderThisCategory = async (cat_name: string) => {
    const url = `${baseUrl}/inventory/products?category=${cat_name}`;
    const productResponse = await fetch(url);
    const { products } = await productResponse.json();
    setProducts(products);
  };

  const fetchCategory = async (cat_id: string | undefined) => {
    setIsLoading(true);
    if (typeof cat_id == "undefined") {
      alert("Product id not defined.");
    }
    const rawResponse = await fetch(
      `${baseUrl}/inventory/categories/${cat_id}`,
    );
    const jsonResponse = await rawResponse.json();
    setCategory(jsonResponse);
    fetchProductsUnderThisCategory(jsonResponse.title);
    setIsLoading(false);
  };

  const initiateUpdate = () => {
    setTitle(category.title);
    setDescription(category.description);
    setShowForm(true);
  };

  const cancleUpdate = () => {
    setShowForm(false);
  };

  const updateCategory = async () => {
    const updated_category = {
      id: category.id,
      title: title,
      description: description,
    };

    const response = await fetch(
      `${baseUrl}/inventory/categories/${category.id}/update`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated_category),
      },
    );
    const content = await response.json();
    if (content?.code === 404 && content.missing === "category") {
      alert(
        "Category not found. Kindly first create the category and then update the category.",
      );
      setShowForm(false);
      navigate("/categories/create");
    }

    console.log(content);
    fetchCategory(id);
    setShowForm(false);
    alert("Category Updated Successfully !");
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deleteCategory = async () => {
    const response = await fetch(
      `${baseUrl}/inventory/categories/${category.id}/delete`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    const jsonResponse = response.json();
    console.log(jsonResponse);
    closeDeleteModal();
    alert("Category Deleted Successfully !");
    navigate("/categories");
  };

  useEffect(() => {
    fetchCategory(id);
  }, [id]);

  return (
    <OuterContainer>
      <Container>
        {isLoading === true ? (
          <Spinner />
        ) : (
          <Box>
            <Title>{category.title}</Title>
            <Details>
              <Point>Description : {category.description}</Point>
              <Point>No. of Poducts : {products.length}</Point>
            </Details>
            <Foot>
              <Button onClick={() => initiateUpdate()}>Update Category</Button>
              <Button onClick={() => openDeleteModal()}>Delete Category</Button>
            </Foot>
          </Box>
        )}

        {showForm && (
          <Box>
            <Title>Update Category</Title>
            <InputContainer>
              <Label>Title : </Label>
              <Input
                type="text"
                name="name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </InputContainer>

            <InputContainer>
              <Label>Description : </Label>
              <Input
                type="text"
                name="quantity"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </InputContainer>

            <Foot>
              <Button onClick={() => cancleUpdate()}>Cancle</Button>
              <Button type="submit" onClick={() => updateCategory()}>
                Update
              </Button>
            </Foot>
          </Box>
        )}

        {showDeleteModal && (
          <>
            <ModalBackdrop onClick={closeDeleteModal} />
            <ModalContainer>
              <ModalContent>
                <ModalTitle>Confirm Deletion</ModalTitle>
                <ModalText>
                  Are you sure you want to delete the category "{category.title}
                  "? This action cannot be undone.
                </ModalText>
                <ModalButtons>
                  <CancelButton onClick={closeDeleteModal}>Cancel</CancelButton>
                  <DeleteButton onClick={deleteCategory}>Delete</DeleteButton>
                </ModalButtons>
              </ModalContent>
            </ModalContainer>
          </>
        )}
      </Container>
      <Container style={{ flexDirection: "column" }}>
        <Title>Products belonging to {category.title} Category</Title>
        <ProductBoxes>
          {products.map((product) => (
            <ProductLink to={`/products/${product?.id}`}>
              <ProductBox>
                <H2>{product.name}</H2>
                <H3>Category : {product.category}</H3>
                <H3>Quantity :{product.quantity} </H3>
              </ProductBox>
            </ProductLink>
          ))}
        </ProductBoxes>
      </Container>
    </OuterContainer>
  );
};

export default CategoryDetails;

const OuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 80vw;
  padding: 1vw;
  margin: 1vw auto;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  padding: 1vw;
  margin: 1vw auto;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: solid white 0.8px;
  padding: 1vw;
  width: 40%;
  margin: auto;
`;

const Title = styled.h2`
  display: flex;
  font-size: 1.5vw;
  color: white;
  text-align: center;
  padding: 1vw;
  margin: 1vw auto;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Point = styled.h4`
  text-align: center;
  color: white;
  font-size: 1vw;
  margin: 0.5vw;
  padding: 0.5vw;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.4vw;
  padding: 0.3vw;
`;

const Label = styled.label`
  padding: 0.3vw;
`;

const Input = styled.input`
    border: 0.5px;
    background-color: white:
    border-radius: 50%;
    font-size: 1.2vw;
    padding: 0.4vw;
    color: black;
`;

const Button = styled.button`
  padding: 1vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
`;

const Foot = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1vw;
  margin: 1vw;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const ModalContent = styled.div`
  background-color: #282c34;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;

const ModalText = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
  color: white;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #5a6268;
  }
`;

const DeleteButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #c82333;
  }
`;
