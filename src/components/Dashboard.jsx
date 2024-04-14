import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("Auth Token");
    toast.success("you are logging out");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <div className="container">
        <div className=" vh-100 d-flex align-items-center justify-content-center ">
          <div className="form border p-5 rounded-5  col-sm-10 col-md-6 text-center">
            <h1 className="text-center mb-5 text-white"> Welcome Home!!!</h1>
            <button
              type="submit"
              className="btn btn-danger fw-bolder px-3"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
