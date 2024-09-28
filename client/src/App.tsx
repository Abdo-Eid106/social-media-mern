import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Chats, Chat, CreateChat } from "./modules/chat";
import { FollowersOrFollowing } from "./modules/profile";
import { Notifications } from "./modules/notification";
import { Login, Signup, ForgotPassword, ResetPassword } from "./modules/auth";
import { Profile } from "./modules/profile";
import { TweetPage } from "./modules/tweet";
import { PrimaryLayout } from "./modules/primary";
import { Search } from "./modules/search";
import { Home } from "./modules/home";
import { isLoggedInGuard } from "./modules/auth/guards/isLoggedInGuard";
import NotFound from "./shared/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimaryLayout />,
    loader: isLoggedInGuard,
    children: [
      {
        path: "search",
        element: <Search title="search" />,
      },
      {
        path: "/tweet/:id",
        element: <TweetPage />,
      },
      {
        path: "",
        element: <Home title="Home" />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
      {
        path: "/chats/new",
        element: <CreateChat />,
      },
      {
        path: "/chats/:id",
        element: <Chat />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/profile/:id/following",
        element: <FollowersOrFollowing followings={true} />,
      },
      {
        path: "/profile/:id/followers",
        element: <FollowersOrFollowing followers={true} />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
