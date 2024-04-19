import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginBox = styled.div`
  // margin: 100px;
  text-align: center;
  border-radius: 50;
  border: 5px solid rgb(56, 27, 170);
  //border: 2px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  color: black;
`;

const Label = styled.div`
  font-size: 15px;
  display: flex;
  width: 24%;
  text-align: left;
  padding-left: 10px;
  color: white;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
`;

const EditItem = () => {
  const [userData, setUserData] = useState({
    id: "",
    user_id: 0,
    item_name: "",
    description: "",
    qty: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    //GRAB COOKIES AND SPLIT THEM INTO AN ARRAY
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      //FIND USERID
      if (cookie.startsWith("userid=")) {
        //REMOVE USERID
        const userId = cookie.substring("userid=".length);
        //console.log('USERNAME', userId);
        //GET NUMERICAL VALUE

        async function getNumericalId() {
          const response = await fetch("http://localhost:8081/auth/userid", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: `${userId}` }),
          });
          const data = await response.json();
          //console.log(await data[0].id);
          setUserData((prevUserData) => ({
            ...prevUserData,
            user_id: data[0].id,
          }));
        }
        getNumericalId();
      } else {
        alert("YOU MUST LOGIN TO USE THIS PAGE");
        window.location.href = "http://localhost:3000/allitems";
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("SENDING: ", userData);
    try {
      const response = await fetch("http://localhost:8081/data/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.status === 201) {
        const data = await response.json();
        setUserData(data);
        setError(null);
        alert("Item Edited");
        window.location.href = "http://localhost:3000/my_items";
      } else {
        alert("ERROR, CANNOT EDIT");
        throw new Error("EDITFailure");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <LoginBox>
        <Title>Edit Item</Title>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <InputField
              type="number"
              placeholder="Enter Item ID"
              value={userData.id}
              onChange={(event) =>
                setUserData({ ...userData, id: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            <InputField
              type="text"
              placeholder="Enter Item Name"
              value={userData.item_name}
              onChange={(event) =>
                setUserData({ ...userData, item_name: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            <InputField
              type="text"
              placeholder="Enter Description"
              value={userData.description}
              onChange={(event) =>
                setUserData({ ...userData, description: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            <InputField
              type="number"
              placeholder="Enter Quantity"
              value={userData.qty}
              onChange={(event) =>
                setUserData({ ...userData, qty: event.target.value })
              }
            />
          </div>
          <Button type="submit" onClick={() => console.log("Button Clicked")}>
            Add to Inventory
          </Button>
        </form>
      </LoginBox>
    </>
  );
};

export default EditItem;
