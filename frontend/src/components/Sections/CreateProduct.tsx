import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "static/constants";
import { useParams, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [showCancleModal, setShowCancleModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const createProduct = async () => {
    const product = {
      name: name,
      category: category,
      brand: brand,
      price: price,
      quantity: quantity,
      description: description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const response = await fetch(
      `http://127.0.0.1:8000/inventory/products/create`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      },
    );
    const content = await response.json();
    console.log(content);
    navigate(`/products/${content.id}`);
  };

  const openCancleModal = () => {
    setShowCancleModal(true);
  };

  const closeCancleModal = () => {
    setShowCancleModal(false);
  };

  const cancleCreateProduct = () => {
    navigate("/products");
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Box>
        <Title>Create Product</Title>
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
          <Label>Brand : </Label>
          <Input
            type="text"
            name="brand"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
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
          <Label>Description : </Label>
          <Input
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
          <Button onClick={() => openCancleModal()}>Cancle</Button>
          <Button type="submit" onClick={() => createProduct()}>
            Create
          </Button>
        </Foot>
      </Box>

      {showCancleModal && (
        <>
          <ModalBackdrop onClick={closeCancleModal} />
          <ModalContainer>
            <ModalContent>
              <ModalTitle>Confirm Cancle</ModalTitle>
              <ModalText>
                Are you sure you don't want to create new product ? The entered
                data will be lost.
              </ModalText>
              <ModalButtons>
                <CancelButton onClick={closeCancleModal}>Cancle</CancelButton>
                <DeleteButton onClick={cancleCreateProduct}>Yes</DeleteButton>
              </ModalButtons>
            </ModalContent>
          </ModalContainer>
        </>
      )}
    </Container>
  );
};

export default CreateProduct;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  border: solid 1px grey;
  padding: 1vw;
  margin: 1vw auto;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: solid;
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
