import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalStyle } from "../styles/auth.styles";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/signupMutation";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const [signup] = useMutation(SIGNUP, {
    onCompleted: () => {
      toast.success("Account created successfully");
      navigate("/login");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.passwordconfirm) {
      return toast.error("Passwords do not match");
    }
    signup({ variables: formData });
  };

  return (
    <>
      <GlobalStyle />
      <div className="wrapper">
        <div className="loginContainer">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="firstname"
              type="text"
              name="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              id="lastname"
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              id="passwordconfirm"
              type="password"
              name="passwordconfirm"
              placeholder="Confirm password"
              value={formData.passwordconfirm}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Signup" />
          </form>
          <Link to="/login">Already have an account? Login here.</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
