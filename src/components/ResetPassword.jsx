import React, { useEffect, useState } from "react";
import "./styles/from.css";
import { resetPasswordValidation } from "./Formvalidation";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import { url } from "./URL";
import "./styles/passwordVisibility.css";
import { togglePasswordVisibility } from "./Utils/togglePassword";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [invalidUser, setInvalidUser] = useState("");
  const verifyToken = async () => {
    try {
      // const { token } = useParams();
      const response = await axios.get(`${url}/user/verify-token/${token}`);
      return response;
    } catch (error) {
      // console.log(error);
      if (error?.response?.data.status === false) {
        setInvalidUser(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: resetPasswordValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${url}/user/reset-password/${token}`,
          values
        );

        if (response.data.status === true) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <>
      {invalidUser ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <h1 className=" text-bg-danger">{invalidUser}</h1>
        </div>
      ) : (
        <div className="container">
          <div className=" vh-100 d-flex align-items-center justify-content-center ">
            <div className="form border p-5 rounded-5  col-sm-10 col-md-6 ">
              <h1 className="text-center mb-5 text-white"> PASSWORD RESET</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                  <i
                    onClick={togglePasswordVisibility}
                    className="fa-solid fa-eye-slash eye"
                  ></i>
                  <label htmlFor="floatingPassword">Password</label>
                  {errors.newPassword && (
                    <div className="text-danger">{errors.newPassword}</div>
                  )}
                </div>
                <div className="text-center ">
                  <div className="mt-3 mb-3">
                    <button
                      type="submit"
                      className=" btn btn-primary   p-2 fw-bolder col-sm-12 col-md-12"
                    >
                      RESET PASSWORD
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
