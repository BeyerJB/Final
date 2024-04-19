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
  color: white;
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
  const [userData, setUserData] = useState({ first_name: "", last_name: "", username: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/data/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.status === 201) {
        const data = await response.json();
        setUserData(data);
        setError(null);
        alert("Register success");
        window.location.href = "http://localhost:3000/items";
      } else {
        alert("ERROR, CANNOT REGISTER");
        throw new Error("RegistrationFailure");
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
        <Title>Login Form</Title>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Username</Label>
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
            <Label>Password</Label>
            <InputField
              type="text"
              placeholder="Enter Password"
              value={userData.password}
              onChange={(event) =>
                setUserData({ ...userData, password: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            <Label>First Name</Label>
            <InputField
              type="text"
              placeholder="Enter First Name"
              value={userData.first_name}
              onChange={(event) =>
                setUserData({ ...userData, first_name: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            <Label>Last Name</Label>
            <InputField
              type="text"
              placeholder="Enter Last Name"
              value={userData.last_name}
              onChange={(event) =>
                setUserData({ ...userData, last_name: event.target.value })
              }
            />
          </div>
          <Button type="submit" onClick={() => console.log("Button Clicked")}>
            Register
          </Button>
        </form>
      </LoginBox>
    </>
  );
};

export default Login;
