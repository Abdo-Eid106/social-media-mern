import { useQuery } from "@apollo/client";
import { IUser } from "../models/userModel";
import { toast } from "react-toastify";
import { GET_USERS } from "../graphql/getUsersQuery";

export const useFetchUsers = (search: string = "") => {
  const { data, error, loading } = useQuery<{
    users: IUser[];
  }>(GET_USERS, {
    variables: {
      username: search,
    },
  });

  if (error) toast.error(error.message);
  return {
    users: data?.users || [],
    usersLoading: loading,
  };
};
