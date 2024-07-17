import React from "react";
import "./styles/from.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { forgetPasswordvalidation } from "./Formvalidation";
import { url } from "./URL";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: forgetPasswordvalidation,
    onSubmit: async (values) => {
      toast.warning("Wait few seconds");
      try {
        const response = await axios.post(
          `https://forgot-password-backend-ac35.onrender.com/user/forgot-password`,
          values
        );
        console.log(response.data.status, response.data.message);
        if (response.data.status === true) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        // console.log(error.response.data.message);
      }
    },
  });
  return (
    <>
      <div className="container">
        <div className=" vh-100 d-flex align-items-center justify-content-center ">
          <div className="form border p-5 rounded-5  col-sm-10 col-md-6 ">
            <h1 className="text-center mb-5 text-white">FORGOT PASSWORD</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />

                <label htmlFor="floatingInput">Email address</label>
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              <div className="text-center ">
                <div className="mt-3 mb-3">
                  <button
                    type="submit"
                    className=" btn btn-primary   p-2 fw-bolder col-sm-12 col-md-12"
                  >
                    SEND LINK TO EMAIL
                  </button>
                </div>
              </div>
              <div className="fw-bold mt-2 text-center">
                <p className="text-white">
                  Already have an account?
                  <Link className="mx-3" to="/">
                    SIGN IN
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
