import { useState } from "react";
import { Link } from "react-router-dom";
import { GlobalStyle } from "../styles/auth.styles";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../graphql/forgotPasswordMutation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword] = useMutation<{ token: string }>(FORGOT_PASSWORD, {
    onCompleted: () => toast.success("check your email"),
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword({ variables: { email } });
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input type="submit" value="Submit" />
          </form>
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
