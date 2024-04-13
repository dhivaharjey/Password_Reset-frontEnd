import * as Yup from "yup";

export const signUpValidation = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .min(5, "Enter Minimum % characters")
    .required("Enter User Name !!"),
  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter Valid Email Address"
    )
    .required("Enter Email Address!!"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum 8 characters, least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Enter Password !!"),
  // comfirmPassword: Yup.string()
  //   .oneOf(
  //     [Yup.ref("password")],
  //     "Password doesn't match, Enter same passsword"
  //   )
  //   .required("Please Enter the confirm password"),
});
export const signInValidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter Valid Email Address"
    )
    .required("Enter Email Address!!"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum 8 characters, least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Enter Password !!"),
});
export const forgetPasswordvalidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter Valid Email Address"
    )
    .required("Enter Email Address!!"),
});
export const resetPasswordValidation = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum 8 characters, least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Enter Password !!"),
  // comfirmPassword: Yup.string()
  //   .oneOf(
  //     [Yup.ref("password")],
  //     "Password doesn't match, Enter same passsword"
  //   )
  //   .required("Please Enter the confirm password"),
});
