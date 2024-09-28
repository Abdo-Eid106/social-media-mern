import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { GET_NOTIFICATIONS } from "../graphql/getNotificationsQuery";

export const useFetchUnreadedNotifications = () => {
  const { data, loading, error, refetch } = useQuery(GET_NOTIFICATIONS);
  if (error) toast.error(error.message);

  const unreadedNotifications = data?.notifications ?? [];
  return { loading, error, refetch, unreadedNotifications };
};
