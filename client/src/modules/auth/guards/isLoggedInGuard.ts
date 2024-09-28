import { LoaderFunction, redirect } from "react-router-dom";
import { client } from "../../../shared/utils/Gql-client";
import { GET_ME, IUser } from "../../user";
import { toast } from "react-toastify";

export const isLoggedInGuard: LoaderFunction = async () => {
  try {
    const res = await client.query({
      query: GET_ME,
    });
    const user = res.data.me as IUser;
    return { user };
  } catch (err: any) {
    toast.error(err.message);
    return redirect("/login");
  }
};
