import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/Layout";
import "./index.css";
import { useNavigate } from "react-router-dom";

const OfferProductCreate = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [disp, setDisp] = useState(0);

  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );

      if (data.success) {
        setCategories(data?.category);
      }
      // console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handelFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  console.log(photo);

  const handelFileHandel = async () => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("des", des);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("disp", disp);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/offer/create-offer`,
        formData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setDes("");
    setName("");
    setPhoto("");
    setPrice("");
    setQuantity("");
    setDisp("");
    navigate(-1);
  };
  return (
    <>
      <Layout>
        <div className="offer__product__category__whole__container">
          <div className="offer__product__create__header">
            Create Offer Product
          </div>
          <div className="product__create__form__container">
            <div className="create__form__element">
              <label>Name</label>
              <input
                type="text"
                placeholder="Write a product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="create__form__element">
              <label>Select Product Photo</label>
              <div className="file__upload__component">
                <input type="file" onChange={handelFileChange} />
              </div>
            </div>

            <div className="create__form__element">
              <label>Description</label>
              <input
                type="textarea"
                placeholder="Give a short description"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </div>
            <div className="create__form__element">
              <label>price</label>
              <input
                type="text"
                placeholder="Give product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="create__form__element">
              <label>What percentage of Discount</label>
              <input
                type="text"
                placeholder="Percentage of discount you want to give"
                value={disp}
                onChange={(e) => setDisp(e.target.value)}
              />
            </div>
            <div className="create__form__element">
              <label>Quantity</label>
              <input
                type="Number"
                placeholder="Write total quantity available"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="create__form__element__button">
              <button onClick={handelFileHandel}>Submit</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OfferProductCreate;

// <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="" disabled>
//             Select a category
//           </option>
//           {categories.map((ele) => (
//             <option key={ele.name} value={ele._id}>
//               {ele.name}
//             </option>
//           ))}
//         </select>
//         <input
//           placeholder="enter photo name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <div className="offer__page__whole__container">
//           <div className="file__upload__component">
//             <input type="file" onChange={handelFileChange} />
//           </div>
//         </div>
//         <div>
//           <button onClick={handelFileHandel}>Upload</button>
//         </div>
