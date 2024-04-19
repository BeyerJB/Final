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
  color: Black;
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

const DeleteItem = () => {
  const [userData, setUserData] = useState({ item_id: 0});
  const [error, setError] = useState(null);

  useEffect(() => {
  //GRAB COOKIES AND SPLIT THEM INTO AN ARRAY
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    //FIND USERID
    if (cookie.startsWith('userid=')) {
      //REMOVE USERID
      const userId = cookie.substring('userid='.length);
      //console.log('USERNAME', userId);
      //GET NUMERICAL VALUE

      async function getNumericalId(){
      const response = await fetch("http://localhost:8081/auth/userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"username" :`${userId}`}),
      });
      const data = await response.json();
      //console.log(await data[0].id);
      setUserData(prevUserData => ({
        ...prevUserData,
        user_id: data[0].id
      }));
    }
    getNumericalId();




  } else {alert("YOU MUST LOGIN TO USE THIS PAGE");
  window.location.href = "http://localhost:3000/allitems";}
}
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("ATTEMPTING DELETE WITH: ", userData.item_id);
    try {
      const response = await fetch("http://localhost:8081/data/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"id" :`${userData.item_id}`}),
      });
      if (response.status === 201) {
        const data = await response.json();
        setUserData(data);
        setError(null);
        alert("Item deleted");
        window.location.href = "http://localhost:3000/my_items";
      } else {
        alert("ERROR, CANNOT DELETE");
        throw new Error("DeleteFailure");
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
        <Title>Delete Item</Title>
        <br />
        <form onSubmit={handleSubmit}>
          <div>

            <InputField
              type="number"
              placeholder="Enter Item ID"
              value={userData.item_id}
              onChange={(event) =>
                setUserData({ ...userData, item_id: event.target.value })
              }
            />
          </div>
          <br />
          <Button type="submit" onClick={() => console.log("Button Clicked")}>
            Delete
          </Button>
        </form>
      </LoginBox>
    </>
  );
};

export default DeleteItem;