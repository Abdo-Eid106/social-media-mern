import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #0099ff;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .loginContainer {
    padding: 20px;
    width: 80%;
    max-width: 500px;
    border: 1px solid #dedede;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    margin-bottom: 20px;
    padding: 5px 10px;
    border-radius: 2px;
    border: 1px solid #dedede;
    background-color: #f2f2f2;
  }

  input[type="submit"] {
    background-color: #0099ff;
    color: #fff;
    border: none;
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .links {
    margin-top: 1rem; /* Add some space above the links */
    display: flex;
    flex-direction: column; /* Stack the links vertically */
  }

  .links a {
    margin-top: 0.5rem; /* Add space between the links */
  }
`;