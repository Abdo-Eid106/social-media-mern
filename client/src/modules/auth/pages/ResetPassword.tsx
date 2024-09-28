import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalStyle } from "../styles/auth.styles";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../graphql/resetPasswordMutation";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      toast.success("password reset successfully");
      navigate("/login");
    },
    onError: (error) => toast.error(error.message),
    variables: { resetToken },
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
    if (formData.password != formData.passwordConfirm) {
      toast.error("passwords do not match");
      return;
    }
    resetPassword({ variables: { password: formData.password } });
  };

  return (
    <>
      <GlobalStyle />
      <div className="wrapper">
        <div className="loginContainer">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Reset" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
