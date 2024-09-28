import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage?.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});