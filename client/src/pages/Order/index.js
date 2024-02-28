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
  function getStyle(index) {
    switch (index) {
      case 1:
        return "first-div";
      case 2:
        return "second-div";
      case 3:
        return "third-div";
      case 4:
        return "fourth-div";
      // Add more cases as needed for additional divs
      default:
        return "";
    }
  }

  console.log(orders);

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
            orders?.map((ele) => (
              <>
                <div className="order__data__heading" key={ele._id}>
                  order on: {dateHandler(ele.createdAt)}
                </div>
                <div className="order__product__list">
                  <div className="order__element">
                    <div className="order__element__left__part">
                      <img src={ele.pid.url} />
                    </div>
                    <div className="order__element__right__part">
                      <div className="order__element__right__name">
                        {ele.pid.name}
                      </div>
                      <div className="order__element__right__quantity">
                        {ele.buyqun} items
                      </div>
                    </div>
                  </div>
                  <div className="details__order__element">
                    <div className="details__order__ele">
                      <span>Order Id</span>
                      <span>{ele._id}</span>
                    </div>
                    <div className="details__order__ele">
                      <span>Total Amount</span>

                      <span>{ele.pid.price * ele.buyqun}</span>
                    </div>
                    <div className="details__order__ele">
                      <span>Order Status</span>

                      <span className="order__sat__color">
                        {ele.orsat === 1 && (
                          <div className={getStyle(ele.orsat)}>
                            Order Success
                          </div>
                        )}
                        {ele.orsat === 2 && (
                          <div className={getStyle(ele.orsat)}>Package</div>
                        )}
                        {ele.orsat === 3 && (
                          <div className={getStyle(ele.orsat)}>Shipped</div>
                        )}
                        {ele.orsat === 4 && (
                          <div className={getStyle(ele.orsat)}>Delivered</div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      )}
    </Layout>
  );
};

export default OrderPage;
