import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import "./Admin.css";

const CreateCategory = () => {
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [modal, setModal] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSeleted] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );
      // console.log(data);
      if (data.success) {
        setCategories(data?.category);
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
      const productData = new FormData();

      productData.append("name", name);
      productData.append("photo", photo);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        productData,
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

  const handleEdit = (ele) => {
    setModal(true);
    setUpdatedName(ele?.name);
    setSeleted(ele._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,
        {
          name: updatedName,
        },
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );

      if (data.success) {
        toast.success(data.message);
        setSeleted(null);
        setUpdatedName("");
        setModal(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleDelete = (ele) => {
    setDeleteModal(true);
    setSeleted(ele._id);
  };

  const handleDeleteCall = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${selected}`,
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );
      if (data.success) {
        toast.success(data.message);
        setSeleted(null);
        setDeleteModal(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  console.log(categories);

  return (
    <>
      {modal && (
        <Modal
          heading={<>Edit Category</>}
          setClose={setModal}
          body={
            <>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
                setPhoto={setPhoto}
                photo={photo}
              />
            </>
          }
        />
      )}
      {deleteModal && (
        <Modal
          heading={<>Delete Category</>}
          setClose={setDeleteModal}
          body={
            <>
              <div>Are you sure to delete the Category?</div>
            </>
          }
          footer={
            <>
              <div className="modal__button__container">
                <button
                  className="btn btn-danger"
                  onClick={() => setDeleteModal(false)}
                >
                  No
                </button>
                <button className="btn btn-primary" onClick={handleDeleteCall}>
                  Yes
                </button>
              </div>
            </>
          }
        />
      )}

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
                setPhoto={setPhoto}
                photo={photo}
              />
            </div>
            <h2>Manage Category</h2>
            <div>
              <table className="table mb-4">
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
                          <button
                            className="btn btn-primary ml-2"
                            onClick={() => handleEdit(ele)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ml-2"
                            onClick={() => handleDelete(ele)}
                          >
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
