import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { useSelector } from "react-redux";

const CreateCategory = () => {
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.auth.token);
  // console.log(token);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );
      // console.log(data);
      if (data.success) {
        setCategories(data.category);
      }
      // console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        },
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );
      if (data.success) {
        toast.success("successfully creating the the category");
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in creating new category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <Layout title={"Dashboard - Create Category"}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {" "}
            <div className="p-3">
              <CategoryForm
                name={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <h2>Manage Category</h2>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((ele) => (
                    <tr key={ele._id}>
                      <>
                        <td>{ele?.name}</td>
                        <td>
                          {" "}
                          <button className="btn btn-primary ml-2">Edit</button>
                          <button className="btn btn-danger ml-2">
                            Delete
                          </button>
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
