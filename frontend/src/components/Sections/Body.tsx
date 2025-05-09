import { useEffect, useState } from "react";
import styled from "styled-components";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  updated_at: Date;
  created_at: Date;
};

export function BodySection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [showProduct, setShowProduct] = useState<Product>({
    id: "0",
    name: "",
    price: 0,
    quantity: 0,
    updated_at: new Date(),
    created_at: new Date(),
  });
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/inventory/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const productList = await response.json();
      setProducts(productList.products);
      console.log(`products: ${products}`);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    }
  };

  const updateProduct = async () => {
    try {
      const updateInfo = {
        id: showProduct.id,
        name: name,
        price: +price,
        quantity: +quantity,
        updated_at: new Date(),
      };
      const response = await fetch(
        `http://127.0.0.1:8000/inventory/products/${showProduct.id}/update`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateInfo),
        },
      );
      const content = await response.json();
      console.log(content);
    } catch (err) {
      console.error(err);
      setError("Unable to update the product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Container> Head of the Body Section</Container>
      <Container>
        <Row>
          <Col>
            <p>This space is for the body section...........</p>
            {error && <ErrorText>{error}</ErrorText>}
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setShowProduct(product);
                }}
              >
                {product.name}
              </button>
            ))}
          </Col>
          <Col>
            <p>Product details will be shown here....</p>
            {showProduct?.id === "0" ? (
              <p> Click on any product to see the details</p>
            ) : (
              <Container>
                {showUpdateForm && <p> Current Details : </p>}
                <p>Name: {showProduct.name}</p>
                <p>Price: {showProduct.price}</p>
                <p>Quantity: {showProduct.quantity}</p>
                <p>Created_at: {showProduct.created_at.toLocaleString()}</p>
                <p>Updated_at: {showProduct.updated_at.toLocaleString()}</p>
                <button onClick={() => setShowUpdateForm(true)}>
                  Update Product
                </button>

                {showUpdateForm && (
                  <Container>
                    <p>Update Product details to : </p>
                    <label>Name : </label>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <label>Price : </label>
                    <input
                      type="text"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                    <label>Quantity : </label>
                    <input
                      type="text"
                      name="quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                    ></input>
                    <button type="submit" onClick={() => updateProduct()}>
                      Update
                    </button>
                  </Container>
                )}
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: solid 1px yellow;
  padding: 20px;
  color: green;
`;

export const Row = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  // border: solid red 1px;
  color: blue;
`;

export const Col = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  // border: solid red 3px;
  color: blue;
`;

export const ProductCard = styled.div`
  background: white;
  // border: 1px solid #ccc;
  border-radius: 8px;
  width: 80%;
  margin: 10px 0;
  padding: 15px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
`;

export const ErrorText = styled.p`
  color: red;
  font-weight: bold;
`;
