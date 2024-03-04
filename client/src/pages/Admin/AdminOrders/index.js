import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import "./index.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminOrders = () => {
  const [page, setPage] = useState("default");
  const [neworder, setNewOrder] = useState([]);
  const [packageOrder, setPackageOrder] = useState([]);
  const [shippingOrder, setShippingOrder] = useState([]);
  const [successOrder, setSuccessOrder] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const getOneOrderStatusData = async (statusCode) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/get-one-status-order`,
        { orsat: statusCode },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data.orders;
      // console.log(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(neworder);

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

  const handelProductPackageStageChange = async (ele) => {
    // console.log(ele);
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/order/change-order-status`,
      {
        headers: {
          authorization: token,
        },
      },
      { id: ele._id }
    );
    console.log(res);
  };

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
                    neworder?.map((ele) => (
                      <div className="new__order__every__order" key={ele._id}>
                        <div className="new__order__cid">
                          Order By cid. : {ele.cid}
                        </div>

                        <div className="new__order__orderd__product">
                          <div className="new__order__order__upper__part">
                            <div className="new__order__left__part">
                              <img src={ele.pid.url} alt={ele.pid._id} />
                            </div>
                            <div className="new__order__right__part">
                              <div className="lower__part__upper">
                                {" "}
                                {ele.pid.name}
                              </div>
                              <div className="lower__part__lower">
                                {ele.buyqun}
                              </div>
                            </div>
                          </div>
                          <div className="approve__button__container">
                            <button
                              onClick={() =>
                                handelProductPackageStageChange(ele)
                              }
                            >
                              Send Product To Package
                            </button>
                          </div>
                        </div>
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
              {packageOrder.length === 0 ? (
                <div>Loading...</div>
              ) : (
                <>
                  {" "}
                  {packageOrder &&
                    packageOrder?.map((ele) => (
                      <div className="new__order__every__order" key={ele._id}>
                        <div className="new__order__cid">
                          Order By cid. : {ele.cid}
                        </div>

                        <div className="new__order__orderd__product">
                          <div className="new__order__order__upper__part">
                            <div className="new__order__left__part">
                              <img src={ele.pid.url} alt={ele.pid._id} />
                            </div>
                            <div className="new__order__right__part">
                              <div className="lower__part__upper">
                                {" "}
                                {ele.pid.name}
                              </div>
                              <div className="lower__part__lower">
                                {ele.buyqun}
                              </div>
                            </div>
                          </div>
                          <div className="approve__button__container">
                            <button
                              onClick={() =>
                                handelProductPackageStageChange(ele)
                              }
                            >
                              Send Product To Package
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </Layout>
        )}
        {page === "shippingorder" && (
          <Layout getBackfun={() => setPage("default")}>
            <div className="new__order__whole__container">
              {shippingOrder.length === 0 ? (
                <div>Loading...</div>
              ) : (
                <>
                  {" "}
                  {shippingOrder &&
                    shippingOrder?.map((ele) => (
                      <div className="new__order__every__order" key={ele._id}>
                        <div className="new__order__cid">
                          Order By cid. : {ele.cid}
                        </div>

                        <div className="new__order__orderd__product">
                          <div className="new__order__order__upper__part">
                            <div className="new__order__left__part">
                              <img src={ele.pid.url} alt={ele.pid._id} />
                            </div>
                            <div className="new__order__right__part">
                              <div className="lower__part__upper">
                                {" "}
                                {ele.pid.name}
                              </div>
                              <div className="lower__part__lower">
                                {ele.buyqun}
                              </div>
                            </div>
                          </div>
                          <div className="approve__button__container">
                            <button
                              onClick={() =>
                                handelProductPackageStageChange(ele)
                              }
                            >
                              Send Product To shipping
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </Layout>
        )}
        {page === "successorder" && (
          <Layout getBackfun={() => setPage("default")}>
            <div className="new__order__whole__container">
              {successOrder.length === 0 ? (
                <div>Loading...</div>
              ) : (
                <>
                  {" "}
                  {successOrder &&
                    successOrder?.map((ele) => (
                      <div className="new__order__every__order" key={ele._id}>
                        <div className="new__order__cid">
                          Order By cid. : {ele.cid}
                        </div>

                        <div className="new__order__orderd__product">
                          <div className="new__order__order__upper__part">
                            <div className="new__order__left__part">
                              <img src={ele.pid.url} alt={ele.pid._id} />
                            </div>
                            <div className="new__order__right__part">
                              <div className="lower__part__upper">
                                {" "}
                                {ele.pid.name}
                              </div>
                              <div className="lower__part__lower">
                                {ele.buyqun}
                              </div>
                            </div>
                          </div>
                          <div className="approve__button__container">
                            <button
                              onClick={() =>
                                handelProductPackageStageChange(ele)
                              }
                            >
                              Send Product To final dispatch
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </Layout>
        )}
      </div>
    </Layout>
  );
};

export default AdminOrders;
