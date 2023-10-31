import "./App.css";
import "./style.scss";
import ChatRegister from "./components/ChatRegister";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ChatLogin from "./components/ChatLogin";
import ChatBox from "./components/ChatBox";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ChatBox />
      </ProtectedRoute>
    ),
  },
  {
    path: "register",
    element: <ChatRegister />,
  },
  {
    path: "login",
    element: <ChatLogin />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
