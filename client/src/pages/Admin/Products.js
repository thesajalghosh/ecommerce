import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState(null);

  const getAllProduct = async () => {
    try {
      const product = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );

      console.log(product.data);
      if (product.data.success) {
        setProduct(product?.data?.products);
        toast.success("product get successfully");
      } else {
        toast.error("something wrong in succesfull try section");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  console.log(product);

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="text-center">All Product List</div>

            <div className="all__products__admin__panal">
              {product?.map((e) => (
                <>
                  <Link>
                    <div className="product__card">
                      <div className="product__card__image">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${e._id}`}
                          alt={e.slug}
                        />
                      </div>
                      <div className="lower__part__product__card">
                        <div className="lower__part__name">{e.name}</div>
                        <div className="lower__part__name">{e.description}</div>
                        <div className="lower__part__price__quantity">
                          <div className="lower__part__price">{e.price}</div>
                          <div className="lower__part__price">{e.quantity}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
