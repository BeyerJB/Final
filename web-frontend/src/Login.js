import React, { useState } from "react";
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

const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.status === 201) {
        const data = await response.json();
        setUserData(data);
        setError(null);
        alert("Login success");
        document.cookie = `userid=${userData.username}`;
        let x = document.cookie;
        console.log("ATTEMPTING TO WRITE COOKIE");
        console.log("COOKIE: ", x);
        window.location.href = "http://localhost:3000/my_items";
      } else {
        alert("User not found");
        throw new Error("User not found");
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
        <Title>Login</Title>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <InputField
              type="text"
              placeholder="Enter Username"
              value={userData.username}
              onChange={(event) =>
                setUserData({ ...userData, username: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            <InputField
              type="text"
              placeholder="Enter Password"
              value={userData.password}
              onChange={(event) =>
                setUserData({ ...userData, password: event.target.value })
              }
            />
          </div>
          <Button type="submit" onClick={() => console.log("Button Clicked")}>
            Login
          </Button>
        </form>
      </LoginBox>
    </>
  );
};

export default Login;
