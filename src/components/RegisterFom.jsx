import React from "react";
import "./styles/from.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpValidation } from "./Formvalidation";
import axios from "axios";
import { url } from "./URL";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import "./styles/passwordVisibility.css";
import { togglePasswordVisibility } from "./Utils/togglePassword";

const RegisterForm = () => {
  const navigate = useNavigate();
  const initialvalues = {
    userName: "",
    email: "",
    password: "",
    // confirmPassword: "",
  };

  const { values, handleSubmit, handleChange, handleBlur, errors } = useFormik({
    initialValues: initialvalues,
    validationSchema: signUpValidation,
    onSubmit: async (values) => {
      // e.prevantDefault();
      try {
        const response = await axios.post(
          `https://forgot-password-backend-ac35.onrender.com/user/register`,
          values
        );

        if (response.data.status === true) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/");
      }
    },
  });
  return (
    <>
      <div className="container">
        <div className=" vh-100 d-flex align-items-center justify-content-center ">
          <div className="form border p-5 rounded-5  col-sm-10 col-md-6 ">
            <h1 className="text-center mb-5 text-white">SIGN UP</h1>
            <i onClick={() => togglePasswordVisibility()}></i>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="floatingInput">UserName</label>
                {errors.userName && (
                  <div className="text-danger">{errors.userName}</div>
                )}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <label htmlFor="floatingEmail">Email address</label>
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
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
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
              {/* <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  // id="floatingPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                <label for="floatingPassword">Confirm Password</label>
                {errors.confirmPassword && (
                  <div className="text-danger">{errors.confirmPassword}</div>
                )}
              </div> */}

              <div className="text-center mb-4 ">
                <div className="mt-3 mb-3">
                  <button
                    type="submit"
                    // onClick={navigate("/")}
                    className=" btn btn-primary   p-2 fw-bolder col-sm-12 col-md-12"
                  >
                    SIGN UP
                  </button>
                </div>

                <div className="fw-bold ">
                  <p className="text-white">
                    Already have an account?
                    <Link className="mx-3" to="/">
                      LOG IN
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

export default RegisterForm;
