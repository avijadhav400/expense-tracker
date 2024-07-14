import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './views/Home/Home.js'
import Login from './views/Login/Login.js'
import Signup from './views/Signup/Signup.js'
import "./global.css"

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "*",
    element: <h1>Not found</h1>,
  },
]);

root.render(<RouterProvider router={router}/>)