import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import "./index.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click submit");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form className="whole__form__container" onSubmit={handleSubmit}>
      <div className="whole__form">
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            id="exampleInputPassword1"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPhone">Phone</label>
          <input
            type="number"
            className="form-control"
            value={phone}
            id="exampleInputPhone1"
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            id="exampleInputaddress"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            value={answer}
            id="exampleInputaddress"
            placeholder="what is your best friend name"
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <div className="button__contianer">
          <button type="submit" className="ecommerce__but__design">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
