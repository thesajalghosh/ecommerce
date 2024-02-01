import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/Layout";
import "./index.css";
import { useNavigate } from "react-router-dom";
import ProductCart from "../../../components/ProductCard";

const OfferProductCreate = () => {
  const [photo, setPhoto] = useState("");
  const [disp, setDisp] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const handelFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  console.log(photo);
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const product = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      console.log(product.data);
      if (product.data.success) {
        setProducts(product?.data?.products);
        // toast.success("product get successfully");
      } else {
        // toast.error("someth?ing wrong in succesfull try section");
        console.log("something wrong in succesfull try section");
      }
    } catch (error) {
      console.log(error);
      // toast.error("something went wrong");
    }
  };
  const loadMoreHandel = (e) => {
    e.preventDefault();
    setPage(page + 1);
    loadMore(page + 1);
  };
  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );

      if (data.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async (page) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      console.log(data.products);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  console.log(products);

  // const handelFileHandel = async () => {
  //   const formData = new FormData();
  //   formData.append("photo", photo);
  //   formData.append("name", name);
  //   formData.append("des", des);
  //   formData.append("price", price);
  //   formData.append("quantity", quantity);
  //   formData.append("disp", disp);
  //   try {
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_API}/api/v1/offer/create-offer`,
  //       formData
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setDes("");
  //   setName("");
  //   setPhoto("");
  //   setPrice("");
  //   setQuantity("");
  //   setDisp("");
  //   navigate(-1);
  // };
  return (
    <>
      <Layout>
        <div className="offer__product__category__whole__container">
          <div className="offer__product__create__header">
            Create Offer Product
          </div>
          <div className="all__products__admin__panal">
            {products?.map((e) => (
              <>
                <ProductCart element={e} />
              </>
            ))}
          </div>
          <div>
            {products && (
              <button className="btn btn-primary" onClick={loadMoreHandel}>
                {loading ? "Loading ..." : "Loading More"}
              </button>
            )}
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
