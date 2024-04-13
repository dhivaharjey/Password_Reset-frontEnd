import React, { useState } from "react";
import "./styles/from.css";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signInValidation } from "./Formvalidation";
import { url } from "./URL";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import { togglePasswordVisibility } from "./Utils/togglePassword";
import "./styles/passwordVisibility.css";
const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: signInValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://forgot-password-backend-ac35.onrender.com/user/login`,
          values
        );

        if (response.data.status === true) {
          localStorage.setItem("Auth Token", response.data.token);
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    //
    <>
      <div className="container">
        <div className=" vh-100 d-flex align-items-center justify-content-center ">
          <div className="form border p-5 rounded-5  col-sm-10 col-md-6 ">
            <h1 className="text-center mb-5 text-white">LOG IN</h1>
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
                <label for="floatingInput">Email address</label>
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control "
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <i
                  onClick={togglePasswordVisibility}
                  className="fa-solid fa-eye-slash eye"
                ></i>
                <label for="floatingPassword">Password</label>
              </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
              <div className="m-2 text-white">
                <Link to="/forgot-password">Forgot Password???</Link>
              </div>
              <div className="text-center ">
                <div className="mt-3 mb-3">
                  <button
                    type="submit"
                    className=" btn btn-primary   p-2 fw-bolder col-sm-12 col-md-12"
                  >
                    LOG IN
                  </button>
                </div>

                <div className="fw-bold ">
                  <p className="text-white">
                    Don't have an account?
                    <Link className="mx-3" to="/register">
                      Register here!!
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
