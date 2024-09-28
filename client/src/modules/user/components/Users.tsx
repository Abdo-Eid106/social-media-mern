import User from "./User";
import { IUser } from "../models/userModel";

const Users = ({ users }: { users: IUser[] }) => {
  return (
    <div className="resultsContainer">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
