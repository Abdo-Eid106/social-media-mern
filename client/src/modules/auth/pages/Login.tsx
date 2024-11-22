import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalStyle } from "../styles/auth.styles";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/loginMutation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [login] = useMutation<{ token: string }>(LOGIN, {
    onCompleted: ({ token }) => {
      localStorage.setItem("token", token);
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: formData,
    });
  };

  return (
    <>
      <GlobalStyle />
      <div className="wrapper">
        <div className="loginContainer">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              type="text"
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
            <input type="submit" value="Login" />
          </form>
          <div className="links">
            <Link to="/signup">Need an account? Register here.</Link>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
