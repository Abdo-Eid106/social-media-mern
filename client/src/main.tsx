import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { client } from "./shared/utils/Gql-client.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={new QueryClient()}>
      <ApolloProvider client={client}>
        <ToastContainer autoClose={2000} position="top-center" />
        <App />
      </ApolloProvider>
    </QueryClientProvider>
  </>
);
