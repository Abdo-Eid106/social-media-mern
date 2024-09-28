import { INotification } from "../models/notificationModel";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../graphql/getNotificationsQuery";
import { toast } from "react-toastify";
import Notification from "../components/Notification";

const Notifications = () => {
  const { data, error, loading } = useQuery<{ notifications: INotification[] }>(
    GET_NOTIFICATIONS,
    {
      fetchPolicy: "no-cache",
    }
  );

  if (error) return toast.error(error.message);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <div className="titleContainer">
        <h1>Notifications</h1>
        <button id="markNotificationsAsRead">
          <i className="fas fa-check-double"></i>
        </button>
      </div>
      <div className="resultsContainer">
        {data?.notifications.map((notification) => (
          <Notification notification={notification} key={notification.id} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
