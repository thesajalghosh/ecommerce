import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const Profile = () => {
  return (
    <>
      <Layout title={"Dashboard - Profile"}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2> Profile</h2>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
