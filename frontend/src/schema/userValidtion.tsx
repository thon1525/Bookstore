import * as Yup from "yup";

const userValidtion = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username should be at least 3 characters long")
    .max(25, "Username should not exceed 25 characters")
    .required("Please enter a username."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter an email"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z]).{8,}$/,
      "Password must contain at least one lowercase letter and one number"
    ),
});

export { userValidtion };
