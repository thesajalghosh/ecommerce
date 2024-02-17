import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import "./index.css";
import Loader from "../../components/Loader";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/get-single-cid-order`,
        { cid: user.cid }
      );
      console.log(data.orders);
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  const dateHandler = (ts) => {
    console.log(ts);
    let date = new Date(ts);

    let exactDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    return exactDate;
  };

  console.log(orders[0]);

  return (
    <Layout>
      {loading === true ? (
        <Loader />
      ) : (
        <div className="order__page__whole__container">
          <div className="order__page__header">
            {/* You Placed {orders?.pid?.length} orders */}
          </div>

          {orders &&
            orders?.map((order) => (
              <>
                <div className="order__data__heading">
                  order on: {dateHandler(order.createdAt)}
                </div>
                <div className="order__product__list">
                  {order?.pid?.map((ele) => (
                    <div className="order__element">
                      <div className="order__element__left__part">
                        <img src={ele.url} />
                      </div>
                      <div className="order__element__right__part">
                        <div className="order__element__right__name">
                          {ele.name}
                        </div>
                        <div className="order__element__right__quantity">
                          {ele.buyqun}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))}
        </div>
      )}
    </Layout>
  );
};

export default OrderPage;
