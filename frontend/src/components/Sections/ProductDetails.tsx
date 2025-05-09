import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { baseUrl, Product } from "static/constants";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    id: "0",
    name: "Product 1",
    category: "Category 1",
    price: "0",
    quantity: "0",
    updated_at: new Date(),
    created_at: new Date(),
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [name, setName] = useState<string>(product.name);
  const [category, setCategory] = useState<string>(product.category);
  const [price, setPrice] = useState<string>(product.price);
  const [quantity, setQuantity] = useState<string>(product.quantity);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async (prod_id: string | undefined) => {
    setIsLoading(true);
    if (prod_id === undefined) {
      console.log("Product id not defined.");
    }
    const rawResponse = await fetch(`${baseUrl}/inventory/products/${prod_id}`);
    const jsonResponse = await rawResponse.json();
    setProduct(jsonResponse);
    setIsLoading(false);
  };

  const initiateUpdate = () => {
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
    setShowForm(true);
  };

  const cancleUpdate = () => {
    setShowForm(false);
  };

  const updateProduct = async () => {
    const updated_product = {
      id: product.id,
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      updated_at: new Date(),
    };

    const response = await fetch(
      `${baseUrl}/inventory/products/${product.id}/update`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated_product),
      },
    );
    const content = await response.json();
    if (content.code === 404 && content.missing === "category") {
      alert(
        "Category not found. Kindly first create the category and then update the product.",
      );
      setShowForm(false);
      navigate("/categories/create");
      return;
    }

    fetchProduct(id);
    setShowForm(false);
    alert("Product Updated Successfully !");
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const deleteProduct = async () => {
    const response = await fetch(
      `${baseUrl}/inventory/products/${product.id}/delete`,
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
    alert("Product Deleted Successfully !");
    navigate("/products");
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <Container>
      {isLoading === true ? (
        <Spinner />
      ) : (
        <Box>
          <Title>{product.name}</Title>
          <Details>
            <Point>Category : {product.category}</Point>
            <Point>Price : {product.price}</Point>
            <Point>Quantity : {product.quantity}</Point>
            <Point>Created at : {product.created_at.toLocaleString()}</Point>
            <Point>
              Last Updated at : {product.updated_at.toLocaleString()}
            </Point>
          </Details>
          <Foot>
            <Button onClick={() => initiateUpdate()}>Update Product</Button>
            <Button onClick={() => openDeleteModal()}>Delete Product</Button>
          </Foot>
        </Box>
      )}

      {showForm && (
        <Box>
          <Title>Update Product</Title>
          <InputContainer>
            <Label>Name : </Label>
            <Input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </InputContainer>

          <InputContainer>
            <Label>Category : </Label>
            <Input
              type="text"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
          </InputContainer>

          <InputContainer>
            <Label>Quantity : </Label>
            <Input
              type="text"
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
          </InputContainer>

          <InputContainer>
            <Label>Price : </Label>
            <Input
              type="text"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </InputContainer>

          <InputContainer>
            <Label>Created_at : </Label>
            <Input type="text" name="created" disabled />
          </InputContainer>

          <InputContainer>
            <Label>Last Updated_at : </Label>
            <Input type="text" name="updated" disabled />
          </InputContainer>

          <Foot>
            <Button onClick={() => cancleUpdate()}>Cancle</Button>
            <Button type="submit" onClick={() => updateProduct()}>
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
                Are you sure you want to delete the product "{product.name}"?
                This action cannot be undone.
              </ModalText>
              <ModalButtons>
                <CancelButton onClick={closeDeleteModal}>Cancel</CancelButton>
                <DeleteButton onClick={deleteProduct}>Delete</DeleteButton>
              </ModalButtons>
            </ModalContent>
          </ModalContainer>
        </>
      )}
    </Container>
  );
};

export default ProductDetails;

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
  border: solid 0.4px;
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
