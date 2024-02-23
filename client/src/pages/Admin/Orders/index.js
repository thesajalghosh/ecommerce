import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import "./index.css";
import axios from "axios";

const Orders = () => {
  const [page, setPage] = useState("default");
  const [neworder, setNewOrder] = useState([]);
  const [packageOrder, setPackageOrder] = useState([]);
  const [shippingOrder, setShippingOrder] = useState([]);
  const [successOrder, setSuccessOrder] = useState([]);

  const getOneOrderStatusData = async (statusCode) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/get-one-status-order`,
        { orsat: statusCode }
      );
      return data.orders;
      // console.log(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (page === "neworder") {
          data = await getOneOrderStatusData(1);
          setNewOrder(data);
        } else if (page === "packageorder") {
          data = await getOneOrderStatusData(2);
          setPackageOrder(data);
        } else if (page === "shippingorder") {
          data = await getOneOrderStatusData(3);
          setShippingOrder(data);
        } else if (page === "successorder") {
          data = await getOneOrderStatusData(4);
          setSuccessOrder(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page]);

  console.log(neworder);

  return (
    <Layout>
      <div className="admin__page__order__whole__container">
        {page === "default" && (
          <Layout>
            <div className="order__status__button__page">
              <button onClick={() => setPage("neworder")}>New Order</button>
              <button onClick={() => setPage("packageorder")}>
                Package status order
              </button>
              <button onClick={() => setPage("shippingorder")}>
                Shipping status order
              </button>
              <button onClick={() => setPage("successorder")}>
                Success status order
              </button>
            </div>
          </Layout>
        )}
        {page === "neworder" && (
          <Layout getBackfun={() => setPage("default")}>
            <div className="new__order__whole__container">
              {neworder.length === 0 ? (
                <div>Loading...</div>
              ) : (
                <>
                  {" "}
                  {neworder &&
                    neworder?.map((orders) => (
                      <div className="new__order__every__order">
                        <div className="new__order__cid">
                          Order By cid. : {orders.cid}
                        </div>
                        {orders.pid?.map((product) => (
                          <div className="new__order__orderd__product">
                            {product.name}
                          </div>
                        ))}
                        {/* {Object.keys(orders.pid).map((prod) => (
                          <div className="new__order__orderd__product">
                            {prod.name}
                          </div>
                        ))} */}
                      </div>
                    ))}
                </>
              )}
            </div>
          </Layout>
        )}
        {page === "packageorder" && (
          <Layout getBackfun={() => setPage("default")}>
            <div className="new__order__whole__container">
              this is new order__page
            </div>
          </Layout>
        )}
        {page === "shippingorder" && (
          <Layout getBackfun={() => setPage("default")}>
            <div className="new__order__whole__container">
              this is new order__page
            </div>
          </Layout>
        )}
        {page === "successorder" && (
          <Layout getBackfun={() => setPage("default")}>
            <div className="new__order__whole__container">
              this is new order__page
            </div>
          </Layout>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
